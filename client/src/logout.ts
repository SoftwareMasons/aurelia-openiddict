import {AuthService} from 'aurelia-authentication';
import {inject} from 'aurelia-dependency-injection';
import {EventAggregator} from 'aurelia-event-aggregator';
import {Config, Rest} from 'aurelia-api';

class AuthResponse {
    token_type: string;
    access_token: string;
    expires_in: number;
    id_token: string;
}

@inject(AuthService, EventAggregator, Config)
export class Logout {
    authService: AuthService = null;
    eventAggregator: EventAggregator;
    authEndpoint: Rest;

    constructor(authService, eventAggregator, config) {
        this.authService = authService;
        this.eventAggregator = eventAggregator;
        this.authEndpoint = config.getEndpoint('logout');
    };

    activate() {
        let authResponse: AuthResponse = JSON.parse(localStorage.getItem('aurelia_authentication'));
        //let logoutUrl: string = encodeURIComponent('/logout?post_logout_redirect_uri=http://localhost:49862&id_token_hint=' + authResponse.id_token);
        let logoutUrl = '/logout';
        let logoutParms = {
            post_logout_redirect_uri: 'http://localhost:49862/Authentication/Logout',
            id_token_hint: authResponse.id_token
        };
        //  get authentication cookie 
        var cookies = document.cookie;
        this.authService.logout()
            .then(response => {
                this.authEndpoint.request('post', logoutUrl, logoutParms, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
                    .then(response => {
                        console.log("call to logoutUrl successful");
                        this.eventAggregator.publish('authChanged');
                    })
                    .catch(err => {
                        console.log("call to logoutUrl failed");
                    });
            })
            .catch(err => {
                console.log("error logged out  logout.js");
            });
    }
}

