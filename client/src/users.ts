import {inject} from 'aurelia-dependency-injection';
import {Endpoint, Rest} from 'aurelia-api';
import 'fetch';

@inject(Endpoint.of('github'))
export class Users {
  heading = 'Github Users';
  users = [];
  private githubClient: Rest;

  constructor(private endPoint: Rest) {
      this.githubClient = endPoint;
  }

  activate() {
      return this.githubClient.find('users')
          .then(users => this.users = users);
  }
}
