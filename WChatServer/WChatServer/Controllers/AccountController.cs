using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WChatDb;
using WChatServer.App_Start;
using WChatServer.Models;
using Microsoft.AspNetCore.Identity;

namespace WChatServer.Controllers
{
    public class AccountController : Controller
    {
        public AccountController(WChatDbContext dbcontext, UserManager<IdentityUser<int>> userManager, SignInManager<IdentityUser<int>> signInManager)
        {
            this.dbcontext = dbcontext;
            this.userManager = userManager;
            this.signInManager = signInManager;
        }

        private string ConstSlatKey = "wchatserver_jlifgksaeuriioet4545hn3jk45hb2k3l4j5hrtkj34poqwir3n462p41l2k;3n,m.znbxcvjk";


        private WChatDbContext dbcontext { get; set; }

        private UserManager<IdentityUser<int>> userManager { get; set; }

        private SignInManager<IdentityUser<int>> signInManager { get; set; }

        [AuthAttrbute]
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Login()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Login(LoginModel model)
        {
            if (!ModelState.IsValid)
            {
                return Json(new
                {
                    state = -1,
                    msg = "数据不正确"
                });
            }
            var user = dbcontext.Accounts.Where(a => a.UserName == model.UserName).FirstOrDefault();
            if (user == null)
            {
                return Json(new
                {
                    state = -1,
                    msg = "密码错误"
                });
            }
            var md5 = MD5.Create();
            var password = model.PassWord + user.id + ConstSlatKey;
            password = BitConverter.ToString(md5.ComputeHash(Encoding.UTF8.GetBytes(password))).Replace("-", "");
            if (user.Password != password)
            {
                return Json(new
                {
                    state = -1,
                    msg = "密码错误"
                });
            }
            var Str = Guid.NewGuid().ToString("N");
            var time = GetTimeStamp();
            var slat = AuthAttrbute.slat;
            var cookie = Encoding.UTF8.GetString(md5.ComputeHash(Encoding.UTF8.GetBytes(model.UserName + time + Str + slat)));
            HttpContext.Response.Cookies.Append("AuthId", cookie);
            return Json(new
            {
                state = 1
            });
        }

        [AuthAttrbute]
        public IActionResult GetUserInfo()
        {

            //dbcontext.AccountDetails.Where(a=>a.Account.UserName==UserName)
            return View();
        }


        private long GetTimeStamp()
        {
            return (DateTime.Now.ToUniversalTime().Ticks - 621355968000000000) / 10000000;
        }
    }
}