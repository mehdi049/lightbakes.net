using System;

namespace LightBakes.Models
{
    public class Product
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Ingredient { get; set; }
        public string NutritionalValue { get; set; }
        public ProductOptions[] ProductOptions { get; set; }
        public UnityOptions[] UnityOptions { get; set; }
        public string Category { get; set; }
        public string Tags { get; set; }
        public string[] Images { get; set; }
        public bool Available { get; set; }
    }

    public class ProductOptions
    {
        public string Option { get; set; }
        public float Price { get; set; }
    }

    public class UnityOptions
    {
        public string Unity { get; set; }
        public float Price { get; set; }
    }

}