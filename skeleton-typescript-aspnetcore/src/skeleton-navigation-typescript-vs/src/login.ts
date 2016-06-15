import {AuthService} from 'aurelia-authentication';
import {inject} from 'aurelia-framework';

@inject(AuthService)
export class Login {
    private auth: AuthService;
    email: string;
    password: string;
    heading: string = 'Login';

    constructor(auth: AuthService) {
        this.auth = auth;
    };

    login() {
        let loginOptions = {
            username: this.email,
            password: this.password,
            grant_type: 'password',
            scope: 'openid profile email'
        };
        return this.auth.login(loginOptions)
            .then(response => {
                console.log("success logged " + response);
            })
            .catch(err => {
                err.json().then(function (e) {
                    console.log("login failure : " + e.message);
                });

            });
    };

    authenticate(name) {
        return this.auth.authenticate(name, false, null)
            .then((response) => {
            });

    }
}
