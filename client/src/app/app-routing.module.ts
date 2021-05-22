import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { AddItemComponent } from './add-item/add-item.component';
import { AddImageComponent } from './add-image/add-image.component';
import { ItemPageComponent } from './item-page/item-page.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'items', component: ItemListComponent },
  { path: 'items/:id', component: ItemPageComponent },
  { path: 'items/:id/edit', component: ItemDetailsComponent },
  { path: 'add', component: AddItemComponent },
  { path: ':itemId/add-image', component: AddImageComponent },
  { path: '', redirectTo: 'items', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
