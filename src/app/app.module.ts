import { BrowserModule } from '@angular/platform-browser';
import { Injectable, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { UserServiceService } from './service/user-service.service';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { SinginComponent } from './singin/singin.component';
import { MenuComponent } from './menu/menu.component';
import { TokenInterceptor } from './interseptor/interseptor';
import { ProfilComponent } from './profil/profil.component';
import { AuthGuardService } from './service/auth-guard.service';
import { AuthServiceService } from './service/auth-service.service';
import { ErrorInterceptor } from './interseptor/errorInterceptor';
import { UserListComponent } from './user-list/user-list.component';
import { ScrollTopComponent } from './scroll-top/scroll-top.component';
import { GlobalSearchService } from './service/global-search.service';
import { AdminGuardService } from './service/admin-guard.service';

@Injectable()
export class XhrInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const xhr = req.clone({
      headers: req.headers.set('X-Requested-With', 'XMLHttpRequest')
    });
    return next.handle(xhr);
  }
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    HomeComponent,
    SinginComponent,
    MenuComponent,
    ProfilComponent,
    UserListComponent,
    ScrollTopComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    UserServiceService,
    AdminGuardService,
    AuthGuardService,
    AuthServiceService,
    GlobalSearchService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    { provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

