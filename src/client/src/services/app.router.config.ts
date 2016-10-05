import {AuthenticateStep} from 'aurelia-authentication';
import {inject} from 'aurelia-dependency-injection';
import {Router, RouterConfiguration, RouteConfig} from 'aurelia-router';

@inject(Router)
export class AppRouterConfig {
  router: Router;

  constructor(router: Router) {
    this.router = router;
  }

  configure() {
    this.router.configure((config: RouterConfiguration) => {
      config.title = 'Aurelia';
      //config.addPipelineStep('authorize', AuthenticateStep);

      config.map([
        { route: ['', 'welcome'], moduleId: './routes/welcome', nav: true, title: 'Welcome' },
        { route: 'users', name: 'users', moduleId: './routes/users', nav: true, title: 'Github Users', auth: true },
        { route: 'todo', name: 'todo', moduleId: './routes/todo', nav: true, title: 'ToDo Items', auth: true },
        { route: 'child-router', moduleId: './routes/child-router', nav: true, title: 'Child Router' }
      ]);
      return config;
    });
  }
}