using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using resources.Models;
using Microsoft.AspNetCore.Authorization;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace resources.Controllers
{
    [Route("api/[controller]"), Authorize]
    public class TodoItemController : Controller
    {
        public TodoItemController(ITodoItemRepository todoItems)
        {
            TodoItems = todoItems;
        }
        public ITodoItemRepository TodoItems { get; set; }

        public IEnumerable<TodoItem> GetAll()
        {
            return TodoItems.GetAll();
        }

        [HttpGet("{id}", Name = "GetTodo")]
        public IActionResult GetById(string id)
        {
            var item = TodoItems.Find(id);
            if (item == null)
            {
                return NotFound();
            }
            return new ObjectResult(item);
        }
    }
}

