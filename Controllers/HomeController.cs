using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace LightBakes.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Menu()
        {
            return View();
        }

        public ActionResult Product(string id)
        {
            return View();
        }

        public ActionResult Gallery()
        {
            return View();
        }

        public ActionResult Panier()
        {
            return View();
        }
    }
}