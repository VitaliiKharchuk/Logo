using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using System.IO;
using System.Text;
using Logo.Contracts.Services;
using Logo.Implementation;
using Logo.Implementation.DatabaseModels;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Rewrite;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Serilog;
using Microsoft.Extensions.Logging;
using Serilog.Events;

namespace Logo.Web
{
    public class Startup
    {
        /*
        public  Startup(IHostingEnvironment env)
        {
            Log.Logger = new LoggerConfiguration()
                .MinimumLevel.Debug()
                .WriteTo.RollingFile(Path.Combine(env.ContentRootPath, "log-{Date}.txt"))
                .CreateLogger();
        }
        */


        public void ConfigureServices(IServiceCollection services)
        {
            services.AddAuthorization(auth =>
            {
                auth.AddPolicy("Bearer", new AuthorizationPolicyBuilder()
                    .AddAuthenticationSchemes(JwtBearerDefaults.AuthenticationScheme)
                    .RequireAuthenticatedUser().Build());
            });

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters.IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes("9%&NvuFeT#.bc~+[#CX6C5U3+(3$H"));
                    options.TokenValidationParameters.ValidAudience = "http://logo-service.azurewebsites.net/";
                    options.TokenValidationParameters.ValidIssuer = "Logo";
                    options.TokenValidationParameters.ValidateIssuerSigningKey = true;
                });

            services.AddMvc();
            ////options =>
            ////{
            ////    options.Filters.Add(new RequireHttpsAttribute());
            ////    //  options.Filters.Add(new ApiExceptionFilter(new  loggerFactory.AddSerilog()));

            ////});

            services.AddScoped<ApiExceptionFilter>();

            // TODO: use Configuration.GetConnectionString("DefaultConnection")
            //var connectionString = "Server=tcp:logo-server.database.windows.net,1433;Initial Catalog=logodb;Persist Security Info=False;User ID=logo-server-admin;Password=pF8Tyzu7FEH8;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;";
            //services.AddDbContext<LogoDbContext>(options => options.UseSqlServer(connectionString));

            services.AddDbContext<LogoDbContext>(options => options.UseInMemoryDatabase("TestBase"));

            services.AddTransient<IUsersService, UsersService>();
            services.AddTransient<IFoldersService, FoldersService>();
            services.AddTransient<ICryptographyService, CryptographyService>();


            Log.Logger = new LoggerConfiguration()
               .MinimumLevel
               .Information()
               .WriteTo.File("log-history.txt")  //  LogEventLevel.Information
               .CreateLogger();

        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddSerilog();

            app.Use(async (context, next) => {
                await next();
                if (context.Response.StatusCode == 404 &&
                    !Path.HasExtension(context.Request.Path.Value) &&
                    !context.Request.Path.Value.StartsWith("/api/"))
                {
                    context.Request.Path = "";
                    await next();
                }
            });

            app.UseMvcWithDefaultRoute();
            app.UseDefaultFiles();
            app.UseStaticFiles();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseAuthentication();

            //var options = new RewriteOptions()
             //   .AddRedirectToHttps();

            //app.UseRewriter(options);
        }
    }
}