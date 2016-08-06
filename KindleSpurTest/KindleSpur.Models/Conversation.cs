﻿using KindleSpur.Models.Interfaces;
using System;
using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace KindleSpur.Models
{
    [BsonIgnoreExtraElements]
    public class Conversation : IConversation
    {
        [BsonId]
        public ObjectId Id { get; set; }

        public string SenderEmail { get; set; }
        public string ReceiverEmail { get; set; }
        public string Content { get; set; }
        //public List<Message> Content { get; set; }
        public string SendOrReceive { get; set; }
        //public int group_id { get; set; }
        public Boolean isRead { get; set; }
        public Boolean IsVerified { get; set; }
        public string CreateDate { get; set; }
        public DateTime UpdateDate { get; set; }
    }
}