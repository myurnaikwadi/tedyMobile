﻿using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;

namespace KindleSpur.Models.Interfaces
{
    public interface IUser
    {
        List<Invitation> invitation { get; set; }


        string EmailAddress { get; set; }

        string Password { get; set; }

        string FirstName { get; set; }

        string LastName { get; set; }

        int Mobile { get; set; }
        int BalanceRewardPoints { get; set; }

        int InviteRewardPoints { get; set; }
        int RedeemedPoints { get; set; }

        int TotalRewardPoints { get; set; }
        string Country { get; set; }
        string State { get; set; }
        string City { get; set; }

        string Region { get; set; }

        string LinkdinURL { get; set; }

        string description { get; set; }

        string Photo { get; set; }
        string coverphoto { get; set; }
        List<FileUpload> Files { get; set; }
        List<Game> Games { get; set; }
         List<BookMark> BookMarks { get; set; }
        Boolean IsExternalAuthentication { get; set; }
        DateTime CreateDate { get; set; }
        DateTime UpdateDate { get; set; }
        Boolean IsVerified { get; set; }
        [BsonId]
        ObjectId Id { get; set; }

    }
}
