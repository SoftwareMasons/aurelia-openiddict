using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using resources.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;
using resources.Services;
using AspNet.Security.OAuth.Validation;

namespace resources
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {


            services.AddCors();

            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
            // Add framework services.
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddSingleton<ICurrentContextAdapter, CurrentContextAdapter>();

            services.AddMvc();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {

            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            app.UseCors(builder =>
            {
                builder.AllowAnyHeader();
                builder.AllowAnyMethod();
                builder.AllowAnyOrigin();
                //builder.WithOrigins("http://localhost:49862");
                //builder.WithMethods("GET");
                //builder.WithHeaders("Authorization");
            });

            app.UseOAuthValidation();

            //app.UseJwtBearerAuthentication(new JwtBearerOptions()
            //{
            //    RequireHttpsMetadata = false,
            //    AutomaticAuthenticate = true,
            //    AutomaticChallenge = true,
            //    Audience = "aurelia-openiddict-resources",
            //    Authority = "http://localhost:54540/"
            //});

            app.UseMvc();
        }
    }
}
