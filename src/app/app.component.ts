import { Component, OnInit } from '@angular/core';

import { ProductServiceService } from './product-service.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app works!';

  products = [];

  constructor (private productsService: ProductServiceService) {
  	
  }

  ngOnInit(): void {
    
  }

  loadProducts() {
  	this.productsService.loadProducts()
      .then(products => this.products = products);
  }
}

