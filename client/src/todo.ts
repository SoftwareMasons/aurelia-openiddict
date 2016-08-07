import {inject} from 'aurelia-dependency-injection';
import {LogManager} from 'aurelia-framework';
import {Logger} from 'aurelia-logging';
import {Endpoint} from 'aurelia-api';

@inject(Endpoint.of('resources'))
export class ToDo {
    private logger: Logger;
    private resourcesEndpoint: Endpoint;
    todoItems: any;

    constructor(endPoint) {
        this.logger = LogManager.getLogger('ToDo ViewModel');
        this.resourcesEndpoint = endPoint;
    }

    activate() {
        this.logger.info('Todo ViewModel activated');
        this.resourcesEndpoint.find('todoItem')
            .then(todoItems => this.todoItems = todoItems);
    }
}