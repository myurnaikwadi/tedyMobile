﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KindleSpur.Models.Interfaces
{
    public interface IUser
    {
         string EmailAddress { get; set; }
         string Password { get; set; }
         string FirstName { get; set; }
         string LastName { get; set; }
         int Mobile { get; set; }
         string Country { get; set; }
         string Region { get; set; }
         string Photo { get; set; }
         Boolean IsExternalAuthentication { get; set; }
         DateTime CreateDate { get; set; }
         DateTime UpdateDate { get; set; }
    }
}
