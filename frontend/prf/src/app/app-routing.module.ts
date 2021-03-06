import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ErrorComponent } from './error/error.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { ShopComponent } from './shop/shop.component';
import { RegistrationComponent } from './registration/registration.component';
import { CreatItemComponent } from './shop/creat-item/creat-item.component';
import { EditItemComponent } from './shop/edit-item/edit-item.component';

const routes: Routes = [
  {path: '', redirectTo:'login', pathMatch :'full'},
  {path:'login', component: LoginComponent},
  {path:'registration', component: RegistrationComponent},
  {path:'shop', component: ShopComponent,canActivate:[AuthGuard]},
  {path:'creat-item', component: CreatItemComponent,canActivate:[AuthGuard]},
  {path:'edit-item', component: EditItemComponent,canActivate:[AuthGuard]},
  {path:'about', component: AboutComponent,canActivate:[AuthGuard]},

  {path:'**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
