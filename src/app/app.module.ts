import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';

import { AngularFireAuthModule } from '@angular/fire/auth';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';

import { environment } from '../environments/environment';

import {AngularFireDatabaseModule} from '@angular/fire/database';
import {OneSignal} from '@ionic-native/onesignal/ngx';


// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot({ mode: 'ios' }),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    // AngularFireDatabaseModule,
    AngularFireAuthModule,
     AngularFirestoreModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
      SpeechRecognition,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    OneSignal,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
