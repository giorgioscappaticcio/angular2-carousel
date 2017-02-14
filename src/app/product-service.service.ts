import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ProductServiceService {


  url = 'http://pawclothingeurope.com/wp-json/posts?type[]=product&filter[posts_per_page]=-1'

  constructor(private http: Http) { 
  	// this.loadProducts();
  }

  loadProducts() {
  	return this.http
  	.get(this.url)
  		.map(res => res.json())
  		.toPromise();
  		
  }

  

  
}
