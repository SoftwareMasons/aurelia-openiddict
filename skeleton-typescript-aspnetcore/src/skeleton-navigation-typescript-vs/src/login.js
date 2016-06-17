var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", 'aurelia-authentication', 'aurelia-dependency-injection', 'aurelia-event-aggregator'], function (require, exports, aurelia_authentication_1, aurelia_dependency_injection_1, aurelia_event_aggregator_1) {
    "use strict";
    var Login = (function () {
        function Login(auth, eventAggregator) {
            this.heading = 'Login';
            this.auth = auth;
            this.eventAggregator = eventAggregator;
        }
        ;
        Login.prototype.login = function () {
            var _this = this;
            var loginOptions = {
                username: this.username,
                password: this.password,
                grant_type: 'password',
                scope: 'openid profile email roles'
            };
            return this.auth.login(loginOptions)
                .then(function (response) {
                console.log("success logged " + response);
                _this.eventAggregator.publish('authChanged');
            })
                .catch(function (err) {
                err.json().then(function (e) {
                    console.log("login failure : " + e.message);
                });
            });
        };
        ;
        Login.prototype.authenticate = function (name) {
            return this.auth.authenticate(name, false, null)
                .then(function (response) {
            });
        };
        Login = __decorate([
            aurelia_dependency_injection_1.inject(aurelia_authentication_1.AuthService, aurelia_event_aggregator_1.EventAggregator), 
            __metadata('design:paramtypes', [aurelia_authentication_1.AuthService, aurelia_event_aggregator_1.EventAggregator])
        ], Login);
        return Login;
    }());
    exports.Login = Login;
});
