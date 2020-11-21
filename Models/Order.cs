using Newtonsoft.Json;

namespace LightBakes.Models
{
    public class Order
    {
        public string Id { get; set; }
        public string Option { get; set; }
        public string Product { get; set; }
        public string Quantity { get; set; }
        public string TotalPrice { get; set; }
        public string Unity { get; set; }
    }
}
