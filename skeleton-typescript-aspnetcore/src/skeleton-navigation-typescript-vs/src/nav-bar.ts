import {bindable, inject, BindingEngine, computedFrom} from 'aurelia-framework';
import {AuthService} from 'aurelia-authentication';
import {Router} from 'aurelia-router';
import {Subscription, EventAggregator} from 'aurelia-event-aggregator';
import {Config, Rest} from 'aurelia-api';
import {HttpClient} from 'aurelia-fetch-client';

@inject(AuthService, BindingEngine, EventAggregator, Config)
export class NavBar {
    displayName: string = "";
    @bindable router: Router = null;
    subscription: Subscription;
    eventAggregator: EventAggregator;
    authConfig: Config;
    private auth: AuthService = null;
    private bindingEngine: BindingEngine = null;

    constructor(auth, bindingEngine, ea, config) {
        this.auth = auth;
        this.bindingEngine = bindingEngine;
        this.eventAggregator = ea;
        this.authConfig = config;
        this.updateDisplayName();
        
        this.subscription = this.eventAggregator.subscribe('authChanged', this.authChangedListener);
    }

    authChangedListener =  () => {
        this.updateDisplayName();    
    }

    @computedFrom('auth.authenticated')
    get isAuthenticated(): boolean {
        return this.auth.authenticated;
    }

    private updateDisplayName() {
        if (this.auth.authenticated) {
            this.auth.getMe().then(response => {
                return this.displayName = response.preferred_username;
            });
        } else {
            this.displayName = "";
        };
    }
}
