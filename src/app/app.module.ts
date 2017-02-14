import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ProductServiceService } from './product-service.service';
import { CarouselComponent } from './carousel/carousel.component';
import { DraggableDirective } from './draggable.directive';


@NgModule({
  declarations: [
    AppComponent,
    CarouselComponent,
    DraggableDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    ProductServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
