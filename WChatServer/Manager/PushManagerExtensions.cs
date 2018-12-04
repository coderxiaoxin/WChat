using DAL;
using System;
using System.Collections.Generic;
using System.Text;

namespace Manager
{
    public static class PushManagerExtensions
    {
        public static PushManager AddPushStore<T>(this PushManager pushManager, Func<T> func)
            where T : IPushStore
        {
            pushManager.pushStores.Add(func.Invoke());
            return pushManager;
        }
    }
}
