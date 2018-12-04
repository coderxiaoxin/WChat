using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WChatServer.DBModel
{
    public class WChatDbContext:DbContext
    {
        public WChatDbContext(DbContextOptions options)
            : base(options)
        {
        }


        public virtual DbSet<App> Apps { get; set; }

        public virtual DbSet<AppDetail> AppDetails { get; set; }
    }
}
