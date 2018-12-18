using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DAL;
using Manager;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Store;
using WChatDb;

namespace WChatServer
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();
            var connectstring = Configuration.GetConnectionString("WChat");
            services.AddDbContext<WChatDbContext>(options=> {
                options.UseMySQL(connectstring,builder=> {
                    builder.MigrationsAssembly("WChatServer");
                });
            });
            var AliPush = Configuration.GetSection("AliPush");
            var AppId = AliPush.GetValue<long>("AppId");
            var AccessKeyId = AliPush.GetValue<string>("AccessKeyId");
            var AccessKeySecret = AliPush.GetValue<string>("AccessKeySecret");
            var RegionId = AliPush.GetValue<string>("RegionId");
            services.AddScoped<PushManager>(option=> {
                return new PushManager().AddPushStore(()=> {
                    return new AppPushStore(option.GetRequiredService<WChatDbContext>(), AccessKeyId, AccessKeySecret, RegionId, AppId);
                });
            });
            
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseBrowserLink();
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }
            app.UseStaticFiles();
            
            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
            });
        }
    }
}
