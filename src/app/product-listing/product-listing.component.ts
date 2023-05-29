import { Component } from '@angular/core';
import { ProductService } from '../service/product.service';
import { Product } from '../Models/product';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.css']
})
export class ProductListingComponent {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  currentPageProducts: Product[] = [];
  filterText: string = '';
  sortColumn: string = '';
  sortDirection: string = 'asc';
  itemsPerPage: number = 5;
  currentPage: number = 1;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe((products: Product[]) => {
      this.products = products;
      this.filteredProducts = products;
      this.paginateProducts();
    });
  }

  applyFilter() {
    if (this.filterText.trim() === '') {
      this.filteredProducts = this.products;
    } else {
      const filterTextLower = this.filterText.toLowerCase().trim();
      this.filteredProducts = this.products.filter(product => {
        return (
          product.name.toLowerCase().includes(filterTextLower) ||
        (product.price !== null && product.price.toString().includes(filterTextLower)) ||
        product.brandName.toLowerCase().includes(filterTextLower) ||
        product.productTypeName.toLowerCase().includes(filterTextLower) ||
        product.description.toLowerCase().includes(filterTextLower)
        );
      });
    }
    this.paginateProducts();
  }

  sort(column: string) {
    if (column === this.sortColumn) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.filteredProducts.sort((a, b) => {
      const valueA = this.getColumnValue(a, this.sortColumn);
      const valueB = this.getColumnValue(b, this.sortColumn);
      return this.compareValues(valueA, valueB, this.sortDirection);
    });
    this.paginateProducts();
  }

  getColumnValue(product: Product, column: string) {
    switch (column) {
      case 'name':
        return product.name.toLowerCase();
      case 'price':
        return product.price;
      case 'brand':
        return product.brandName.toLowerCase();
      case 'productType':
        return product.productTypeName.toLowerCase();
      case 'description':
        return product.description.toLowerCase();
      default:
        return '';
    }
  }

  compareValues(valueA: any, valueB: any, direction: string) {
    if (valueA < valueB) {
      return direction === 'asc' ? -1 : 1;
    } else if (valueA > valueB) {
      return direction === 'asc' ? 1 : -1;
    } else {
      return 0;
    }
  }

  paginateProducts() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.currentPageProducts = this.filteredProducts.slice(startIndex, startIndex + this.itemsPerPage);
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.paginateProducts();
  }

  setItemsPerPage() {
    this.itemsPerPage = Number(this.itemsPerPage);
    this.currentPage = 1;
    this.paginateProducts();
  }

  getPages(): number[] {
    const totalPages = Math.ceil(this.filteredProducts.length / this.itemsPerPage);
    return Array(totalPages).fill(0).map((_, index) => index + 1);
  }

  getLastPage(): number {
    return Math.ceil(this.filteredProducts.length / this.itemsPerPage);
  }
}
