import { Component, OnInit } from '@angular/core';
import { IdeaService, Idea } from 'src/app/services/idea.service';
import { Observable } from 'rxjs';
import {AuthService} from '../../services/auth.service';
import {ToastController} from "@ionic/angular";

@Component({
  selector: 'app-idea-list',
  templateUrl: './idea-list.page.html',
  styleUrls: ['./idea-list.page.scss'],
})
export class IdeaListPage implements OnInit {
  private ideas: Observable<Idea[]>;


  constructor(public authService: AuthService, private ideaService: IdeaService, private toastCtrl: ToastController,) {
  }

  ngOnInit() {
    console.log();
    this.ideas = this.ideaService.getIdeas();
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
