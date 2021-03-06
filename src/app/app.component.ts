import { Component } from '@angular/core';

import {AlertController, Platform} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {OneSignal} from '@ionic-native/onesignal/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  navigate: any;
  constructor(
      private platform: Platform,
      private splashScreen: SplashScreen,
      private statusBar: StatusBar,
      private oneSignal: OneSignal,
      private alertCtrl: AlertController
  ) {
    this.sideMenu();
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
        if (this.platform.is('cordova')) {
            this.setupPush();
        }
    });
  }

  sideMenu() {
    this.navigate =
        [
          {
            title: 'Home',
            url: '/home',
            icon: 'home'
          },
          {
              title: 'About the project',
              url: '/about',
              icon: 'md-contacts'
          },
            {
                title: 'Logout',
                url: '/logout',
                icon: 'ios-close-circle'
            },
        ];
  }

    setupPush() {
        // I recommend to put these into your environment.ts

        this.oneSignal.startInit('be80bc4a-d0d8-4944-a798-a0ace7272c0b', '962491784043');

        this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.None);

        // Notifcation was received in general
        this.oneSignal.handleNotificationReceived().subscribe(data => {
            let msg = data.payload.body;
            let title = data.payload.title;
            let additionalData = data.payload.additionalData;
            this.showAlert(title, msg, additionalData.task);
        });

        // Notification was really clicked/opened
        this.oneSignal.handleNotificationOpened().subscribe(data => {
            // Just a note that the data is a different place here!
            let additionalData = data.notification.payload.additionalData;

            this.showAlert('Notification opened', 'You already read this before', additionalData.task);
        });

        this.oneSignal.endInit();
    }

    async showAlert(title, msg, task) {
        // @ts-ignore
        const alert = await this.alertCtrl.create({
            header: title,
            subHeader: msg,
            buttons: [
                {
                    text: `Action: ${task}`,
                    handler: () => {
                        // E.g: Navigate to a specific screen
                    }
                }
            ]
        });
        await alert.present();
    }
}
