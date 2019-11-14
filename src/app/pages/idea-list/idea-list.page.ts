import { Component, OnInit } from '@angular/core';
import { IdeaService, Idea } from 'src/app/services/idea.service';
import { Observable } from 'rxjs';
import {AuthService} from '../../services/auth.service';
import {ToastController} from "@ionic/angular";
import {OneSignal} from '@ionic-native/onesignal/ngx';


@Component({
  selector: 'app-idea-list',
  templateUrl: './idea-list.page.html',
  styleUrls: ['./idea-list.page.scss'],
})
export class IdeaListPage implements OnInit {
  private ideas: Observable<Idea[]>;


  constructor(public authService: AuthService, private ideaService: IdeaService, private toastCtrl: ToastController, private oneSignal: OneSignal) {
  }





  ngOnInit() {
    console.log();
    this.ideas = this.ideaService.getIdeas();
    this.oneSignal.startInit('be80bc4a-d0d8-4944-a798-a0ace7272c0b', '703322744261');

    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

    this.oneSignal.handleNotificationReceived().subscribe(() => {
      // do something when notification is received
    });

    this.oneSignal.handleNotificationOpened().subscribe(() => {
      // do something when a notification is opened
    });

    this.oneSignal.endInit();
  }

  async showToast(msg, color) {
    if (color == null) {
      color = 'primary';
    }
    this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'top',
      color: color
    }).then(toast => toast.present());
  }

  delete_idea(idea: Idea) {
    console.log('Delete ', idea.id, 'from idea-list.page.ts');
    this.showToast('Meeting deleted', 'danger');
    this.ideaService.deleteIdea(idea.id);
  }


}
