using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using resources.Data;
using resources.Models;
using Microsoft.AspNetCore.Authorization;

namespace resources.Controllers
{
    [Produces("application/json")]
    [Route("api/TodoItems")]
    public class TodoItemsController : Controller
    {
        private readonly ApplicationDbContext _context;

        public TodoItemsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/TodoItems
        [HttpGet, Authorize]
        public IEnumerable<TodoItem> GetTodoItems()
        {
            string emailAddress = User.Identity.Name;
            if (!GetCurrentUserToDoItemCount(emailAddress))
            {
                CreateDefaultTodoItemsForNewUser(emailAddress);
            }
            return _context.TodoItems.Where<TodoItem>(c => c.UserId == emailAddress);
        }

        private void CreateDefaultTodoItemsForNewUser(string emailAddress)
        {
            _context.Add(new TodoItem()
            {
                UserId = emailAddress,
                Description = "Read Kevin Chalet's blogs on writing your own OpenId Connect Server before posting on Gitter"
            });
            _context.Add(new TodoItem()
            {
                UserId = emailAddress,
                Description = "Google your issue before posting on the OpenIddict Gitter channel"
            });
            _context.SaveChanges();
        }

        private bool GetCurrentUserToDoItemCount(string emailAddress)
        {
            return (_context.TodoItems.Where<TodoItem>(item => item.UserId == emailAddress).Count<TodoItem>() > 0);
        }
        //// GET: api/TodoItems/5
        //[HttpGet("{id}")]
        //public async Task<IActionResult> GetTodoItem([FromRoute] string id)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    TodoItem todoItem = await _context.TodoItems.SingleOrDefaultAsync(m => m.Id == id);

        //    if (todoItem == null)
        //    {
        //        return NotFound();
        //    }

        //    return Ok(todoItem);
        //}

        //// PUT: api/TodoItems/5
        //[HttpPut("{id}")]
        //public async Task<IActionResult> PutTodoItem([FromRoute] string id, [FromBody] TodoItem todoItem)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    if (id != todoItem.Id)
        //    {
        //        return BadRequest();
        //    }

        //    _context.Entry(todoItem).State = EntityState.Modified;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!TodoItemExists(id))
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return NoContent();
        //}

        //// POST: api/TodoItems
        //[HttpPost]
        //public async Task<IActionResult> PostTodoItem([FromBody] TodoItem todoItem)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    _context.TodoItems.Add(todoItem);
        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateException)
        //    {
        //        if (TodoItemExists(todoItem.Id))
        //        {
        //            return new StatusCodeResult(StatusCodes.Status409Conflict);
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return CreatedAtAction("GetTodoItem", new { id = todoItem.Id }, todoItem);
        //}

        //// DELETE: api/TodoItems/5
        //[HttpDelete("{id}")]
        //public async Task<IActionResult> DeleteTodoItem([FromRoute] string id)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    TodoItem todoItem = await _context.TodoItems.SingleOrDefaultAsync(m => m.Id == id);
        //    if (todoItem == null)
        //    {
        //        return NotFound();
        //    }

        //    _context.TodoItems.Remove(todoItem);
        //    await _context.SaveChangesAsync();

        //    return Ok(todoItem);
        //}

        //private bool TodoItemExists(string id)
        //{
        //    return _context.TodoItems.Any(e => e.Id == id);
        //}
    }
}