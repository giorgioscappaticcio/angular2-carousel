import { Directive, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appDraggable]'
})
export class DraggableDirective {

	private last: MouseEvent;

  	private mouseDown : boolean = false;

  	private timer = null;
	private isIntervalSet = false;

	@Output("scrollamount")
	scrollWrapper = new EventEmitter();

	@HostListener('mouseup')
    onMouseup() {
        this.mouseDown = false;
        this.isIntervalSet = false;
    	clearInterval(this.timer);
    	this.timer = null;
    }

    @HostListener('mousemove', ['$event'])
    onMousemove(event: MouseEvent) {
        if(this.mouseDown) {
           	event.preventDefault();
           	// console.log(event.clientX - this.last.clientX)

           	if (this.isIntervalSet) {
		        return;
		    }
		    var scrollDir = event.clientX - this.last.clientX;
		    this.scrollWrapper.emit(scrollDir);

		    this.timer = setInterval(() => {
			   // console.log(event.clientX - this.last.clientX);
			   
			}, 0);
		    this.isIntervalSet = true;
           
           
        }
    }

    @HostListener('mousedown', ['$event'])
    onMousedown(event) {
    	event.preventDefault();
        this.mouseDown = true;
        this.last = event;
    }

  constructor() { }

}
