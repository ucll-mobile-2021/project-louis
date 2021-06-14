import { Component } from '@angular/core';

import { Platform, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public isLoggedIn = false;
  public isRegisterOpened = false;
  public username: string;
  public password: string;
  public errorMessage = '';

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private toastController: ToastController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  public register(): void {
    this.errorMessage = '';
    console.log(`${this.username}`);
    if (!!this.username && !!this.password && !localStorage.getItem(this.username)) {
      localStorage.setItem(this.username, this.password);
      this.isRegisterOpened = false;
    } else {
     this.errorMessage = 'Something went wrong';
    }
    this.username = null;
    this.password = null;
  }

  public login(): void {
    this.errorMessage = '';
    if (!!this.username && localStorage.getItem(this.username)) {
      if (this.password === localStorage.getItem(this.username)) {
        this.isLoggedIn = true;
      } else {
        this.errorMessage = 'Wrong password';
      }
    } else {
      this.errorMessage = 'Account not found';
    }
  }

  public logout(): void {
    this.isLoggedIn = false;
  }
}
