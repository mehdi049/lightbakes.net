using System.Net.Mail;
using System.Net;

namespace LightBakes.Models
{
    public class Mailer : IMailer
    {
        public bool SendEmailAsync(string senderEmail, string receiverEmail, string subject, string body)
        {
            try
            {
                var smtpClient = new SmtpClient("smtp.gmail.com")
                {
                    Port = 587,
                    Credentials = new NetworkCredential("contact.lightbakes@gmail.com", "LB_2020!!"),
                    EnableSsl = true
                };
                MailMessage message = new MailMessage();
                message.To.Add(receiverEmail); // Add Receiver mail Address  
                message.From = new MailAddress(senderEmail); // Sender address  
                message.Subject = subject;

                message.IsBodyHtml = true; //HTML email  
                message.Body = body;

                smtpClient.Send(message);
                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}
