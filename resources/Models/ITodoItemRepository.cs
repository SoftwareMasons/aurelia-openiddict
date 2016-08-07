using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace resources.Models
{
    public interface ITodoItemRepository
    {
        void Add(TodoItem item);
        IEnumerable<TodoItem> GetAll();
        TodoItem Find(string key);
        TodoItem Remove(string key);
        void Update(TodoItem item);
    }
}