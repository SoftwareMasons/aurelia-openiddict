﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using server.Data;
using server.Models;
using server.Services;
using OpenIddict;

namespace server
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true);

            if (env.IsDevelopment())
            {
                // For more details on using the user secret store see http://go.microsoft.com/fwlink/?LinkID=532709
                builder.AddUserSecrets();
            }

            builder.AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors();

            // Add framework services.
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

            services.AddIdentity<ApplicationUser, IdentityRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders();

            //  Register the OpenIddict services, including the default Entity Framework stores.
            services.AddOpenIddict<ApplicationUser, ApplicationDbContext>()
                .EnableAuthorizationEndpoint("/connect/authorize")
                .EnableLogoutEndpoint("/connect/logout")
                .EnableUserinfoEndpoint("/connect/userinfo")
                .AllowImplicitFlow()
                .UseJsonWebTokens()
                .DisableHttpsRequirement();

            services.AddMvc();

            // Add application services.
            services.AddTransient<IEmailSender, AuthMessageSender>();
            services.AddTransient<ISmsSender, AuthMessageSender>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseDatabaseErrorPage();
                app.UseBrowserLink();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseCors(options =>
            {
                options
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .WithOrigins("http://localhost:49862");
            });

            app.UseStaticFiles();

            app.UseIdentity();

            app.UseOAuthValidation();

            app.UseGoogleAuthentication(new GoogleOptions
            {
                ClientId = "560027070069-37ldt4kfuohhu3m495hk2j4pjp92d382.apps.googleusercontent.com",
                ClientSecret = "n2Q-GEw9RQjzcRbU3qhfTj8f"
            });

            app.UseTwitterAuthentication(new TwitterOptions
            {
                ConsumerKey = "6XaCTaLbMqfj6ww3zvZ5g",
                ConsumerSecret = "Il2eFzGIrYhz6BWjYhVXBPQSfZuS4xoHpSSyD9PI"
            });

            app.UseOpenIddict();

            // Add external authentication middleware below. To configure them please see http://go.microsoft.com/fwlink/?LinkID=532715

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
            });

            using (var context = new ApplicationDbContext(app.ApplicationServices.GetRequiredService<DbContextOptions<ApplicationDbContext>>()))
            {
                context.Database.EnsureCreated();

                if (!context.Applications.Any())
                {
                    context.Applications.Add(new OpenIddictApplication
                    {
                        // Assign a unique identifier to your client app:
                        Id = new Guid().ToString(),
                        ClientId = "aurelia-openiddict",

                        // Assign a display named used in the consent form page:
                        DisplayName = "Aurelia OpenIddict Sample",

                        // Register the appropriate redirect_uri and post_logout_redirect_uri:
                        RedirectUri = "http://localhost:49862/",
                        LogoutRedirectUri = "http://localhost:49862/",

                        // Generate a new derived key from the client secret:
                        //ClientSecret = Crypto.HashPassword("secret_secret_secret"),

                        // Note: use "public" for JS/mobile/desktop applications
                        // and "confidential" for server-side applications.
                        Type = OpenIddictConstants.ClientTypes.Public
                    });

                    context.SaveChanges();
                }
            }
        }
    }
}
