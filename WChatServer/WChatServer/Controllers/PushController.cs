using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Manager;
using Microsoft.AspNetCore.Mvc;
using WChatServer.App_Start;
using WChatServer.Models;

namespace WChatServer.Controllers
{
    public class PushController : Controller
    {

        public PushController(PushManager pushManager)
        {
            this.pushManager = pushManager;
        }  
        
        private PushManager pushManager { get; set; }

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
        [ApiAuthAttrbute]
        public async Task<IActionResult> Push(PushModel model)
        {
            if (ModelState.IsValid)
            {
                switch (model.pushType)
                {
                    case PushType.Account:
                        await pushManager.Push(model.Account,model.Title,model.Msg);
                        break;
                    case PushType.All:
                        await pushManager.PushAll(model.Title, model.Msg);
                        break;
                }
                return Json(new
                {
                    State = -1,
                    Msg = "推送成功"
                });
            }
            return Json(new {
                State=-1,
                Msg="消息内容不正确"
            });
        }

        public async Task<IActionResult> SetUserDevice()
        {

        }

    }
}