using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using resources.Models;
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
            // Add our repository type
            services.AddSingleton<ITodoItemRepository, TodoItemRepository>();

            services.AddCors();

            // Add framework services.
            services.AddMvc();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {

            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            app.UseCors(options =>
            {
                options.AllowAnyHeader();
                options.AllowAnyMethod();
                options.AllowAnyOrigin();
            });

            //app.UseOAuthValidation(new OAuthValidationOptions()
            //{
            //    AutomaticAuthenticate = true,
            //    AutomaticChallenge = true,
            //});

            app.UseJwtBearerAuthentication(new JwtBearerOptions()
            {
                RequireHttpsMetadata = false,
                AutomaticAuthenticate = true,
                AutomaticChallenge = true,
                Audience = "aurelia-openiddict",
                Authority = "http://localhost:54540/"
            });

            app.UseMvc();
        }
    }
}
