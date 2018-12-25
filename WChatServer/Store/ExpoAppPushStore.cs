using DAL;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using WChatDb;

namespace Store
{
    public class ExpoAppPushStore : IPushStore
    {
        public ExpoAppPushStore(WChatDbContext context)
        {
            this.context = context;
        }

        private WChatDbContext context { get; set; }

        public Task Push(string Account, string Title, string Content, params string[] list)
        {
            throw new NotImplementedException();
        }

        public Task PushAll(string Title, string Content, params string[] list)
        {
            throw new NotImplementedException();
        }
    }
}
