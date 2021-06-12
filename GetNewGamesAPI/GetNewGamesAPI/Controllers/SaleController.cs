using GetNewGamesAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
namespace GetNewGamesAPI.Controllers
{
    [Route("api/Sale/{action}")]

    public class SaleController : ApiController
    {
      
        [HttpGet]
        [ActionName("Get")]
        public IEnumerable<Sale> Get()
        {
            return new SaleRepositorio().Retrive();
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