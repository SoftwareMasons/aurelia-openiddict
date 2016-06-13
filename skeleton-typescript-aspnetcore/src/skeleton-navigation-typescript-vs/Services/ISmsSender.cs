using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace skeleton_navigation_typescript_vs.Services
{
    public interface ISmsSender
    {
        Task SendSmsAsync(string number, string message);
    }
}
