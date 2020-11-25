using LightBakes.Models;
using Newtonsoft.Json;
using System.IO;
using System.Linq;
using System.Web.Mvc;

namespace LightBakes.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Home = true;
            ViewBag.PageTitle = "Light bakes";
            return View();
        }

        public ActionResult Menu()
        {
            ViewBag.PageTitle = "Light bakes - Menu";
            return View();
        }

        public ActionResult Product(string id)
        {
            string path = Server.MapPath("~/data/product.json");
            using (StreamReader file = System.IO.File.OpenText(path))
            {
                JsonSerializer serializer = new JsonSerializer();
                Product[] products = (Product[])serializer.Deserialize(file, typeof(Product[]));
                Product product = products.Where(x => x.Id == id).FirstOrDefault();
                if (product == null)
                   return RedirectToAction("Index");
                ViewBag.ProductJson = JsonConvert.SerializeObject(product);
                ViewBag.SimilarProducts = null;
                Product[] similarProducts = products.Where(x => x.Category == product.Category).ToArray();
                if (similarProducts.Length > 1)
                {
                    similarProducts = similarProducts.Where(x => x.Id != id).ToArray();
                    ViewBag.SimilarProducts = similarProducts;
                }
                ViewBag.PageTitle = "Light bakes - "+product.Title;
                return View(product);
            }
        }

        public ActionResult Basket()
        {
            ViewBag.PageTitle = "Light bakes - Panier";
            return View();
        }

        public PartialViewResult _MenuPartial()
        {
            string path = Server.MapPath("~/data/product.json");
            using (StreamReader file = System.IO.File.OpenText(path))
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