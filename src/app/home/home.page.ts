import {Component, OnInit} from '@angular/core';
import {ToastController} from 'ionic-angular';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

import {Subject} from 'rxjs';

import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  // @ts-ignore
  constructor(public authService: AuthService, private toastCtrl: ToastController, private route: Router)



  ngOnInit(): void {

  }

}
