import {inject} from 'aurelia-dependency-injection';
import {DataServices} from '../services/dataServices';
import {ToDoItem} from '../models/toDoItem';

@inject(DataServices)
export class ToDo {
  dataServices: DataServices;
  todoItems: ToDoItem[];

  constructor(dataServices) {
    this.dataServices = dataServices;
  }

  activate() {
    return this.dataServices.getToDoItems()
      .then((todoItems: ToDoItem[]) => {
        this.todoItems = todoItems;
      });
  }
}
