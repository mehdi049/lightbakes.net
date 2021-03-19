namespace LightBakes.Models
{
    public interface IMailer
    {
        bool SendEmailAsync(string senderEmail, string receiverEmail, string subject, string body);
    }
}
