﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using KindleSpur.Data;
using MongoDB.Bson;

namespace KindleSpur.WebApplication.Controllers
{
    public class CTSController : ApiController
    {

        // GET: api/GetCTS
        public string GetCTS()
        {
            CTSRepository _ctsRepo = new CTSRepository();
            return _ctsRepo.GetCTS().ToJson();
        }

        // POST: api/PostCTS
        public Boolean PostCTS([FromBody] List<string> obj)
        {
            CTSRepository _ctsRepo = new CTSRepository();
            List<BsonDocument> docs = _ctsRepo.GetCTSCategoryAndTopic(obj[0]);
            CoachOrMentorRepository _coachRepo = new CoachOrMentorRepository();
           
            
                            

            KindleSpur.Models.CoachOrMentor _obj = new Models.CoachOrMentor();
          

            
            return true;
        }
        //// GET: api/GetCTSCategories
        //public IEnumerable<BsonDocument> GetCTSCategories()
        //{
        //    CTSRepository _ctsRepo = new CTSRepository();
        //    return _ctsRepo.GetCategories();
        //}

        //// GET: api/GetCTSTopics/category
        //public IEnumerable<BsonDocument> GetCTSTopics(string category)
        //{
        //    if (String.IsNullOrEmpty(category)) throw new Exception("Please send valid category");
        //    CTSRepository _ctsRepo = new CTSRepository();
        //    return _ctsRepo.GetTopics(category);
        //}

        //// GET: api/GetCTSSkills/category
        //public IEnumerable<BsonDocument> GetCTSSkills(string category)
        //{
        //    if (String.IsNullOrEmpty(category)) throw new Exception("Please send valid category");
        //    CTSRepository _ctsRepo = new CTSRepository();
        //    return _ctsRepo.GetSkills(category);
        //}

        //// GET: api/GetCTSSkills/category/topic
        //public IEnumerable<BsonDocument> GetCTSSkills(string category, string topic)
        //{
        //    if (String.IsNullOrEmpty(category) || String.IsNullOrEmpty(topic)) throw new Exception("Please send valid category or topic");
        //    CTSRepository _ctsRepo = new CTSRepository();
        //    return _ctsRepo.GetSkills(category, topic);
        //}
    }
}