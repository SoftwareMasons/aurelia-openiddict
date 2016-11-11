export default {
    endpoint: 'auth',
    configureEndpoints: ['auth', 'resources'],
    profileUrl: '/account/userinfo',
    loginRedirect: false,
    providers: {
      openiddict: {
          name: 'openiddict',
            oauthType: '2.0',
            clientId: 'aurelia-openiddict',
            redirectUri: 'http://localhost:49862/',
            authorizationEndpoint: 'http://localhost:54540/connect/authorize',
            logoutEndpoint: 'http://localhost:54540/connect/logout',
            postLogoutRedirectUri: 'http://localhost:49862/',
            responseType: 'token id_token',
            scope: ['openid email profile'],
            requiredUrlParams: ['scope', 'nonce', 'resource'],
            state: function () {
                var text = "";
                var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                for (var i = 0; i < 32; i++) {
                    text += possible.charAt(Math.floor(Math.random() * possible.length));
                }
                return text;
            },
            nonce: function () {
                var text = "";
                var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                for (var i = 0; i < 32; i++) {
                    text += possible.charAt(Math.floor(Math.random() * possible.length));
                }
                return text;
            },
            popupOptions: { width: 1028, height: 529 },
            resource: 'aurelia-openiddict-resources aurelia-openiddict-server'
        }
    }
};
