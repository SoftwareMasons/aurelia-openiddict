import {bindable, inject, BindingEngine, computedFrom, LogManager} from 'aurelia-framework';
import {AuthService} from 'aurelia-authentication';
import {Router} from 'aurelia-router';
import {Config, Rest} from 'aurelia-api';
import {HttpClient} from 'aurelia-fetch-client';
import {Logger} from 'aurelia-logging';

@inject(AuthService, BindingEngine, Config)
export class NavBar {
    displayName: string = "";
    @bindable router: Router = null;
    authConfig: Config;
    private auth: AuthService = null;
    private bindingEngine: BindingEngine = null;
    private logger: Logger;

    constructor(auth, bindingEngine, config) {
        this.auth = auth;
        this.bindingEngine = bindingEngine;
        this.authConfig = config;
        this.updateDisplayName();
        this.logger = LogManager.getLogger('Nav-bar');     
    }

    @computedFrom('auth.authenticated')
    get isAuthenticated(): boolean {
        return this.auth.authenticated;
    }

    authenticate() {
        return this.auth.authenticate('openiddict', '/#')
            .then((response) => {
                this.logger.info("login successful");
                this.updateDisplayName();
            });
    }

    logout() {
        return this.auth.logout('/#', undefined, 'openiddict')
            .then(response => {
                this.displayName = '';
            });
    }


    private updateDisplayName() {
        if (this.auth.authenticated) {
            this.auth.getMe().then(response => {
                return this.displayName = response.preferred_username;
            });
        } else {
            this.displayName = '';
        };
    }
}
