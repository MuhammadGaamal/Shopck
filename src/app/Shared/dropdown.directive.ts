import {Directive, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  // css class open that open dropdown menu
@HostBinding('class.open') isOpen = false;
  @HostListener('click') toggleopen() {
  this.isOpen = !this.isOpen;
}
  constructor() { }

}
