using LightBakes.Models;
using Newtonsoft.Json;
using System;
using System.Globalization;
using System.Web.Mvc;

namespace LightBakes.Controllers
{
    public class EmailController : Controller
    {
        private IMailer _mailer;

        public EmailController(IMailer mailer)
        {
            _mailer = mailer;
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public bool Contact(FormCollection collection)
        {
            try
            {
                string contactString = Convert.ToString(collection["contact"]);
                Contact contact = JsonConvert.DeserializeObject<Contact>(contactString);
                string body = "<b>Nom: </b> " + contact.Name;
                body += "<br/>";
                body += "<b>Email: </b>" + contact.Email;
                body += "<br/>";
                body += "<b>Tel: </b>" + contact.Tel;
                body += "<br/>";
                body += "<b>Message: </b>" + contact.Message;
                return _mailer.SendEmailAsync("contact.lightbakes@gmail.com", "contact.lightbakes@gmail.com", "Nouveau message - formulaire de contact", body);
            }
            catch
            {
                return false;
            }
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [ValidateInput(false)]
        public bool SendOrder(FormCollection collection)
        {
            try
            {
                string ordersString = Convert.ToString(collection["Orders"]);
                string customerInfoString = Convert.ToString(collection["CustomerInfo"]);

                Order[] orders = JsonConvert.DeserializeObject<Order[]>(ordersString);
                CustomerInfo customerInfo = JsonConvert.DeserializeObject<CustomerInfo>(customerInfoString);

                string body = "<h3>Commande:</h3>";
                int i = 1;
                float totalPrice = 0;
                var culture = (CultureInfo)CultureInfo.CurrentCulture.Clone();
                culture.NumberFormat.NumberDecimalSeparator = ",";
                foreach (var order in orders)
                {
                    body += i + ") " + order.Quantity + " " + order.Product + ", " + order.Unity + " " + order.Option + " - " + order.TotalPrice.Replace(".", ",") + " TND <br/>";
                    i++;
                    totalPrice += float.Parse(order.TotalPrice.Replace(".", ","), culture);
                }

                body += "<br/>Frais de livraison: 6 TND<br/>";
                body += "<br/><b><u>Prix total:</u> " + (totalPrice + 6) + " TND</b> <br/><br/>";

                body += "<h3>Information client:</h3>";

                body += "<b>Nom: </b> " + customerInfo.Name;
                body += "<br/>";
                body += "<b>Email: </b>" + customerInfo.Email;
                body += "<br/>";
                body += "<b>Tel: </b>" + customerInfo.Tel;
                body += "<br/>";
                body += "<b>Adresse: </b>" + customerInfo.Address;
                return _mailer.SendEmailAsync("contact.lightbakes@gmail.com", "contact.lightbakes@gmail.com", "Nouvelle commande", body);
            }
            catch
            {
                return false;
            }
        }
    }
}
