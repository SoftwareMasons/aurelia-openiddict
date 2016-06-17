var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", 'aurelia-framework', 'aurelia-dependency-injection', 'aurelia-authentication', 'aurelia-framework', 'aurelia-router', 'aurelia-event-aggregator'], function (require, exports, aurelia_framework_1, aurelia_dependency_injection_1, aurelia_authentication_1, aurelia_framework_2, aurelia_router_1, aurelia_event_aggregator_1) {
    "use strict";
    var NavBar = (function () {
        function NavBar(auth, bindingEngine, ea) {
            this._isAuthenticated = false;
            this.displayName = "";
            this.router = null;
            this.auth = null;
            this.bindingEngine = null;
            this.auth = auth;
            this.bindingEngine = bindingEngine;
            this._isAuthenticated = this.auth.isAuthenticated();
            this.eventAggregator = ea;
            this.subscription = this.eventAggregator.subscribe('authChanged', this.authChangedListener);
        }
        NavBar.prototype.authChangedListener = function (newValue) {
            this._isAuthenticated = newValue;
        };
        Object.defineProperty(NavBar.prototype, "isAuthenticated", {
            get: function () {
                return this._isAuthenticated;
            },
            enumerable: true,
            configurable: true
        });
        NavBar.prototype.deactivate = function () {
            this.subscription.dispose();
        };
        __decorate([
            aurelia_framework_1.bindable, 
            __metadata('design:type', aurelia_router_1.Router)
        ], NavBar.prototype, "router", void 0);
        NavBar = __decorate([
            aurelia_dependency_injection_1.inject(aurelia_authentication_1.AuthService, aurelia_framework_2.BindingEngine, aurelia_event_aggregator_1.EventAggregator), 
            __metadata('design:paramtypes', [Object, Object, Object])
        ], NavBar);
        return NavBar;
    }());
    exports.NavBar = NavBar;
});
