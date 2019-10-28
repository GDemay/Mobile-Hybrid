import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {NavController} from '@ionic/angular';
import {async} from '@angular/core/testing';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private natCtrl: NavController, public afAuth: AngularFireAuth) {
        afAuth.auth.onAuthStateChanged((user) => {
            if (user) {
                this.natCtrl.navigateRoot(['/home']);

            } else {
              this.natCtrl.navigateRoot(['']);
            }
        });
    }

    async login(email: string, password: string) {
      this.afAuth.auth.signInWithEmailAndPassword(email, password).then((success) => {
        console.log(success);
      }).catch((error) => {
        console.log(error);
      });
    }

    async signup(email: string, password: string) {
      await this.afAuth.auth.createUserWithEmailAndPassword(email, password).then((success) => {
        console.log(success);
      }).catch((error) => {
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
