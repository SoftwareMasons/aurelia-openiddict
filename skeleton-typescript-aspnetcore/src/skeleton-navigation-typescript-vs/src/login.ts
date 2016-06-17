import {AuthService} from 'aurelia-authentication';
import {inject} from 'aurelia-dependency-injection';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(AuthService, EventAggregator)
export class Login {
    auth: AuthService;
    username: string;
    password: string;
    heading: string = 'Login';
    eventAggregator: EventAggregator;

    constructor(auth: AuthService, eventAggregator: EventAggregator) {
        this.auth = auth;
        this.eventAggregator = eventAggregator;
    };

    login() {
        let loginOptions = {
            username: this.username,
            password: this.password,
            grant_type: 'password',
            scope: 'openid profile email roles'
        };
        return this.auth.login(loginOptions)
            .then(response => {
                console.log("success logged " + response);
                this.eventAggregator.publish('authChanged');                
            })
            .catch(err => {
                err.json().then(function (e) {
                    console.log("login failure : " + e.message);
                });

            });
    };

    authenticate(name) {
        return this.auth.authenticate(name, false, null)
            .then((response) => {
            });

    }
}
