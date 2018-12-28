using DAL;
using System;
using System.Threading.Tasks;
using WChatDb;
using Aliyun.Acs.Push.Transform.V20160801;
using Aliyun.Acs.Core.Profile;
using Aliyun.Acs.Core;
using Aliyun.Acs.Push.Model.V20160801;
using Aliyun.Acs.Core.Exceptions;

namespace Store
{
    public class AppPushStore : IPushStore
    {
        /// <summary>
        /// 创建App推送工厂
        /// </summary>
        /// <param name="context">数据库连接字符串</param>
        /// <param name="RamAccessKeyId">RAM账号的ID</param>
        /// <param name="RamAccessKeySecret">RAM账号的密钥</param>
        /// <param name="Region_Id">最近区域ID</param>
        /// <param name="AppKey">对应App的key</param>
        public AppPushStore(WChatDbContext context, AppPushConfig appPushConfig)
        {
            this.context = context;
            this.AppKey = appPushConfig.AppKey;
            this.RamAccessKeyId = appPushConfig.RamAccessKeyId;
            this.RamAccessKeySecret = appPushConfig.RamAccessKeySecret;
            this.Region_Id = appPushConfig.Region_Id;
        }
        /// <summary>
        /// 创建App推送工厂，并使用日志服务
        /// </summary>
        /// <param name="context">数据库连接字符串</param>
        /// <param name="RamAccessKeyId">RAM账号的ID</param>
        /// <param name="RamAccessKeySecret">RAM账号的密钥</param>
        /// <param name="Region_Id">最近区域ID</param>
        /// <param name="AppKey">对应App的key</param>
        /// <param name="logStore">日志服务</param>
        public AppPushStore(WChatDbContext context, AppPushConfig appPushConfig, ILogStore logStore)
        {
            this.context = context;
            this.AppKey = appPushConfig.AppKey;
            this.RamAccessKeyId = appPushConfig.RamAccessKeyId;
            this.RamAccessKeySecret = appPushConfig.RamAccessKeySecret;
            this.Region_Id = appPushConfig.Region_Id;
            this.logStore = logStore;
        }

        private string Tag = "AppPushStore";

        private WChatDbContext context { get; set; }

        private long AppKey { get; set; }

        private ILogStore logStore { get; set; }

        private string RamAccessKeyId { get; set; }

        private string RamAccessKeySecret { get; set; }

        private string Region_Id { get; set; }
        /// <summary>
        /// 推送给指定账号
        /// </summary>
        /// <param name="Account"></param>
        /// <param name="Title"></param>
        /// <param name="Content"></param>
        /// <param name="list"></param>
        /// <returns></returns>
        public Task Push(string Account, string Title, string Content, params string[] list)
        {
            return Task.Run(() =>
            {
                this.Push("ACCOUNT", Account, Title, Content);
            });
        }
        /// <summary>
        /// 推送给所有设备
        /// </summary>
        /// <param name="Title"></param>
        /// <param name="Content"></param>
        /// <param name="list"></param>
        /// <returns></returns>
        public Task PushAll(string Title, string Content, params string[] list)
        {
            return Task.Run(() =>
            {
                this.Push("ALL", "ALL", Title, Content);
            });
        }

        /// <summary>
        /// 推送
        /// </summary>
        /// <param name="Target"></param>
        /// <param name="TargetValue"></param>
        /// <param name="Title"></param>
        /// <param name="Content"></param>
        private void Push(string Target,string TargetValue,string Title,string Content)
        {
            IClientProfile profile = DefaultProfile.GetProfile(
                Region_Id,
                RamAccessKeyId,
                RamAccessKeySecret
                );
            DefaultAcsClient client = new DefaultAcsClient(profile);
            PushRequest request = new PushRequest();
            request.PushType = "NOTICE";
            request.DeviceType = "ALL";
            request.AppKey = AppKey;
            request.Target = Target;
            request.TargetValue = TargetValue;
            request.Title = Title;
            request.Body = Content;
            request.AndroidNotificationChannel = "systemmsg";
            try
            {
                // Initiate the request and get the response
                PushResponse response = client.GetAcsResponse(request);
            }
            catch (ServerException ex)
            {
                logStore?.Error(Tag,ex.ToString());
            }
            catch (ClientException ex)
            {
                logStore?.Error(Tag, ex.ToString());
            }
        }
    }


    public class AppPushConfig
    {
        public string RamAccessKeyId { get; set; }
        public string RamAccessKeySecret { get; set; }
        public string Region_Id { get; set; }
        public long AppKey { get; set; }
    }
}
