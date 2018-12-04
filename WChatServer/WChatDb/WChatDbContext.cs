using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WChatDb
{
    public class WChatDbContext:DbContext
    {
        public WChatDbContext(DbContextOptions options)
            : base(options)
        {
        }

        /// <summary>
        /// app
        /// </summary>
        public virtual DbSet<App> Apps { get; set; }
        /// <summary>
        /// 对外app额外信息
        /// </summary>
        public virtual DbSet<AppDetail> AppDetails { get; set; }
        /// <summary>
        /// 账号
        /// </summary>
        public virtual DbSet<Account> Accounts { get; set; }
        /// <summary>
        /// 账号额外信息
        /// </summary>
        public virtual DbSet<AccountDetail> AccountDetails { get; set; }
    }
}
