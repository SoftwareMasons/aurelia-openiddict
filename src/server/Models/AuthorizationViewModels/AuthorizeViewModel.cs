﻿using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace server.Models.AuthorizationViewModels {
    public class AuthorizeViewModel {
        [Display(Name = "Application")]
        public string ApplicationName { get; set; }

        [BindNever]
        public IDictionary<string, string> Parameters { get; set; }

        [Display(Name = "Scope")]
        public string Scope { get; set; }
    }
}
