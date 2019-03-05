import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appClickOutside]'
})
export class ClickOutsideDirective {

  constructor(private _elementRef: ElementRef) {
  }

  @Output()
  public appClickOutside = new EventEmitter<MouseEvent>();

  @HostListener('document:click', ['$event', '$event.target'])
  public onClick(event: MouseEvent, targetElement: HTMLElement): void {
    // console.log('targetElement: ', targetElement);
    if (!targetElement) {
      return;
    }

    const clickedInside = this._elementRef.nativeElement.contains(targetElement);
    // console.log('this._elementRef.nativeElement: ', this._elementRef.nativeElement);

    // my addon
    // if (this._elementRef.nativeElement.querySelector('.dropdown-notifications-menu')) {
    //   console.log('TEEESTTTT');
    //   return;
    // }

    if (!clickedInside) {
      this.appClickOutside.emit(event);
    }
  }
}
