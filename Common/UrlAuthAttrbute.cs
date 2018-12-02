using LiveVideoManager.DBModel.Video;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace LiveVideoManager.Common
{
    public class UrlAuthAttrbute : ActionFilterAttribute
    {
        public UrlAuthAttrbute()
            : base()
        {
        }

        public override void OnActionExecuting(ActionExecutingContext context)
        {
            //context.Controller
            var videoContext = context.HttpContext.RequestServices.GetService(typeof(VideoContext)) as VideoContext;
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
                    Debug="缺少字段"
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
            var plan = videoContext.PlanInfos.Where(a => a.appId == appid).FirstOrDefault();
            if (plan == null)
            {
                context.Result = new JsonResult(new
                {
                    Status = -100,
                    Error = "签名验证失败",
                    Debug="未知appid"
                });
                base.OnActionExecuting(context);
                return;
            }
            args.Add("appSecret", plan.appSecret);
            foreach (var item in context.HttpContext.Request.Query)
            {
                if (item.Key != "signature")
                {
                    args.Add(item.Key, item.Value);
                }
            }
            args = args.OrderBy(a => a.Key).ToDictionary(p => p.Key, p => p.Value);
            var qstr =context.HttpContext.Request.Path+string.Join("&", args.Select(a => a.Key + "=" + a.Value));
            var _signature = CreateToken(qstr,plan.appSecret);
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
            context.HttpContext.Response.Headers.Add("AllowSpecificOrigin","*");
            base.OnActionExecuted(context);
        }
        /// <summary>
        /// MD5加密
        /// </summary>
        /// <param name="source"></param>
        /// <returns></returns>
        public static string EncryptWithMD5(string source)
        {
            byte[] sor = Encoding.UTF8.GetBytes(source);
            MD5 md5 = MD5.Create();
            byte[] result = md5.ComputeHash(sor);
            StringBuilder strbul = new StringBuilder(40);
            for (int i = 0; i < result.Length; i++)
            {
                strbul.Append(result[i].ToString("x2"));//加密结果"x2"结果为32位,"x3"结果为48位,"x4"结果为64位
            }
            return strbul.ToString();
        }
        
        /// <summary>
        /// 创建签名token
        /// </summary>
        /// <param name="data"></param>
        /// <param name="hash"></param>
        /// <returns></returns>
        public static string CreateToken(string data,string SECRET, string hash = "sha1")
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
