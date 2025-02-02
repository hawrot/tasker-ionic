import {Component, OnInit} from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Plugins, Capacitor, AppState, PushNotificationActionPerformed, PushNotificationToken, PushNotification } from '@capacitor/core';

const { PushNotifications, Modals } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if (Capacitor.isPluginAvailable('SplashScreen')) {
        Plugins.SplashScreen.hide();
      }
    });
  }

  ngOnInit() {
    PushNotifications.register();

    PushNotifications.addListener('registration',
        (token: PushNotificationToken) => {
          alert('Push registration success, token: ' + token.value);
          console.log('Push registration success, token: ' + token.value);
        }
    );

    // Some issue with our setup and push will not work
    PushNotifications.addListener('registrationError',
        (error: any) => {
          alert('Error on registration: ' + JSON.stringify(error));
        }
    );

    // Show us the notification payload if the app is open on our device
      PushNotifications.addListener('pushNotificationReceived',
          (notification: PushNotification) => {
              var audio1 = new Audio('assets/audio.mp3');
              console.log('Audio');
              audio1.play();
              // alert('Push received: ' + JSON.stringify(notification));
              console.log('Push received: ', notification);

              let alertRet = Modals.alert({
                  title: notification.title,
                  message: notification.body
              });
          }
      );


    PushNotifications.addListener('pushNotificationActionPerformed',
        (notification: PushNotificationActionPerformed) => {
          alert('Push action performed: ' + JSON.stringify(notification));
          console.log('Push action performed: ' + notification);
        }
    );
  }
}
