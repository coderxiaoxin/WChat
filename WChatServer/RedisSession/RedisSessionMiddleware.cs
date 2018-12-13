using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Session;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace RedisSession
{
    public class RedisSessionMiddleware : IMiddleware
    {

        public RedisSessionMiddleware(
            RequestDelegate next,
            ILoggerFactory loggerFactory,
            IDataProtectionProvider dataProtectionProvider,
            ISessionStore sessionStore,
            IOptions<RedisSessionOptions> options)
        {

        }


        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            try
            {
                RedisSessionFeature sessionFeature = new RedisSessionFeature();
                sessionFeature.Session = null;
                context.Features.Set<ISessionFeature>(sessionFeature);
                await next.Invoke(context);
            }
            finally
            {

            }
        }
    }
}
