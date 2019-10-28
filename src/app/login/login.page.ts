import { Component, OnInit } from '@angular/core';

import { AuthService } from '../services/auth.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public loginForm: FormGroup;

  constructor(
      public modelController: ModalController,
      public authService: AuthService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    });
  }

  ngOnInit() {
  }

  async login() {
    await this.authService.login(this.loginForm.value.email, this.loginForm.value.password);
  }

}
