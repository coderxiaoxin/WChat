using DAL;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using WChatDb;
using Newtonsoft.Json.Linq;
using System.Linq;
using System.Net;

namespace Store
{
    public class ExpoAppPushStore : IPushStore
    {

        private string GenPushModel(string token,string title,string body)
        {
            JArray jArray = new JArray();
            JObject json = new JObject();
            json.Add("to", token);
            json.Add("sound", "default");
            json.Add("title", title);
            json.Add("body", body);
            jArray.Add(json);
            return jArray.ToString();
        }


        public ExpoAppPushStore(WChatDbContext context)
        {
            this.context = context;
        }

        private WChatDbContext context { get; set; }

        public async Task Push(string Account, string Title, string Content, params string[] list)
        {
            var user = context.Accounts.Where(a => a.UserName == Account).FirstOrDefault();
            if (user == null)
            {
                return;
            }
            var device = context.Devices.Where(a => a.UserId == user.id).ToList();
            using (WebClient wc = new WebClient())
            {
                foreach (var item in device)
                {
                    var model = GenPushModel(item.DeviceId, Title, Content).Replace("\r\n", "").Replace(" ", "");
                    wc.UploadString(new Uri("https://exp.host/--/api/v2/push/send"),"POST",model);
                }
            }
            return;
        }

        public async Task PushAll(string Title, string Content, params string[] list)
        {

            var devices = context.Devices.ToList();
            using (WebClient wc = new WebClient())
            {
                foreach (var item in devices)
                {
                    var model = GenPushModel(item.DeviceId, Title, Content).Replace("\r\n","").Replace(" ","");
                    try
                    {
                        HttpHelper http = new HttpHelper();
                        HttpItem httpitem = new HttpItem()
                        {
                            URL = "https://exp.host/--/api/v2/push/send",
                            Method = "post",
                            Postdata = model,
                            Accept= "application/json",
                            ContentType= "application/json"
                        };
                        var result = http.GetHtml(httpitem);
                        //wc.UploadString(new Uri("https://exp.host/--/api/v2/push/send"), "POST", model);
                    }
                    catch (Exception ex)
                    {

                    }

                }
            }
            return;
        }
    }
}
