
using GetNewGamesAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace GetNewGamesAPI.Controllers
{

    [Route("api/User/{action}")]
    public class UserController : ApiController
    {


        [HttpGet]
        [ActionName("Get")]
        public IEnumerable<User> Get()
        {
            return new UserRepositorio().Retrive();
        }

        [HttpGet]
        [Route("api/User/Log/{user}/{pass}")]
  
        public bool log(string user,string pass)
        {
            return new UserRepositorio().log(user, pass);
        }


        public string Get(int id)
        {
            return "value";
        }


        public void Post([FromBody]string value)
        {
        }


        public void Put(int id, [FromBody]string value)
        {
        }


        public void Delete(int id)
        {
        }
    }
}