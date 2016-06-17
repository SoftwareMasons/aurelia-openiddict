var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", 'aurelia-framework', 'aurelia-authentication', 'aurelia-router', 'aurelia-event-aggregator', 'aurelia-api'], function (require, exports, aurelia_framework_1, aurelia_authentication_1, aurelia_router_1, aurelia_event_aggregator_1, aurelia_api_1) {
    "use strict";
    var NavBar = (function () {
        function NavBar(auth, bindingEngine, ea, config) {
            var _this = this;
            this.displayName = "";
            this.router = null;
            this.auth = null;
            this.bindingEngine = null;
            this.authChangedListener = function () {
                _this.updateDisplayName();
            };
            this.auth = auth;
            this.bindingEngine = bindingEngine;
            this.eventAggregator = ea;
            this.authConfig = config;
            this.updateDisplayName();
            this.subscription = this.eventAggregator.subscribe('authChanged', this.authChangedListener);
        }
        Object.defineProperty(NavBar.prototype, "isAuthenticated", {
            get: function () {
                console.log('Read isAuthenticated');
                return this.auth.authenticated;
            },
            enumerable: true,
            configurable: true
        });
        NavBar.prototype.updateDisplayName = function () {
            var _this = this;
            if (this.auth.authenticated) {
                this.auth.getMe().then(function (response) {
                    return _this.displayName = response.preferred_username;
                });
            }
            else {
                this.displayName = "";
            }
            ;
        };
        __decorate([
            aurelia_framework_1.bindable, 
            __metadata('design:type', aurelia_router_1.Router)
        ], NavBar.prototype, "router", void 0);
        __decorate([
            aurelia_framework_1.computedFrom('auth.authenticated'), 
            __metadata('design:type', Boolean)
        ], NavBar.prototype, "isAuthenticated", null);
        NavBar = __decorate([
            aurelia_framework_1.inject(aurelia_authentication_1.AuthService, aurelia_framework_1.BindingEngine, aurelia_event_aggregator_1.EventAggregator, aurelia_api_1.Config), 
            __metadata('design:paramtypes', [Object, Object, Object, Object])
        ], NavBar);
        return NavBar;
    }());
    exports.NavBar = NavBar;
});
