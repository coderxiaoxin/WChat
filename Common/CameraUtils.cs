using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Net;
using System.IO;
using System.Text;
using System.Web;
using System.Threading;

namespace LiveVideoManager.Common
{
    public static class CameraUtils
    {
        /// <summary>
        /// 设置停止推流
        /// </summary>
        /// <param name="url"></param>
        /// <returns></returns>
        public static bool Stop(string url,string channel)
        {
            try
            {
                int ichannel = int.Parse(channel);
                ichannel--;
                //Uri uri = new Uri(url);
                url = url + "&command=live_control&channel=" + ichannel + "&value=stop"; //uri.Scheme + "://" + uri.Host + ":" + uri.Port + "/control?command=live_control&channel="+ ichannel + "&value=stop";
                var result=HttpGet(url);
                if (result.Contains("ok"))
                {
                    return true;
                }
            }
            catch (Exception ex)
            {
            }
            return false;
        }
        /// <summary>
        /// 设置开始推流
        /// </summary>
        /// <param name="url"></param>
        /// <returns></returns>
        public static bool Star(string url,string channel)
        {
            try
            {
                Thread.Sleep(3000);
                int ichannel = int.Parse(channel);
                ichannel--;
                //Uri uri = new Uri(url);
                url = url+ "&command=live_control&channel=" + ichannel + "&value=start";
                var result=HttpGet(url);
                if (result.Contains("ok"))
                {
                    return true;
                }
            }
            catch (Exception ex)
            {
            }
            return false;
        }
        /// <summary>
        /// 设置推流地址
        /// </summary>
        /// <param name="url"></param>
        /// <param name="RtmpUrl"></param>
        /// <returns></returns>
        public static bool SetRtmp(string url,string channel, string RtmpUrl)
        {
            try
            {
                Thread.Sleep(3000);
                int ichannel = int.Parse(channel);
                ichannel--;
                //Uri uri = new Uri(url);
                url = url+ "&command=set_live_url&channel=" + ichannel + "&value=" + Convert.ToBase64String(Encoding.UTF8.GetBytes(RtmpUrl));
                var result = HttpGet(url);
                if (result.Contains("ok"))
                {
                    return true;
                }
            }
            catch(Exception ex)
            {
            }
            return false;
        }

        private static string HttpGet(string url)
        {
            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
            HttpWebResponse response = (HttpWebResponse)request.GetResponse();
            var stream = response.GetResponseStream();
            StreamReader sr = new StreamReader(stream);
            return sr.ReadToEnd();
        }
    }
}
