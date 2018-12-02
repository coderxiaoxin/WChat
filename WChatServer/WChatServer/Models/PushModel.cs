using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WChatServer.Models
{
    public enum PushType
    {
        All=0,
        Account=1
    }

    public class PushModel
    {
        /// <summary>
        /// 推送类型
        /// </summary>
        public PushType pushType { get; set; }
        /// <summary>
        /// 推送账号
        /// </summary>
        public string Account { get; set; }
        /// <summary>
        /// 消息内容
        /// </summary>
        public string Msg { get; set; }
    }
}
