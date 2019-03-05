import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { ThemePickerService } from './theme-picker/theme-picker.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
const BACKEND_URL = environment.apiUrl + '/user';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {
  isProfilePanel = true;
  isNotificationsPanel = false;
  isApplicationPanel = false;

  selected = 'english';
  languages: any[] = [
    {value: 'english', viewValue: 'English'},
    {value: 'spanish', viewValue: 'Spanish'},
    {value: 'french', viewValue: 'French'}
  ];
  userProfile;
  private userProfileSub: Subscription;

  themeData;
  isDarkMode = false;
  private isDarkModeSub: Subscription;


  imagePreview;
  form: FormGroup;
  email = null;

  constructor(public authService: AuthService, private themePickerService: ThemePickerService, private http: HttpClient) { }

  ngOnInit() {
    this.isDarkMode = this.themePickerService.getIsDarkMode();
    this.isDarkModeSub = this.themePickerService.getIsDarkModeUpdateListener()
      .subscribe((result) => {
        this.isDarkMode = result;
      });

    this.userProfile = this.authService.getUserProfile();
    this.userProfileSub = this.authService.getUserProfileListener()
      .subscribe((userProfile) => {
        this.userProfile = userProfile;
      });


    this.form = new FormGroup({
      emailText: new FormControl(this.email, {
        validators: [Validators.required, Validators.minLength(5)]
      }),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: []
      })
    });
  }

  darkModeToggle(eventBoolean) {
    // console.log('eventBoolean: ', eventBoolean);
    // console.log('eventBoolean: ', eventBoolean);
    // this.themeData = eventBoolean;
    if (eventBoolean) {
      this.isDarkMode = true;
      this.themePickerService.setIsDarkMode(this.isDarkMode);
      this.themeData = {
        navColor: null,
        navBackground: null,

        cardColor: '#4ccead',
        cardBackground: '#353435 !important',

        buttonColor: '#9575cd',
        buttonBackground: '#4ccead',

        footerColor: null,
        footerBackground: null
      };
    } else {
      this.isDarkMode = false;
      this.themePickerService.setIsDarkMode(this.isDarkMode);
      this.themeData = {
        navColor: null,
        navBackground: null,

        cardColor: '#9575cd',
        cardBackground: '#f44336 !important',

        buttonColor: '#4ccead',
        buttonBackground: '#9575cd',

        footerColor: null,
        footerBackground: null
      };
    }
  }

  ngOnDestroy() {
    this.isDarkModeSub.unsubscribe();
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    // this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    console.log('reader: ', reader);
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }

  onChangeProfileDetails() {
    if (!this.form.valid) {
      return;
    }

    const formData: any = {
      email: this.form.value.emailText,
      file: this.form.value.image,
    };
    // console.log('formData: ', formData);

    this.http.post<any>(BACKEND_URL + '/test', formData)
      .subscribe(
        response => {

        },
        error => {
          console.log('error: ', error);
        }
      );


    console.log('this.form: ', this.form.value);
  }
}
