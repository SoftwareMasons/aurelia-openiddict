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

            app.UseOAuthIntrospection(options =>
            {
                options.Authority = new Uri("http://localhost:54540/");
                options.Audiences.Add("aurelia-openiddict-resources");
                options.ClientId = "aurelia-openiddict-resources";
                options.ClientSecret = "846B62D0-DEF9-4215-A99D-86E6B8DAB342";
                options.RequireHttpsMetadata = false;

                // Note: you can override the default name and role claims:
                // options.NameClaimType = "custom_name_claim";
                // options.RoleClaimType = "custom_role_claim";
            });

            app.UseCors(builder =>
            {
                builder.AllowAnyHeader();
                builder.AllowAnyMethod();
                builder.AllowAnyOrigin();
                //builder.WithOrigins("http://localhost:49862");
                //builder.WithMethods("GET");
                //builder.WithHeaders("Authorization");
            });


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
