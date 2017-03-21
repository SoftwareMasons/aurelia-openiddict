import {inject} from 'aurelia-dependency-injection';
import {DataServices} from '../services/dataServices';

@inject(DataServices)
export class Users {
  heading = 'Github Users';
  users = [];
  dataServices: DataServices;

  constructor(dataServices: DataServices) {
      this.dataServices = dataServices;
  }

  activate() {
    return this.dataServices.getUsers().then(response => {
      this.users = response;
    });
  }
}
