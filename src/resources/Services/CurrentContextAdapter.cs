using System;
using Microsoft.AspNetCore.Http;

namespace resources.Services
{
    public class CurrentContextAdapter : ICurrentContextAdapter
    {
        private readonly IHttpContextAccessor _context;
        public CurrentContextAdapter(IHttpContextAccessor context)
        {
            this._context = context;
        }

        public string CurrentUserName
        {
            get
            {
                if (this._context != null)
                {
                    return _context.HttpContext.User.Identity.Name;
                }
                else
                {
                    return String.Empty;
                }
            }
        }
    }
}
