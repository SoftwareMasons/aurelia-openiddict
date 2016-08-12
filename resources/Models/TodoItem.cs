using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace resources.Models
{
    public class TodoItem
    {
        public string UserId { get; set;  }
        public int Id { get; set; }
        public string Description { get; set; }
        public bool Completed { get; set; }
    }
}
