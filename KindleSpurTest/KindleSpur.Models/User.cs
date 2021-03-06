﻿using KindleSpur.Models.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization;

namespace KindleSpur.Models
{
    // This project can output the Class library as a NuGet Package.
    // To enable this option, right-click on the project and select the Properties menu item. In the Build tab select "Produce outputs on build".

    
    public class User : IUser
    {
        public string EmailAddress { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int Mobile { get; set; }
        public string Country { get; set; }
        public string State { get; set; }
        public string City { get; set; }
        public string Region { get; set; }
        public Boolean IsExternalAuthentication { get; set; }
        public int BalanceRewardPoints { get; set; }
        public int RedeemedPoints { get; set; }
        public int InviteRewardPoints { get; set; }
        public int TotalRewardPoints { get; set; }
        public Boolean IsVerified { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime UpdateDate { get; set; }
        public string LinkdinURL { get; set; }
        public string description { get; set; }
        public string Photo { get; set; }
        public string coverphoto { get; set; }
        public List<FileUpload> Files { get; set; }
        public List<BookMark> BookMarks { get; set; }
        public List<Game> Games { get; set; }
        public List<ValueFeedStory> ValueFeedStories { get; set; }
        public List<VSCS> ValueCreationActivity { get; set; }
        [BsonRepresentation(BsonType.ObjectId)]
        public ObjectId Id
        {
            get; set;
        }
        public List<Invitation> invitation { get; set; }
    }
}
