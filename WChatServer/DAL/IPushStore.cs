using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DAL
{
    public interface IPushStore
    {
        /// <summary>
        /// 推送到指定账号
        /// </summary>
        /// <param name="Account"></param>
        /// <param name="Title"></param>
        /// <param name="Content"></param>
        /// <param name="list"></param>
        /// <returns></returns>
        Task Push(string Account,string Title, string Content, params string[] list);
        /// <summary>
        /// 推送给所有设备
        /// </summary>
        /// <param name="Title"></param>
        /// <param name="Content"></param>
        /// <param name="list"></param>
        /// <returns></returns>
        Task PushAll(string Title, string Content, params string[] list);
    }
}
