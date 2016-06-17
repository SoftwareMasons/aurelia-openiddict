import {AuthService} from 'aurelia-authentication';
import {inject} from 'aurelia-dependency-injection';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(AuthService, EventAggregator)
export class Logout {
    authService: AuthService = null;
    eventAggregator: EventAggregator;

    constructor(authService, eventAggregator) {
        this.authService = authService;
        this.eventAggregator = eventAggregator;
    };

    activate() {
        this.authService.logout("#/login")
            .then(response => {
                console.log("ok logged out on  logout.js");
                this.eventAggregator.publish('authChanged', false);
            })
            .catch(err => {
                console.log("error logged out  logout.js");

            });
    }
}
