import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  public registerForm: FormGroup;

  constructor(public authService: AuthService) {
    this.registerForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
      fullname: new FormControl(),
    });
  }

  ngOnInit() {
  }

  async register() {
    await this.authService.signup(this.registerForm.value["email"], this.registerForm.value["password"]).then((value) => {

    }, err => {
      this.authService.presentAlert(err, 'signup connexion error');
      console.log('Signup connexion error');
    });
  }

}

