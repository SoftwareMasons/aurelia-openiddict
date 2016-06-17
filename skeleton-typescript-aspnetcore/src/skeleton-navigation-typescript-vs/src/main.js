define(["require", "exports", './authConfig', 'bootstrap'], function (require, exports, authConfig_1) {
    "use strict";
    function configure(aurelia) {
        aurelia.use
            .standardConfiguration()
            .developmentLogging();
        aurelia.use.plugin('aurelia-animator-css');
        aurelia.use.plugin('aurelia-api', function (config) {
            config.registerEndpoint('connect', 'connect', { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
        });
        aurelia.use.plugin('aurelia-authentication', function (baseConfig) {
            baseConfig.configure(authConfig_1.default);
        });
        aurelia.start().then(function () { return aurelia.setRoot(); });
    }
    exports.configure = configure;
});
