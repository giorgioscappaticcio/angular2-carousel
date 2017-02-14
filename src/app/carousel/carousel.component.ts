import { Component, OnInit, Input, HostListener } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
	@Input() tiles;

  zoomLevel: number = 0;

  slideLevel: number = 0;

  step = undefined;

  translateX = undefined;

  wrapperLength = undefined;
  wrapperWidth = undefined;

  private last: MouseEvent;

  private mouseDown : boolean = false;

  	private timer = null;
	private isIntervalSet = false;



  @HostListener('window:load', ['$event'])
	onLoad(event) {
	  this.wrapperWidth = event.currentTarget.innerWidth;
	}

	@HostListener('window:resize', ['$event'])
	onResize(event) {
	  this.wrapperWidth = event.currentTarget.innerWidth;
	}

  
  constructor(private  sanitizer: DomSanitizer) { 
  	
  	
  }

  ngOnInit() {
  	
  	// this.productsService.loadProducts()
   //    .then(products => this.products = products);


  }

  

  over(event){
  	event.preventDefault();
  	if (this.last) {
  		var amount =  event.clientX - this.last.clientX; 
	  	
	  	if (this.mouseDown) {
	  		if (this.isIntervalSet) {
		        return;
		    }

		    this.timer = setInterval(() => {
			   
		  		if (amount > 0) {
			   		this.slidePrev(210);

			    } else {
			    	this.slideNext(210);
			    } 
			   
			}, 200);
		    this.isIntervalSet = true;
	  			
	  	}
  	}
  	
  }

  down(event){
  	event.preventDefault();
  	this.mouseDown = true;
    this.last = event;
  }

  up(){
  	this.mouseDown = false;
  	this.isIntervalSet = false;
    clearInterval(this.timer);
    this.timer = null;
  }


  calcWrap() {
  	this.wrapperLength = ( this.tiles.length  * 210 ) - this.wrapperWidth  ;
  	return {
  		'width': this.tiles.length * 210 + 'px' 
  	}
  }

  changeZoom(value: number) { 
  	this.slideLevel = - value;
  	this.translateTo()
  	
  }
  
  slideNext(amount){
  	if (amount=='window') {
  		amount = Math.floor(this.wrapperWidth / 210) * 210
  	}
  	
  	this.zoomLevel += amount
  	this.slideLevel -= amount

  	if (this.zoomLevel > this.wrapperLength) {
  		this.zoomLevel = this.wrapperLength
  		this.slideLevel = -this.wrapperLength
  	}

  	this.translateTo();
  }

  slidePrev(amount){
  	if (amount=='window') {
  		amount = Math.floor(this.wrapperWidth / 210) * 210
  	}
  	this.zoomLevel -= amount 
  	this.slideLevel += amount 

  	if (this.zoomLevel < (this.wrapperWidth / Math.floor(this.wrapperWidth / 210))) {
  		this.slideLevel = 0
  		this.zoomLevel = 0
  	}

  	this.translateTo()
  }
  
  translateTo() {
  		this.translateX = this.sanitizer.bypassSecurityTrustStyle("translate3d( " + this.slideLevel + "px , 0, 0 )");
	}
}