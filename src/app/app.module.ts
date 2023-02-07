import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './components/index/index.component';
import { AboutComponent } from './components/about/about.component';
import { MenuComponent } from './components/menu/menu.component';
import { ProductsComponent } from './components/products/products.component';
import { LoginComponent } from './components/login/login.component';
import { ComponentsComponent } from './components/components.component';
import { RegisterComponent } from './components/register/register.component';
import { RestService } from './services/rest.service';
import { AdminMenuComponent } from './components/admin-menu/admin-menu.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import { ProductsFormComponent } from './components/products-form/products-form.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';

import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { ProductsEditComponent } from './components/products-edit/products-edit.component';
import {MatSelectModule} from '@angular/material/select';
import { AdminUsersComponent } from './components/admin-users/admin-users.component';
import { ProductsDetailsComponent } from './components/products-details/products-details.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CartComponent } from './components/cart/cart.component';
import { AdminProductsDetailComponent } from './components/admin-products-detail/admin-products-detail.component';
import { AdminProductsDetailImgComponent } from './components/admin-products-detail-img/admin-products-detail-img.component';
@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    AboutComponent,
    MenuComponent,
    ProductsComponent,
    LoginComponent,
    ComponentsComponent,
    RegisterComponent,
    AdminMenuComponent,
    AdminLoginComponent,
    ProductsFormComponent,
    AdminProductsComponent,
    ProductsEditComponent,
    AdminUsersComponent,
    ProductsDetailsComponent,
    ProfileComponent,
    CartComponent,
    AdminProductsDetailComponent,
    AdminProductsDetailImgComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatBottomSheetModule,
    MatPaginatorModule,
    MatTableModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(private rest: RestService) {
    // this.rest.chkLoggedIn()
    }
}
