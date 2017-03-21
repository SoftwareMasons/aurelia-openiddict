import {bindable, inject, BindingEngine, computedFrom, LogManager} from 'aurelia-framework';
import {AuthService, Popup} from 'aurelia-authentication';
import {Router} from 'aurelia-router';
import {Config, Rest} from 'aurelia-api';
import {HttpClient} from 'aurelia-fetch-client';
import { Logger } from 'aurelia-logging';
import authConfig from '../services/authConfig';

@inject(AuthService, BindingEngine, Config, Popup)
export class NavBar {
    displayName: string = "";
    @bindable router: Router = null;
    authConfig: Config;
    private auth: AuthService = null;
    private bindingEngine: BindingEngine = null;
    private logger: Logger;
    private popup: Popup;

    constructor(auth, bindingEngine, config, popup) {
        this.auth = auth;
        this.bindingEngine = bindingEngine;
        this.authConfig = config;
        this.updateDisplayName();
        this.logger = LogManager.getLogger('Nav-bar');
        this.popup = popup;     
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

    register() {
      const popupOptions = authConfig.providers['openiddict'].popupOptions;
      const popup = this.popup.open(authConfig.signupUrl, 'openiddict', popupOptions);
      return popup.pollPopup().then(oauthData => {
        this.authenticate();
      });
    } 

    private updateDisplayName() {
        if (this.auth.authenticated) {
            this.auth.getMe().then(response => {
                return this.displayName = response.email;
            });
        } else {
            this.displayName = '';
        };
    }
}
