import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {map, take} from 'rxjs/operators';
import DocumentReference = firebase.firestore.DocumentReference;
import * as firebase from 'firebase';

export interface Idea {
  id?: string;
  name: string;
  notes: string;
}

@Injectable({
  providedIn: 'root'
})
export class IdeaService {

  private readonly ideas: Observable<Idea[]>;
  private ideaCollection: AngularFirestoreCollection<Idea>;



  constructor(private afs: AngularFirestore) {
    this.ideaCollection = this.afs.collection<Idea>('ideas');
    this.ideas = this.ideaCollection.snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
    );
  }

  getIdeas(): Observable<Idea[]> {
    return this.ideas;
  }

  getIdea(id: string): Observable<Idea> {
    return this.ideaCollection.doc<Idea>(id).valueChanges().pipe(
        take(1),
        map(idea => {
          idea.id = id;
          return idea;
        })
    );
  }

  addIdea(idea: Idea): Promise<DocumentReference> {
    return this.ideaCollection.add(idea);
  }

  updateIdea(idea: Idea): Promise<void> {
    return this.ideaCollection.doc(idea.id).update({ name: idea.name, notes: idea.notes });
  }

  deleteIdea(id: string): Promise<void> {
    return this.ideaCollection.doc(id).delete();
  }
}

