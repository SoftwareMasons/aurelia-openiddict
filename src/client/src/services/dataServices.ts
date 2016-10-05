import {inject} from 'aurelia-dependency-injection';
import {Rest, Endpoint} from 'aurelia-api';
import {getLogger} from './getLogger';
import {Logger} from 'aurelia-logging';

@inject(Endpoint.of('resources'), Endpoint.of('github'))
export class DataServices {
  resourcesClient: Rest;
  githubClient: Rest;
  logger: Logger;

  constructor(resourcesClient: Rest, githubClient: Rest) {
    this.resourcesClient = resourcesClient;
    this.githubClient = githubClient;
    this.logger = getLogger('Data Services');
  }

  getToDoItems() {
    return this.resourcesClient.find('todoItems').then(response => {
      this.logger.info('Successfully retrieved Todo Items');
      return response;
    });
  }

  getUsers() {
    return this.githubClient.find('users').then(users => {
      this.logger.info('Successfully retrieved Users');
      return users;
    });
  }
}