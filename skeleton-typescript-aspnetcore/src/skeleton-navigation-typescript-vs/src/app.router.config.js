var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", 'aurelia-authentication', 'aurelia-dependency-injection', 'aurelia-router'], function (require, exports, aurelia_authentication_1, aurelia_dependency_injection_1, aurelia_router_1) {
    "use strict";
    var default_1 = (function () {
        function default_1(router) {
            this.router = router;
        }
        default_1.prototype.configure = function () {
            this.router.configure(function (config) {
                config.title = "Aurelia";
                config.addPipelineStep('authorize', aurelia_authentication_1.AuthenticateStep);
                config.map([
                    { route: ['', 'welcome'], moduleId: './welcome', nav: true, title: 'Welcome' },
                    { route: 'users', name: 'users', moduleId: './users', nav: true, title: 'Github Users', auth: true },
                    { route: 'child-router', moduleId: './child-router', nav: true, title: 'Child Router' },
                    { route: 'login', moduleId: './login', nav: false, title: 'Login' },
                    { route: 'logout', moduleId: './logout', nav: false, title: 'Logout' }
                ]);
                return config;
            });
        };
        default_1 = __decorate([
            aurelia_dependency_injection_1.inject(aurelia_router_1.Router), 
            __metadata('design:paramtypes', [Object])
        ], default_1);
        return default_1;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = default_1;
});
