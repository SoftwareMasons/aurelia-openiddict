import 'bootstrap';
import {inject} from 'aurelia-dependency-injection';
import {Router, RouterConfiguration} from 'aurelia-router';
import {AppRouterConfig} from './services/app.router.config';
import {FetchConfig} from 'aurelia-authentication';

@inject(Router, FetchConfig, AppRouterConfig)
export class App {
    router: Router;
    appRouterConfig: AppRouterConfig;
    fetchConfig: FetchConfig;

    constructor(router: Router, fetchConfig: FetchConfig, appRouterConfig: AppRouterConfig) {
        this.router = router;
        this.fetchConfig = fetchConfig;
        this.appRouterConfig = appRouterConfig;
    }

    activate() {
        this.appRouterConfig.configure();
        this.fetchConfig.configure();
    }
}
