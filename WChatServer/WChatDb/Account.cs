using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace WChatDb
{
    public class Account
    {
        [Key]
        public Guid id { get; set; }

        public string UserName { get; set; }

        public string Password { get; set; }

    }
}
