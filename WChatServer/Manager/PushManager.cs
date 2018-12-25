using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Aliyun.Acs.Push;
using DAL;

namespace Manager
{
    public class PushManager
    {
        public PushManager(IEnumerable<IPushStore> pushStores)
        {
            this.pushStores = pushStores;
        }

        public PushManager()
        {
            this.pushStores = new List<IPushStore>();
        }

        public IEnumerable<IPushStore> pushStores { get; set; }

        public async Task Push(string Account, string Title, string Content)
        {
            foreach (var item in pushStores)
            {
                await item.Push(Account, Title, Content);
            }
        }

        public async Task PushAll(string Title, string Content)
        {
            foreach (var item in pushStores)
            {
                await item.PushAll(Title, Content);
            }
        }
    }
}
