import { Component, OnInit } from '@angular/core';
import { IdeaService, Idea } from 'src/app/services/idea.service';
import { Observable } from 'rxjs';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-idea-list',
  templateUrl: './idea-list.page.html',
  styleUrls: ['./idea-list.page.scss'],
})
export class IdeaListPage implements OnInit {
  private ideas: Observable<Idea[]>;

  constructor(public authService: AuthService, private ideaService: IdeaService) { }

  ngOnInit() {
    console.log();
    this.ideas = this.ideaService.getIdeas();
  }
}
