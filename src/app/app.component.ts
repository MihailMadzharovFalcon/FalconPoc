import { Component, Inject, forwardRef, InjectionToken } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Platform } from '@ionic/angular';
import { authenticateWithFalcon } from '@falconio/core-auth/dist/core-auth.min.js';
import { HttpClient } from '@angular/common/http';
import { KeycloackService } from './keycloack.service';
import { HTTP } from '@ionic-native/http/ngx';
export const HttpAbstraction = new InjectionToken('Provide');

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Feed',
      url: '/feed',
      icon: 'paper'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private keycloackService: KeycloackService,
    @Inject(forwardRef(() => HttpAbstraction))
    private httpClient: HTTP | HttpClient
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform
      .ready()
      .then(() =>
        authenticateWithFalcon({
          authServerBaseUrl: 'https://accounts-staging.falcon.io',
          clientId: 'engage-mobile',
          loginOptions: {
            scope: 'offline_access'
          }
        })
      )
      .then(res => {
        this.statusBar.styleDefault();
        this.splashScreen.hide();
        this.keycloackService.updateKeycloackAuth(res);
      });
  }

  getMe() {
    if (this.httpClient instanceof HttpClient) {
      this.httpClient
        .get('api/1/user', {
          headers: {
            Authorization: `Bearer ${this.keycloackService.token}`
          }
        })
        .subscribe(res => {
          console.log(res);
        });
    } else {
      this.httpClient
        .get(
          `https://staging.falcon.io/api/1/user`,
          {},
          { Authorization: `Bearer ${this.keycloackService.token}` }
        )
        .then(res => JSON.parse(res.data))
        .then(res => {
          console.log(res);
        });
    }
  }
}
