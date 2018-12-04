using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace WChatDb
{
    public class AccountDetail
    {
        [Key]
        public Guid id { get; set; }

        public Guid AccountId{ get; set; }

        public string Name { get; set; }

        public string Value { get; set; }

        /// <summary>
        /// 账号
        /// </summary>
        [ForeignKey("AccountId")]
        public Account Account { get; set; }
    }
}
