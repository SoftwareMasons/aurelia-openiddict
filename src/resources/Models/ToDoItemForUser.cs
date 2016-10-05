using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace resources.Models
{
    public class ToDoItemForUser
    {
        public int Id { get; set; }
        public string Description { get; set;  }
        public Boolean Completed { get; set; }
    }
}
