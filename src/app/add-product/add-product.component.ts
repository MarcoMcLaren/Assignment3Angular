import { Component } from '@angular/core';
import { Product } from '../Models/product';
import { ProductService } from '../service/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  product: Product = {
    name: '',
    price: null,
    description: '',
    brandId: null,
    brandName: '',
    productTypeId: null,
    productTypeName: '',

  };
  
 

  // Dummy data
  brands = [
    { id: 1, name: 'Addidas' },
    { id: 2, name: 'Nike' },
    { id: 3, name: 'Under Armour' }
  ];

  productTypes = [
    { id: 1, name: 'Footwear' },
    { id: 2, name: 'Shirt' },
    { id: 3, name: 'Pants' }
  ];

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit() {
    this.productService.postProduct(this.product).subscribe(
      data => {
        console.log('Product added successfully.');
        this.product = {
          name: '',
          price: null,
          description: '',
          brandId: null,
          brandName: '', // Add this line
          productTypeId: null,
          productTypeName: '' // Add this line
        }; // Reset the form
      },
    );
  }
}
