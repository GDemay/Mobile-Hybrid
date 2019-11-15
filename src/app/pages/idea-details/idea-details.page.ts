import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {IdeaService, Idea} from 'src/app/services/idea.service';
import {NavController, Platform, ToastController} from '@ionic/angular';
import {AuthService} from '../../services/auth.service';
import {SpeechRecognition} from '@ionic-native/speech-recognition/ngx';


@Component({
    selector: 'app-idea-details',
    templateUrl: './idea-details.page.html',
    styleUrls: ['./idea-details.page.scss'],
})
export class IdeaDetailsPage implements OnInit {

    matches: string[];
    value_to_delete: number;
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
                public authService: AuthService, private natCtrl: NavController) {

    }

    ngOnInit() {
        this.value_to_delete = 0;
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

    addIdea() {
        this.ideaService.addIdea(this.idea).then(() => {
            this.router.navigateByUrl('/home');
            this.showToast('Meeting added', "success");
        }, err => {
            this.showToast('There was a problem adding your meeting :(', 'danger');
            console.log(err);
        });
    }

    deleteIdea() {
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

    startListening() {
        this.getPermissions();
        this.speechRecognition.startListening().subscribe(matches => {
            this.matches = matches;
            this.setIdeaSpeech(this.matches[0]);
            this.showToast(this.getIdeaSpeech(), "danger"); // getIdeaSpeech()
            this.changeDetector.detectChanges();
        }, err => {
            this.showToast(err, "danger");
        });
        this.isRecording = true;
    }


    stopListening() {
        console.log("Only for IOS devices");
        this.speechRecognition.stopListening().then(() => {
            this.isRecording = false;

        }, err => {
            this.authService.presentAlert(err, 'You can\'t stop the record because you are probably on a PC. ' +
                'Only available on smartphone devices. You can import audio file if you want in the Home page from any devices - stop');
            console.log('PC recording error stop ');
        });
        this.isRecording = true;

    }

    getIdeaSpeech() {
        return this.idea.speech;
    }

    setIdeaSpeech(speech_to_set: string) {
        if (speech_to_set == '') {
            speech_to_set = "no values detected";
        }
        this.idea.speech = speech_to_set;
        this.idea = Object.assign({}, this.idea);
        console.log('Value for this idea', this.idea);
    }
}

// this.idea = Object.assign(this.idea, this.dea);
