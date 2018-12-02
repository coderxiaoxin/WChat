using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;

namespace LiveVideoManager2.Common
{
    public class UrlAuthUtils
    {
        /// <summary>
        /// 参数签名
        /// </summary>
        /// <param name="appid">appid</param>
        /// <param name="appSecret">appSecret</param>
        public UrlAuthUtils(string appid, string appSecret)
        {
            this.appid = appid;
            this.appSecret = appSecret;
        }

        private string appid { get; set; }

        private string appSecret { get; set; }
        /// <summary>
        /// 获取签名后的url
        /// </summary>
        /// <param name="path"></param>
        /// <param name="data"></param>
        /// <returns></returns>
        public string CreateSignUrl(string path, Dictionary<string, string> data)
        {
            var timestamp = GetTimeStamp();
            data.Add("timestamp", timestamp.ToString());
            data.Add("appid", appid);
            Dictionary<string, string> postUrl = new Dictionary<string, string>();
            foreach (var item in data)
            {
                postUrl.Add(item.Key, item.Value);
            }
            postUrl.Add("appSecret", appSecret);
            postUrl = postUrl.OrderBy(a => a.Key).ToDictionary(p => p.Key, p => p.Value);
            var qstr = path + string.Join("&", postUrl.Select(a => a.Key + "=" + a.Value));
            var _signature = CreateToken(qstr,appSecret);
            data.Add("signature", _signature);
            return path + "?" + string.Join("&", data.Select(a => a.Key + "=" + a.Value));
        }
        

        /// <summary>
        /// 创建签名token
        /// </summary>
        /// <param name="data"></param>
        /// <param name="hash"></param>
        /// <returns></returns>
        private static string CreateToken(string data,string SECRET, string hash = "sha1")
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



        private static long GetTimeStamp()
        {
            return (DateTime.Now.ToUniversalTime().Ticks - 621355968000000000) / 10000000;
        }
    }
}
