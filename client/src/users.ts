import {inject} from 'aurelia-dependency-injection';
import {Endpoint} from 'aurelia-api';
import 'fetch';

@inject(Endpoint.of('github'))
export class Users {
  heading = 'Github Users';
  users = [];
  private githubEndpoint: Endpoint;

  constructor(private endPoint: Endpoint) {
      this.githubEndpoint = endPoint;
  }

  activate() {
      return this.githubEndpoint.find('users')
          .then(users => this.users = users);
  }
}
