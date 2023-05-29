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
    { id: 1, name: 'Brand 1' },
    { id: 2, name: 'Brand 2' },
    { id: 3, name: 'Brand 3' }
  ];

  productTypes = [
    { id: 1, name: 'Type 1' },
    { id: 2, name: 'Type 2' },
    { id: 3, name: 'Type 3' }
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
