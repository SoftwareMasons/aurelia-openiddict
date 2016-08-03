using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace server.Models.AuthorizationViewModels {
    public class LogoutViewModel {
        [BindNever]
        public IDictionary<string, string> Parameters { get; set; }
    }
}
