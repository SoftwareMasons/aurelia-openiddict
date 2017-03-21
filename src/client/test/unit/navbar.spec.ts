import {NavBar} from '../../src/customElements/nav-bar';
import {Container} from 'aurelia-dependency-injection';
import {AuthService, Popup} from 'aurelia-authentication';
import {BindingEngine} from 'aurelia-framework';
import {Config} from 'aurelia-api';

describe('Navbar', () => {
  const container = new Container();
  let authService = container.get(AuthService);
  let bindingEngine = container.get(BindingEngine);
  let popup = container.get(Popup);
  let config = container.get(Config);

  let sut = new NavBar(authService, bindingEngine, config, popup);

  describe('authenticate()', () => {
    it('should set displayName to preferred_username', done => {
      let isAuthenticated: boolean = false;
      spyOn(authService, 'authenticate').and.callFake((name, redirectUri) => {
        isAuthenticated = true;
        return Promise.resolve();
      });
      spyOn(authService, 'authenticated').and.callFake(() => {
        return isAuthenticated;
      });
      spyOn(authService, 'getMe').and.callFake(() => {
        return Promise.resolve({ preferred_username: 'Joe@example.com' });
      });
      sut.authenticate()
        .then(response => {
          expect(sut.displayName).toBe('Joe@example.com');
          done();
        });
    });
  });

  describe('logout()', () => {
    it('should set displayName to blank when successful', done => {
      spyOn(authService, 'logout').and.callFake((redirectUri, query, name) => {
        return Promise.resolve();
      });
      sut.displayName = 'Joe@example.com';
      sut.logout()
        .then(() => {
          expect(sut.displayName).toBe('');
          done();
        });
    });
  });
});
