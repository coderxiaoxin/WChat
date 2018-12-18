using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Text;
using System.Security.Cryptography;
using System.Security.Principal;

namespace WChatServer.App_Start
{
    public class AuthAttrbute: ActionFilterAttribute
    {

        public static string slat = "qwerpiousdfvnlw5n4kjqbgyuhctdxs87ry032o8iuljkebfc;sdlkf";

        public override void OnActionExecuting(ActionExecutingContext context)
        {
            var isAjax = context.HttpContext.Request.Headers.ContainsKey("x-requested-with");
            if (!context.HttpContext.Request.Cookies.ContainsKey("AuthId"))
            {
                if (isAjax)
                {
                    context.Result = new JsonResult(new
                    {
                        state = -100
                    });
                }
                else
                {
                    context.Result = new RedirectResult("/Account/Login");
                }
            }
            var cookie = context.HttpContext.Request.Cookies["AuthId"];
            var cookielist =Encoding.UTF8.GetString(Convert.FromBase64String(cookie)).Split("_");
            if (cookielist.Length != 4)
            {
                if (isAjax)
                {
                    context.Result = new JsonResult(new
                    {
                        state = -100
                    });
                }
                else
                {
                    context.Result = new RedirectResult("/Account/Login");
                }
            }
            var UserName = cookielist[0];
            var Time = cookielist[1];
            var Str = cookielist[2];
            var sign = cookielist[3];
            var signstr = UserName + Time + Str + slat;
            MD5 mD5 = MD5.Create();
            var msign=Encoding.UTF8.GetString(mD5.ComputeHash(Encoding.UTF8.GetBytes(signstr))).Replace("-", "");
            if (msign != sign)
            {
                if (isAjax)
                {
                    context.Result = new JsonResult(new
                    {
                        state = -100
                    });
                }
                else
                {
                    context.Result = new RedirectResult("/Account/Login");
                }
            }
            var user = new System.Security.Claims.ClaimsPrincipal(new Identity(UserName));
            context.HttpContext.User = user;
            base.OnActionExecuting(context);
        }
    }


    public class Identity : IIdentity
    {
        public Identity()
        {
            this.IsAuthenticated = false;
            this.Name = null;
        }

        public Identity(string Name)
        {
            this.IsAuthenticated = true;
            this.Name = Name;
        }

        public string AuthenticationType
        {
            get
            {
                return "user";
            }
        }

        public bool IsAuthenticated { get;private set; }

        public string Name { get; private set; }
    }
}
