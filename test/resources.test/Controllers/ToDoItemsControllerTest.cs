using NUnit.Framework;
using resources.Controllers;
using Moq;
using resources.Data;
using resources.Models;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using resources.Services;

namespace resources.test.Controllers
{
    [TestFixture]
    public class ToDoItemsControllerTest
    {
        ApplicationDbContext dbContext;

        [OneTimeSetUp]
        public void beforeEachTest()
        {
            var optionsBuilder = new DbContextOptionsBuilder<ApplicationDbContext>();
            optionsBuilder.UseInMemoryDatabase();
            dbContext = new ApplicationDbContext(optionsBuilder.Options);
            dbContext.TodoItems.AddRange(
                new TodoItem { UserId = "Bob@example.com", Description = "This is a test" },
                new TodoItem { UserId = "Bob@example.com", Description = "This is another test" },
                new TodoItem { UserId = "Alice@example.com", Description = "Another that should not be returned" }
            );
            dbContext.SaveChanges();
        }

        [OneTimeTearDown]
        public void afterEachTest()
        {
            dbContext.Dispose();
        }

        [TestCase("Bob@example.com", 2)]
        [TestCase("Alice@example.com", 1)]
        public void GetTodoItems_ReturnCurrentUserItems_EqualsExpectedResult(string emailAddress, int expectedCount)
        {
            var currentContext = new Mock<ICurrentContextAdapter>();
            currentContext.Setup(x => x.CurrentUserName).Returns(emailAddress);

            TodoItemsController sut = new TodoItemsController(dbContext, currentContext.Object);

            var actualResults = sut.GetTodoItems();
            Assert.That(actualResults.Count<ToDoItemForUser>(), Is.EqualTo(expectedCount));
        }

        [Test]
        public void GetTodoItems_NewUser_ReturnDefaultItems()
        {
            var currentContext = new Mock<ICurrentContextAdapter>();
            currentContext.Setup(x => x.CurrentUserName).Returns("NewUser@example.com");

            TodoItemsController sut = new TodoItemsController(dbContext, currentContext.Object);

            var actualResults = sut.GetTodoItems();
            Assert.That(actualResults.Count<ToDoItemForUser>(), Is.EqualTo(2));
        }
    }
}
