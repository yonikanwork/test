import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ThemePickerService } from './theme-picker.service';

@Component({
  selector: 'app-theme-picker',
  templateUrl: './theme-picker.component.html',
  styleUrls: ['./theme-picker.component.scss']
})
export class ThemePickerComponent  implements OnInit, OnChanges {
  @Input() themeData: any;
  private themeWrapper = document.querySelector('body');
  form: FormGroup;

  navColor = null;
  navBackground = null;
  cardColor = null;
  cardBackground = null;
  buttonColor = null;
  buttonBackground = null;
  footerColor = null;
  footerBackground = null;

  constructor(private themePickerService: ThemePickerService) { }

  ngOnChanges(changes: SimpleChanges) {
    // console.log('this.themeData: ', this.themeData);
    // console.log('changes: ', changes.themeData);
    if (!changes.themeData.currentValue) {
      this.themeData = {
        navColor: null,
        navBackground: null,
        cardColor: null,
        cardBackground: null,
        buttonColor: null,
        buttonBackground: null,
        footerColor: null,
        footerBackground: null
      };
    }
    this.globalOverride(this.themeData);
  }

  ngOnInit() {
    this.form = new FormGroup({
      navColor: new FormControl(this.navColor, {
      }),
      navBackground: new FormControl(this.navBackground, {
      }),
      cardColor: new FormControl(this.cardColor, {
      }),
      cardBackground: new FormControl(this.cardBackground, {
      }),
      buttonColor: new FormControl(this.buttonColor, {
      }),
      buttonBackground: new FormControl(this.buttonBackground, {
      }),
      footerColor: new FormControl(this.footerColor, {
      }),
      footerBackground: new FormControl(this.footerBackground, {
      })
    });
  }

  onSubmitTheme() {

     // searching the entire page for css variables
    if (!this.form.valid) {
      return;
    }
    // this.globalOverride(this.form.value);
    this.themePickerService.globalOverride(this.form.value);
  }

  globalOverride(stylesheet) {
    // console.log('stylesheet: ', stylesheet);

    this.themePickerService.globalOverride(stylesheet);

    // // Navigation Styles
    // if (stylesheet.navColor) {
    //   this.themeWrapper.style.setProperty('--navColor', stylesheet.navColor);
    // }
    // if (stylesheet.navBackground) {
    //   this.themeWrapper.style.setProperty('--navBackground', stylesheet.navBackground);
    // }

    // // Card Styles
    // if (stylesheet.cardColor) {
    //   this.themeWrapper.style.setProperty('--cardColor', stylesheet.cardColor);
    // }
    // if (stylesheet.navBackground) {
    //   this.themeWrapper.style.setProperty('--cardBackground', stylesheet.cardBackground);
    // }

    // // Footer Styles
    // if (stylesheet.footerColor) {
    //   this.themeWrapper.style.setProperty('--footerColor', stylesheet.footerColor);
    // }
    // if (stylesheet.footerBackground) {
    //   this.themeWrapper.style.setProperty('--footerBackground', stylesheet.footerBackground);
    // }
    // if (stylesheet.footerAlignment) {
    //   this.themeWrapper.style.setProperty('--footerAlignment', stylesheet.footerAlignment);
    // }

    // // Button Styles
    // if (stylesheet.buttonColor) {
    //   this.themeWrapper.style.setProperty('--buttonColor', stylesheet.buttonColor);
    // }
    // if (stylesheet.buttonBackground) {
    //   this.themeWrapper.style.setProperty('--buttonBackground', stylesheet.buttonBackground);
    // }
  }
}
