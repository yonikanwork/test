import { Component, OnInit, OnDestroy } from '@angular/core';
// import { NgForm } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';


@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoading = false;
  private authStatusSub: Subscription;

  form: FormGroup;
  email = null;
  password = null;

  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      authStatus => {
        this.isLoading = false;
      }
    );

    this.form = new FormGroup({
      emailText: new FormControl(this.email, {
        validators: [Validators.required, Validators.minLength(5)]
      }),
      passwordText: new FormControl(this.password, {
        validators: [Validators.required, Validators.minLength(5)]
      })
    });
  }

  onLogin() {
    if (!this.form.valid) {
      return;
    }
    this.isLoading = true;
    // console.log('this.form: ', this.form.controls.emailText.invalid);
    this.authService.login(this.form.value.emailText, this.form.value.passwordText);
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
