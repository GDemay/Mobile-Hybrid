import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {LoadingController} from '@ionic/angular';
import {Router} from '@angular/router';


@Component({
    selector: 'app-logout',
    templateUrl: './logout.page.html',
    styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

    constructor(public authService: AuthService, public loadingController: LoadingController, private router: Router) {
    }

    ngOnInit() {
        this.logout();
    }

    async presentLoading() {
        const loading = await this.loadingController.create({
            message: 'Disconnecting',
            duration: 1500
        });
        await loading.present();
        const {role, data} = await loading.onDidDismiss();
        console.log('Loading dismissed!');
    }


    async logout() {
        await this.presentLoading();
        await this.authService.logout().then((value) => {
            console.log('SUCCESS!');
            this.router.navigate(['/login']);
        });

    }
}
