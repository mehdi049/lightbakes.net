using LightBakes.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace LightBakes.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Home = true;
            return View();
        }

        public ActionResult Menu()
        {
            return View();
        }

        public ActionResult Product(string id)
        {
            using (StreamReader file = System.IO.File.OpenText(@"C:\Users\E90037408\Desktop\Projects\Freelance\Lightbakes.Net\data\product.json"))
            {
                JsonSerializer serializer = new JsonSerializer();
                Product[] products = (Product[])serializer.Deserialize(file, typeof(Product[]));
                Product product = products.Where(x => x.Id == id).FirstOrDefault();
                ViewBag.ProductJson = JsonConvert.SerializeObject(product);
                ViewBag.SimilarProducts = null;
                Product[] similarProducts = products.Where(x => x.Category == product.Category).ToArray();
                if (similarProducts.Length > 1)
                {
                    similarProducts = similarProducts.Where(x => x.Id != id).ToArray();
                    ViewBag.SimilarProducts = similarProducts;
                }
                return View(product);
            }
        }

        public ActionResult Gallery()
        {
            return View();
        }

        public ActionResult Panier()
        {
            return View();
        }



        public PartialViewResult _MenuPartial()
        {
            using (StreamReader file = System.IO.File.OpenText(@"C:\Users\E90037408\Desktop\Projects\Freelance\Lightbakes.Net\data\product.json"))
            {
                JsonSerializer serializer = new JsonSerializer();
                Product[] products = (Product[])serializer.Deserialize(file, typeof(Product[]));
                return PartialView(products);
            }
        }


        public PartialViewResult _FooterPartial()
        {
            return PartialView();
        }
    }
}