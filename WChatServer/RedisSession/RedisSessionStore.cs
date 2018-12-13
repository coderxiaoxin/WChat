using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Session;
using System;
using System.Collections.Generic;
using System.Text;
using ServiceStack.Redis;

namespace RedisSession
{
    public class RedisSessionStore : ISessionStore
    {

        public RedisSessionStore(IRedisClient redisClient)
        {

        }

        public ISession Create(string sessionKey, TimeSpan idleTimeout, TimeSpan ioTimeout, Func<bool> tryEstablishSession, bool isNewSessionKey)
        {
            throw new NotImplementedException();
        }
    }
}
