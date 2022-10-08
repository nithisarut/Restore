using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Entities.OrderAggregate
{
    //สถานะการชำระเงิน
   public enum OrderStatus
    {
        Pending,
        PaymentReceived,
        PaymentFailed
    }

}