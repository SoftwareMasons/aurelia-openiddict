define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        endpoint: 'connect',
        loginUrl: '/token',
        signupUrl: 'users',
        profileUrl: 'me',
        unlinkUrl: 'me/unlink',
        loginOnSignup: false,
        providers: {
            google: {
                url: 'google',
                clientId: '239531536023-ibk10mb9p7ullsw4j55a61og5lvnjrff6.apps.googleusercontent.com'
            },
            facebook: {
                url: 'facebook',
                clientId: '1465278217541708498'
            }
        }
    };
});
