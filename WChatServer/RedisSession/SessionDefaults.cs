using System;
using System.Collections.Generic;
using System.Text;

namespace RedisSession
{
    /// <summary>
    /// Represents defaults for the Session.
    /// </summary>
    public static class SessionDefaults
    {
        /// <summary>
        /// Represent the default cookie name, which is ".AspNetCore.Session".
        /// </summary>
        public static readonly string CookieName = ".AspNetCore.Session";

        /// <summary>
        /// Represents the default path used to create the cookie, which is "/".
        /// </summary>
        public static readonly string CookiePath = "/";
    }
}
