using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace skeleton_navigation_typescript_vs.Services
{
    public interface IEmailSender
    {
        Task SendEmailAsync(string email, string subject, string message);
    }
}
