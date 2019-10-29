import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
// tslint:disable-next-line:import-spacing
import { AlertController, LoadingController, NavController } from
        '@ionic/angular';
import {async} from '@angular/core/testing';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private natCtrl: NavController, public afAuth: AngularFireAuth, private alertCtrl: AlertController ) {
        afAuth.auth.onAuthStateChanged((user) => {
            if (user) {
                this.natCtrl.navigateRoot(['/home']);

            } else {
              this.natCtrl.navigateRoot(['']);
            }
        });
    }


    // tslint:disable-next-line:variable-name
    async presentAlert(message: string, sub_header: string) {
        const alert = await this.alertCtrl.create({
            message,
            subHeader: sub_header,
            buttons: ['Continue']
        });
        await alert.present();
    }

    async login(email: string, password: string) {
      this.afAuth.auth.signInWithEmailAndPassword(email, password).then((success) => {
        console.log(success);
      }).catch((error) => {
          this.presentAlert(error, 'Login connexion error');
          console.log(error);
      });
    }


    async signup(email: string, password: string) {
      await this.afAuth.auth.createUserWithEmailAndPassword(email, password).then((success) => {
        console.log(success);
      }).catch((error) => {
          this.presentAlert(error, 'Sign up  error');
          console.log(error);
      });
    }

  async logout() {
    await this.afAuth.auth.signOut().then(() => {
      console.log('logged Out');
    }).catch((error) => {
      console.log(error);
    });
  }
}
