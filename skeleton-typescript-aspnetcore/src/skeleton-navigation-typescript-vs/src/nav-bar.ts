import {bindable} from 'aurelia-framework';
import {inject} from 'aurelia-dependency-injection';
import {AuthService} from 'aurelia-authentication';
import {BindingEngine} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Subscription, EventAggregator} from 'aurelia-event-aggregator';

@inject(AuthService, BindingEngine, EventAggregator)
export class NavBar {
    private _isAuthenticated: boolean = false;
    displayName: string = "";
    @bindable router: Router = null;
    subscription: Subscription;
    eventAggregator: EventAggregator;

    private auth: AuthService = null;
    private bindingEngine: BindingEngine = null;

    constructor(auth, bindingEngine, ea) {
        this.auth = auth;
        this.bindingEngine = bindingEngine;
        this._isAuthenticated = this.auth.isAuthenticated();
        this.eventAggregator = ea;

        this.subscription = this.eventAggregator.subscribe('authChanged', this.authChangedListener);

    }

    authChangedListener(newValue: boolean) {
        this._isAuthenticated = newValue;
    }

    get isAuthenticated() {
        return this._isAuthenticated;
    }

    deactivate() {
        this.subscription.dispose();
    }
}
