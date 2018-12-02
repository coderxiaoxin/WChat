using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;
using WChatServer.DBModel;

namespace WChatServer.App_Start
{
    public class ApiAuthAttrbute: ActionFilterAttribute
    {
        public ApiAuthAttrbute()
            : base()
        {
        }

        public override void OnActionExecuting(ActionExecutingContext context)
        {
            var videoContext = context.HttpContext.RequestServices.GetService(typeof(WChatDbContext)) as WChatDbContext;
            var args = new Dictionary<string, string>();
            var appid = context.HttpContext.Request.Query["appid"];
            var signature = context.HttpContext.Request.Query["signature"];
            var timestampStr = context.HttpContext.Request.Query["timestamp"];
            long timestamp = 0;
            if (string.IsNullOrEmpty(appid) || string.IsNullOrEmpty(signature) || string.IsNullOrEmpty(timestampStr) || !long.TryParse(timestampStr, out timestamp))
            {
                context.Result = new JsonResult(new
                {
                    Status = -100,
                    Error = "签名验证失败",
                    Debug = "缺少字段"
                });
                base.OnActionExecuting(context);
                return;
            }
            if (GetTimeStamp() - timestamp > 60 * 15)
            {
                context.Result = new JsonResult(new
                {
                    Status = -100,
                    Error = "签名验证失败",
                    Debug = "链接过期"
                });
                base.OnActionExecuting(context);
                return;
            }
            var plan = videoContext.Apps.Where(a => a.Appid == appid).FirstOrDefault();
            if (plan == null)
            {
                context.Result = new JsonResult(new
                {
                    Status = -100,
                    Error = "签名验证失败",
                    Debug = "未知appid"
                });
                base.OnActionExecuting(context);
                return;
            }
            args.Add("appSecret", plan.AppSecret);
            foreach (var item in context.HttpContext.Request.Query)
            {
                if (item.Key != "signature")
                {
                    args.Add(item.Key, item.Value);
                }
            }
            args = args.OrderBy(a => a.Key).ToDictionary(p => p.Key, p => p.Value);
            var qstr = context.HttpContext.Request.Path + string.Join("&", args.Select(a => a.Key + "=" + a.Value));
            var _signature = CreateToken(qstr, plan.AppSecret);
            if (_signature != signature.ToString())
            {
                context.Result = new JsonResult(new
                {
                    Status = -100,
                    Error = "签名验证失败"
                });
            }
            else
            {
            }
            base.OnActionExecuting(context);
        }

        public override void OnActionExecuted(ActionExecutedContext context)
        {
            context.HttpContext.Response.Headers.Add("AllowSpecificOrigin", "*");
            base.OnActionExecuted(context);
        }

        /// <summary>
        /// 创建签名token
        /// </summary>
        /// <param name="data"></param>
        /// <param name="hash"></param>
        /// <returns></returns>
        public static string CreateToken(string data, string SECRET, string hash = "sha1")
        {
            byte[] Data = System.Text.Encoding.UTF8.GetBytes(data);
            byte[] SecretKey = System.Text.Encoding.UTF8.GetBytes(SECRET);

            byte[] digest = null;
            if (hash == "sha1")
            {
                HMACSHA1 hmac = new HMACSHA1(SecretKey);
                digest = hmac.ComputeHash(Data);
            }
            else if (hash == "sha256")
            {
                HMACSHA256 hmac = new HMACSHA256(SecretKey);
                digest = hmac.ComputeHash(Data);
            }
            return Convert.ToBase64String(digest);
        }



        public static long GetTimeStamp()
        {
            return (DateTime.Now.ToUniversalTime().Ticks - 621355968000000000) / 10000000;
        }
    }
}
