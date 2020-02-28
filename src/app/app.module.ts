import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NewsComponent } from './news/news.component'
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component'
import { AuthGuard } from './_services/authGuard';
import { CardConstructorComponent } from './card-constructor/card-constructor.component' 
import { MatModule } from "./mat.module/mat.module";
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from "@angular/material/form-field";

const routes : Routes = [
  {path : "news", component : NewsComponent, canActivate : [AuthGuard]},
  {path : "reg", component : MainComponent},
  {path : "login", component : LoginComponent}
];

@NgModule({
  declarations: [
    AppComponent, 
    NewsComponent, 
    MainComponent, 
    LoginComponent, 
    CardConstructorComponent
  ],
  imports: [
    BrowserModule, 
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatModule
  ],
  entryComponents : [
    CardConstructorComponent,
    NewsComponent
  ],
  exports : [
    MatModule
  ],
  providers: [
    { provide : MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue : { appearance : 'fill' }}
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
