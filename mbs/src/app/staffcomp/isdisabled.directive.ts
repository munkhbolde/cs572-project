import { Directive, Input, ElementRef } from '@angular/core';

@Directive({
  selector: '[appIsdisabled]'
})
export class IsdisabledDirective {

  @Input() result;
  constructor(private element: ElementRef) {
  }
  ngOnInit() {
    if ((this.result === "pass" || this.result === "fail")) {
      console.log(this.result + "inside")


    }
    else {
      this.element.nativeElement.style.disabled = "true";
    }

  }
}
