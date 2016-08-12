import {inject} from 'aurelia-dependency-injection';
import {LogManager} from 'aurelia-framework';
import {Logger} from 'aurelia-logging';
import {Endpoint, Rest} from 'aurelia-api';

@inject(Endpoint.of('resources'))
export class ToDo {
    private logger: Logger;
    private resourcesClient: Rest;
    todoItems: any;

    constructor(endPoint) {
        this.logger = LogManager.getLogger('ToDo ViewModel');
        this.resourcesClient = endPoint;
    }

    activate() {
        this.logger.info('Todo ViewModel activated');
        this.resourcesClient.find('todoItems')
            .then(todoItems => {
                this.todoItems = todoItems;
            }
        );
    }
}