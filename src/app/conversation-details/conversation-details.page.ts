import { Component, OnInit } from '@angular/core';
import {Idea, IdeaService} from '../services/idea.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastController} from 'ionic-angular';

@Component({
  selector: 'app-conversation-details',
  templateUrl: './conversation-details.page.html',
  styleUrls: ['./conversation-details.page.scss'],
})
export class ConversationDetailsPage implements OnInit {

  idea: Idea = {
    name: '',
    notes: ''
  };

  constructor(private activatedRoute: ActivatedRoute, private ideaService: IdeaService,
              private toastCtrl: ToastController, private router: Router) { }

  ngOnInit() {
  }

}
