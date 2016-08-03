import 'bootstrap';
import {Aurelia} from 'aurelia-framework';
import {AuthService, AuthenticatedFilterValueConverter} from 'aurelia-authentication';
import authConfig from './authConfig';

export function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging();

  //Uncomment the line below to enable animation.
  aurelia.use.plugin('aurelia-animator-css');

  aurelia.use.plugin('aurelia-api', config => {
      config
          .registerEndpoint('connect', 'http://localhost:54540/connect')
          .registerEndpoint('github', 'https://api.github.com/')
          .registerEndpoint('logout', 'http://localhost:54540/connect', { headers: { 'Content-Type' : 'application/x-www-form-urlencoded' }, mode: 'cors' });

  });
    //
  aurelia.use.plugin('aurelia-authentication', baseConfig => {
      baseConfig.configure(authConfig);
  });

  //Anyone wanting to use HTMLImports to load views, will need to install the following plugin.
  //aurelia.use.plugin('aurelia-html-import-template-loader')

  aurelia.start().then(() => aurelia.setRoot());
}
