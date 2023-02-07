import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminMenuComponent } from './components/admin-menu/admin-menu.component';
import { AdminProductsDetailImgComponent } from './components/admin-products-detail-img/admin-products-detail-img.component';
import { AdminProductsDetailComponent } from './components/admin-products-detail/admin-products-detail.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { AdminUsersComponent } from './components/admin-users/admin-users.component';
import { CartComponent } from './components/cart/cart.component';
import { IndexComponent } from './components/index/index.component';
import { LoginComponent } from './components/login/login.component';
import { ProductsDetailsComponent } from './components/products-details/products-details.component';
import { ProductsEditComponent } from './components/products-edit/products-edit.component';
import { ProductsFormComponent } from './components/products-form/products-form.component';
import { ProductsComponent } from './components/products/products.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  {path: 'login', component: LoginComponent },
  {path: 'register', component: RegisterComponent },
  {path: 'about', component: AboutComponent },
  {path:'products',component: ProductsComponent },
  {path:'productsEdit/:id',component: ProductsEditComponent },
  {path:'adminmenu',component: AdminMenuComponent },
  {path: 'adminlogin',component : AdminLoginComponent},
  {path: 'index',component : IndexComponent },
  {path: 'ProductsForm', component : ProductsFormComponent},
  {path: 'adminproducts' ,component : AdminProductsComponent},
  {path: 'adminuusers' ,component : AdminUsersComponent},
  {path: 'productsDetail/:id',component : ProductsDetailsComponent},
  {path: 'profile',component: ProfileComponent},
  {path: 'cart',component:CartComponent},
  {path: 'imgproductsDetail/:id' , component:AdminProductsDetailComponent},
  {path: 'productsDetailImg/:id' , component:AdminProductsDetailImgComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
