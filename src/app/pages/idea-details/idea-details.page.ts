import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {IdeaService, Idea} from 'src/app/services/idea.service';
import {Platform, ToastController} from '@ionic/angular';
import {AuthService} from '../../services/auth.service';
import {SpeechRecognition} from '@ionic-native/speech-recognition/ngx';


@Component({
    selector: 'app-idea-details',
    templateUrl: './idea-details.page.html',
    styleUrls: ['./idea-details.page.scss'],
})
export class IdeaDetailsPage implements OnInit {

    matches: string[];
    isRecording: boolean;
    const;
    options: any;

    idea: Idea = {
        name: '',
        notes: '',
        speech: '',
        date: new Date()
    };


    constructor(private plt: Platform, private speechRecognition: SpeechRecognition, private changeDetector: ChangeDetectorRef,
                private activatedRoute: ActivatedRoute, private ideaService: IdeaService,
                private toastCtrl: ToastController, private router: Router,
                public authService: AuthService) {

    }

    ngOnInit() {
        this.options = {
            language: 'fr-FR'
        };
    }


    isIos() {
        return this.plt.is('ios');
    }

    ionViewWillEnter() {
        const id = this.activatedRoute.snapshot.paramMap.get('id');
        if (id) {
            this.ideaService.getIdea(id).subscribe(idea => {
                this.idea = idea;
            });
        }
    }

    async addIdea() {
        this.ideaService.addIdea(this.idea).then(() => {
            this.router.navigateByUrl('/home');
            this.showToast('Meeting added', "success");
        }, err => {
            this.showToast('There was a problem adding your meeting :(', 'danger');
            console.log(err);
        });
    }

    async deleteIdea() {
        this.ideaService.deleteIdea(this.idea.id).then(() => {
            this.router.navigateByUrl('/home');
            this.showToast('Meeting deleted', 'danger');
        }, err => {
            this.showToast('There was a problem deleting your meeting :(', 'danger');
            console.log(err);
        });
    }

    updateIdea() {
        this.ideaService.updateIdea(this.idea).then(() => {
            this.showToast('Meeting updated', 'success');
        }, err => {
            this.showToast('There was a problem updating your meeting :(', 'danger');
            console.log(err);
        });
    }

    showToast(msg, color) {
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

    getPermissions() {
        this.speechRecognition.hasPermission()
            .then((hasPermission: boolean) => {
                if (!hasPermission) {
                    this.speechRecognition.requestPermission();
                }
            });
    }

    async startListening() {
        this.getPermissions();
        this.speechRecognition.startListening().subscribe(matches => {
            this.matches = matches;
            this.changeDetector.detectChanges();
            this.idea.speech = this.matches[0];
        }, err => {
            this.authService.presentAlert(err, 'You can\'t record because you are probably on a PC.' +
                ' Only available on smartphone devices');
            console.log('PC recording error');
        });
        this.isRecording = true;
        this.idea.speech = this.matches[0];
    }


    async stopListening() {
        this.speechRecognition.stopListening().then(() => {
            this.isRecording = false;
            this.idea.speech = this.matches[0];
        }, err => {
            this.authService.presentAlert(err, 'You can\'t stop the record because you are probably on a PC. ' +
                'Only available on smartphone devices. You can import audio file if you want in the Home page from any devices');
            console.log('PC recording error');
        });
        this.idea.speech = this.matches[0];
    }
}
