import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { DragulaModule } from 'ng2-dragula';

import { AppComponent } from './app.component';
import { PageListComponent } from './page-list/page-list.component';
import { TemplateTodoComponent } from './_template/template-todo/template-todo.component';
import { TemplateTodoFormComponent } from './_template/template-todo-form/template-todo-form.component';
import { TemplateHeaderComponent } from './_template/template-header/template-header.component';
import { LoginComponent } from './login/login.component';
import { TokenInterceptor } from './_utils/token.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { CookieService } from 'angular2-cookie/services/cookies.service';


@NgModule({
  declarations: [
    AppComponent,
    PageListComponent,
    TemplateTodoComponent,
    TemplateTodoFormComponent,
    TemplateHeaderComponent,
    LoginComponent
    ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    DragulaModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    CookieService,
    {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent],

})
export class AppModule { }
