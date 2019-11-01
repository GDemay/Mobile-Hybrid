import {Component, OnInit} from '@angular/core';
import {ToastController} from 'ionic-angular';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

import {Observable, Subject} from 'rxjs';

import {FormControl, FormGroup} from '@angular/forms';
import {Idea, IdeaService} from '../services/idea.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  private ideas: Observable<Idea[]>;


  // @ts-ignore
  constructor(public authService: AuthService, private toastCtrl: ToastController, private route: Router, private ideaService: IdeaService)



  ngOnInit(): void {
    this.ideas = this.ideaService.getIdeas();
  }

}
