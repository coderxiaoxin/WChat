using System;
using System.Collections.Generic;
using System.Text;

namespace WChatDb
{
    public class Device
    {
        public Guid Id { get; set; }

        public string DeviceId { get; set; }

        public Guid? UserId { get; set; }
    }
}
