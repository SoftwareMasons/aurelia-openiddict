import {AuthenticateStep} from 'aurelia-authentication';
import {inject} from 'aurelia-dependency-injection';
import {Router, RouterConfiguration} from 'aurelia-router';

@inject(Router)
export class AppRouterConfig {
    router: Router;

    constructor(router: Router) {
        this.router = router;
    }

    configure() {
        this.router.configure((config: RouterConfiguration) => {
            config.title = "Aurelia";
            config.addPipelineStep('authorize', AuthenticateStep);

            config.map([
                { route: ['', 'welcome'], moduleId: './welcome', nav: true, title: 'Welcome' },
                { route: 'users', name: 'users', moduleId: './users', nav: true, title: 'Github Users', auth: true },
                { route: 'child-router', moduleId: './child-router', nav: true, title: 'Child Router' },
                { route: 'login', moduleId: './login', nav: false, title: 'Login' },
                { route: 'logout', moduleId: './logout', nav: false, title: 'Logout' }
            ]);

            return config;
        });
    }
}