using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WChatServer.App_Start;

namespace WChatServer.Controllers
{
    public class PushController : Controller
    {
        [ApiAuthAttrbute]
        public IActionResult Index()
        {
            return Json(new {
                State=1,
                Msg="认证成功"
            });
        }

        /// <summary>
        /// 推送消息
        /// </summary>
        /// <returns></returns>
        public IActionResult Push()
        {

        }

    }
}