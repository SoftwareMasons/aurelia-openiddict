using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace server.Models.AuthorizationViewModels {
    public class LogoutViewModel
    {
        [BindNever]
        public string RequestId { get; set; }
    }
}
