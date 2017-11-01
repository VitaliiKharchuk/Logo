using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using System.IO;
using Logo.Contracts.Services;
using Logo.Implementation;
using Microsoft.AspNetCore.Mvc;

namespace Logo.Web
{
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            ////services.AddAuthorization(auth =>
            ////{
            ////    auth.AddPolicy("Bearer", new AuthorizationPolicyBuilder()
            ////        .AddAuthenticationSchemes(JwtBearerDefaults.AuthenticationScheme)
            ////        .RequireAuthenticatedUser().Build());
            ////});

            ////services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            ////    .AddJwtBearer(options =>
            ////    {
            ////        options.TokenValidationParameters.IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes("9%&NvuFeT#.bc~+[#CX6C5U3+(3$H"));
            ////        options.TokenValidationParameters.ValidAudience = "http://logo-service.azurewebsites.net/";
            ////        options.TokenValidationParameters.ValidIssuer = "Logo";
            ////        options.TokenValidationParameters.ValidateIssuerSigningKey = true;
            ////    });

            services.AddMvc(options =>
            {
                options.Filters.Add(new RequireHttpsAttribute());
            });

            services.AddTransient<IUsersService, UsersService>();
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            app.Use(async (context, next) => {
                await next();
                if (context.Response.StatusCode == 404 &&
                    !Path.HasExtension(context.Request.Path.Value) &&
                    !context.Request.Path.Value.StartsWith("/api/"))
                {
                    context.Request.Path = "./src/index.html";
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

            ////app.UseAuthentication();
        }
    }
}
