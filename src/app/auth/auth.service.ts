import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { AuthData } from './auth-data.model';
import { UIService } from '../shared/ui.service';
import { NotificationsService } from '../notifications/notifications.service';
import { ThemePickerService } from '../settings/theme-picker/theme-picker.service';

import { environment } from '../../environments/environment';
const BACKEND_URL = environment.apiUrl + '/user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private token: string;
  private tokenTimer: any;
  private userId: string;
  private isAuthenticated = false;
  private authStatusListener = new Subject<boolean>();

  private userProfile = {};
  private userProfileUpdated = new Subject<any>();

  constructor(private http: HttpClient,
    private router: Router,
    private uiService: UIService,
    private notificationsService: NotificationsService,
    private themePickerService: ThemePickerService) {}

  getToken() { // for the auth-interceptor
    return this.token;
  }

  getIsAuth() { // for the auth-guard
    return this.isAuthenticated;
  }

  // getUserId() {
  //   return this.userId;
  // }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  createUser(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    const modifiedWithImg = {
      email: email,
      password: password,
      imagePath: 'https://material.angular.io/assets/img/examples/shiba2.jpg'
    };

    this.http.post(BACKEND_URL + '/signup', modifiedWithImg)
      .subscribe(
        (userData) => {
          this.router.navigate(['/home']);
        },
        error => {
          this.authStatusListener.next(false);
        }
      );
  }

  login(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };

    this.http.post<{ token: string; expiresIn: number; userId: string; imagePath: string }>(BACKEND_URL + '/login', authData)
      .subscribe(
        response => { // returns a token, userId, and experesionIn
          const token = response.token;
          this.token = token;
          if (token) {
            const expiresInDuration = response.expiresIn;
            this.setAuthTimer(expiresInDuration);
            this.userId = response.userId;

            this.isAuthenticated = true;
            this.authStatusListener.next(true);

            const now = new Date();
            const expirationDate = new Date(
              now.getTime() + expiresInDuration * 1000
            );
            this.saveAuthData(token, expirationDate, this.userId);

            this.router.navigate(['/home']);
            this.uiService.showSnackbar('user is logged in!', null, 2000);
          }
        },
        error => {
          console.log('error: ', error);
          this.isAuthenticated = false;
          this.authStatusListener.next(false);
        }
      );
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.userId = null;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['auth/login']);
    this.uiService.showSnackbar('You have just logged out!', null, 2000);
  }

  autoAuthUser() {
    this.setDeafaultTheme();

    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }

    this.setUserProfile();

    this.notificationsService.getNotifications(); // added for the notification socket.io

    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) { // maximillians's version
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userId = authInformation.userId;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  setUserProfile() {
    this.http.get<any>(BACKEND_URL + '/user')
        .subscribe((data) => {
            this.userProfile = data;
            console.log('this.userProfile: ', this.userProfile);
            // this.userProfile.userPreferences.theme === 'dark' ? this.setTheme('dark') : this.setDeafaultTheme();
            this.userProfileUpdated.next(data);
          }
        );
  }

  getUserProfile() {
    return this.userProfile;
  }

  getUserProfileListener() {
    return this.userProfileUpdated.asObservable();
  }

  // private setTheme(theme) {
  //   if (theme === 'dark') {
  //     const darkTheme = {
  //       navColor: '#ffffff',
  //       navBackground: '#000000',

  //       cardColor: '#ffffff',
  //       cardBackground: '#000000 !important',

  //       buttonColor: '#4ccead',
  //       buttonBackground: '#9575cd',

  //       footerColor: null,
  //       footerBackground: null
  //    };
  //    this.themePickerService.globalOverride(darkTheme);
  //   } else {
  //     this.setDeafaultTheme();
  //   }
  // }

  private setDeafaultTheme() {
    // change color theme to deafault
    const deafaultTheme = {
      navColor: null,
      navBackground: null,

      cardColor: '#9575cd',
      cardBackground: '#f44336 !important',

      buttonColor: '#4ccead',
      buttonBackground: '#9575cd',

      footerColor: null,
      footerBackground: null
    };
    this.themePickerService.globalOverride(deafaultTheme);
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId);

  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId
    };
  }
}
