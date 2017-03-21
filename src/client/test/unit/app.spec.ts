import {App} from '../../src/app';
import {FetchConfig} from 'aurelia-authentication';
import {Router, RouteConfig} from 'aurelia-router';
import {AppRouterConfig} from '../../src/services/app.router.config';
import {Container} from 'aurelia-dependency-injection';
import {BrowserHistory} from 'aurelia-history-browser';
import {History} from 'aurelia-history';
import 'fetch';

class RouterStub  {
  routes;

  configure(handler) {
    handler(this);
  }

  map(routes) {
    this.routes = routes;
  }
}

describe('the App module', () => {
  let sut: App;
  const container = new Container();
  const history: History = container.get(BrowserHistory);
  const mockedRouter = <any>(new RouterStub());
  const fetchConfig = container.get(FetchConfig);
  const appRouterConfig = new AppRouterConfig(mockedRouter);
  let routes: RouteConfig[];

  appRouterConfig.configure();

  beforeEach(() => {
    sut = new App(mockedRouter, fetchConfig, appRouterConfig);
  });

  it('contains a router property', () => {
    expect(sut.router).toBeDefined();
  });

  //it('configures the router title', () => {
  //  expect(sut.router.title).toEqual('Aurelia');
  //});

  it('should have a welcome route', () => {
    expect(sut.router.routes).toContain({ route: ['', 'welcome'], moduleId: './routes/welcome', nav: true, title: 'Welcome' });
  });

  it('should have a users route', () => {
    expect(sut.router.routes).toContain({ route: 'users', name: 'users', moduleId: './routes/users', nav: true, title: 'Github Users', auth: true });
  });

  it('should have a child router route', () => {
    expect(sut.router.routes).toContain({ route: 'child-router', moduleId: './routes/child-router', nav: true, title: 'Child Router' });
  });
});
