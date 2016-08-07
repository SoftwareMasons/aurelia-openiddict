import {AuthService} from 'aurelia-authentication';
import {inject} from 'aurelia-dependency-injection';
import {EventAggregator} from 'aurelia-event-aggregator';
import {Config, Rest} from 'aurelia-api';
import {LogManager} from 'aurelia-framework';
import {Logger} from 'aurelia-logging';

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
    private logger: Logger;

    constructor(authService, eventAggregator, config) {
        this.authService = authService;
        this.eventAggregator = eventAggregator;
        this.authEndpoint = config.getEndpoint('logout');
        this.logger = LogManager.getLogger('Logout');
    };

    activate() {
        let authResponse: AuthResponse = JSON.parse(localStorage.getItem('aurelia_authentication'));
        let logoutUrl: string = '/logout?post_logout_redirect_uri=' + encodeURIComponent('http://localhost:49862/') + '&id_token_hint=' + encodeURIComponent(authResponse.id_token);
        this.authService.logout()
            .then(response => {
                this.authEndpoint.request('get', logoutUrl, undefined, { credentials: 'include', mode: 'no-cors' })
                    .then(response => {
                        this.logger.info("logout successful");
                        this.eventAggregator.publish('authChanged');
                    })
                    .catch(err => {
                        if (err.status === 0) {
                            this.logger.info("logout successful");
                            this.eventAggregator.publish('authChanged');
                        }
                    });
            })
            .catch(err => {
                this.logger.info("error logging out");
            });
    }
}

