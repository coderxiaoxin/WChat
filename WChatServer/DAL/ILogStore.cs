using System;
using System.Collections.Generic;
using System.Text;

namespace DAL
{
    public interface ILogStore
    {
        /// <summary>
        /// 输出日志
        /// </summary>
        /// <param name="Target"></param>
        /// <param name="msg"></param>
        void Log(string Target, string msg);
        /// <summary>
        /// 输出错误日志
        /// </summary>
        /// <param name="Target"></param>
        /// <param name="msg"></param>
        void Error(string Target, string msg);
    }
}
