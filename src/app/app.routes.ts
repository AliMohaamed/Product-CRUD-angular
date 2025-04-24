import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductDetalisComponent } from './components/product-detalis/product-detalis.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { AccountComponent } from './pages/account/account.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'products/:id', component: ProductDetalisComponent },
  { path: 'products/:id/edit', component: ProductFormComponent },
  {
    path: 'account',
    component: AccountComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
    ],
  },
  { path: '**', component: NotFoundComponent },
];
