export default {
    endpoint: 'connect',
    configureEndpoints: ['connect'],
    loginUrl: '/token',  
    signupUrl: 'users',
    profileUrl: '/userinfo',
    unlinkUrl: 'me/unlink',
    loginOnSignup: false,
    providers: {
        google: {
          url: 'google',
          clientId: '239531536023-ibk10mb9p7ullsw4j55a61og5lvnjrff6.apps.googleusercontent.com'
        },
        facebook:{
          url: 'facebook',
          clientId: '1465278217541708498'
        }
    }
};
