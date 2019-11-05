import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { AngularFireAuth } from '@angular/fire/auth';
import { NavController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(public navCtrl: NavController, public afAuth: AngularFireAuth) { }

    // tslint:disable-next-line:max-line-length
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return new Promise((resolve, reject) => {
            this.afAuth.user.subscribe((user) => {
                if (user) {
                    resolve(true);
                } else {
                    this.navCtrl.navigateRoot(['']);
                    resolve(false);
                }
            });
        });
    }

}
