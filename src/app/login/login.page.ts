import { Component, OnInit } from '@angular/core';

import { AuthService } from '../services/auth.service';
import { FormGroup, FormControl } from '@angular/forms';
import {LoadingController, ModalController, ToastController} from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public loginForm: FormGroup;

  constructor(
      public modelController: ModalController,
      public authService: AuthService,
      private toastCtrl: ToastController
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    });
  }

  ngOnInit() {
  }



  async login() {
    await this.authService.login(this.loginForm.value.email, this.loginForm.value.password).
    then(() => {
      console.log('Success login');
    }, err => {
      this.authService.presentAlert(err, 'Login connexion error');
      console.log('Login error');

    });
  }


  showToast(msg) {
    this.toastCtrl.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present());
  }


}
