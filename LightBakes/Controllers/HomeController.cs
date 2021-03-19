using LightBakes.Models;
using Newtonsoft.Json;
using System.IO;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Routing;
using JsonSerializer = Newtonsoft.Json.JsonSerializer;

namespace LightBakes.Controllers
{
    public class HomeController : Controller
    {
        private readonly IHostingEnvironment _hostingEnvironment;
        private Product[] _products;

        public HomeController(IHostingEnvironment hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;

            string path = _hostingEnvironment.WebRootPath + "/data/product.json";
            using (StreamReader file = System.IO.File.OpenText(path))
            {
                JsonSerializer serializer = new JsonSerializer();
                _products = (Product[])serializer.Deserialize(file, typeof(Product[]));
            }
        }

        [Route("/")]
        public IActionResult Index()
        {
            ViewBag.Home = true;
            ViewData["Title"] = "Light bakes";
            ViewBag.products = _products;
            return View();
        }

        [Route("/menu")]
        public IActionResult Menu()
        {
            ViewData["Title"] = "Light bakes - Menu";
            ViewBag.products = _products;
            return View();
        }

        [Route("/product/{id}")]
        public IActionResult Product(string id)
        {
            Product product = _products.Where(x => x.Id == id).FirstOrDefault();
            if (product == null)
                return RedirectToAction("Index");
            ViewBag.ProductJson = JsonConvert.SerializeObject(product);
            ViewBag.SimilarProducts = null;
            Product[] similarProducts = _products.Where(x => x.Category == product.Category).ToArray();
            if (similarProducts.Length > 1)
            {
                similarProducts = similarProducts.Where(x => x.Id != id).ToArray();
                ViewBag.SimilarProducts = similarProducts;
            }
            ViewData["Title"] = "Light bakes - " + product.Title;
            return View(product);
        }

        [Route("/basket")]
        public IActionResult Basket()
        {
            ViewData["Title"] = "Light bakes - Panier";
            return View();
        }

        public IActionResult _MenuPartial()
        {
            return PartialView(_products);
        }

        public IActionResult _FooterPartial()
        {
            return PartialView();
        }

    }
}