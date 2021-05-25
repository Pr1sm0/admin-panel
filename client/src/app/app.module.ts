import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { AddItemComponent } from './add-item/add-item.component';
import { ItemEditComponent } from './item-edit/item-edit.component';
import { ItemListComponent } from './item-list/item-list.component';

import { authInterceptorProviders } from './helpers/auth.interceptor';
import { AdminRoutesGuard } from './helpers/admin-routes.guard';
import { UserRoutesGuard } from './helpers/user-routes.guard';
import { ItemCardComponent } from './item-card/item-card.component';
import { ItemPageComponent } from './item-page/item-page.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './shared/components/footer/footer.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    AddItemComponent,
    ItemEditComponent,
    ItemListComponent,
    ItemCardComponent,
    ItemPageComponent,
    HeaderComponent,
    FooterComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    NgbModule
  ],
  providers: [authInterceptorProviders, AdminRoutesGuard, UserRoutesGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
