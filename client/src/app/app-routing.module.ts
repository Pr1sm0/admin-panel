import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemEditComponent } from './item-edit/item-edit.component';
import { AddItemComponent } from './add-item/add-item.component';
import { AddImageComponent } from './add-image/add-image.component';
import { ItemPageComponent } from './item-page/item-page.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AdminRoutesGuard } from './helpers/admin-routes.guard';
import { UserRoutesGuard } from './helpers/user-routes.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [UserRoutesGuard],
  },
  { path: 'items', component: ItemListComponent },
  { path: 'items/:id', component: ItemPageComponent },
  {
    path: 'items/:id/edit',
    component: ItemEditComponent,
    canActivate: [AdminRoutesGuard],
  },
  {
    path: 'add-item',
    component: AddItemComponent,
    canActivate: [AdminRoutesGuard],
  },
  {
    path: 'items/:id/add-image',
    component: AddImageComponent,
    canActivate: [AdminRoutesGuard],
  },
  { path: '', redirectTo: 'items', pathMatch: 'full' },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
