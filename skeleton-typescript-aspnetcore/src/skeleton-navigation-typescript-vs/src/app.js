var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", 'aurelia-dependency-injection', 'aurelia-router', './app.router.config', 'aurelia-authentication', 'bootstrap'], function (require, exports, aurelia_dependency_injection_1, aurelia_router_1, app_router_config_1, aurelia_authentication_1) {
    "use strict";
    var App = (function () {
        function App(router, fetchConfig, appRouterConfig) {
            this.router = router;
            this.fetchConfig = fetchConfig;
            this.appRouterConfig = appRouterConfig;
        }
        App.prototype.activate = function () {
            this.appRouterConfig.configure();
            this.fetchConfig.configure();
        };
        App = __decorate([
            aurelia_dependency_injection_1.inject(aurelia_router_1.Router, aurelia_authentication_1.FetchConfig, app_router_config_1.default), 
            __metadata('design:paramtypes', [Object, Object, Object])
        ], App);
        return App;
    }());
    exports.App = App;
});
