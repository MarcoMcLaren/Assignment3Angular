import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component'; // <-- import AddProductComponent
import { LoginComponent } from './login/login.component'; // <-- import LoginComponent
import { ProductListingComponent } from './product-listing/product-listing.component'; // <-- import ProductListingComponent
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'add-product', component: AddProductComponent, canActivate: [AuthGuard] },
  { path: 'product-listing', component: ProductListingComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
