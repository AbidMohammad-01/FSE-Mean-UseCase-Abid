import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CartComponent } from './cart/cart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';





import { NgToastModule } from 'ng-angular-popup';
import { ComparisonComponent } from './comparison/comparison.component';
import { AdminhomeComponent } from './adminhome/adminhome.component';
import { TestComponent } from './test/test.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { MovieComponent } from './movie/movie.component';
import { TicketComponent } from './ticket/ticket.component';


@NgModule({
  declarations: [
    AppComponent,

    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    CartComponent,
    RegisterComponent,
    UserprofileComponent,
    PagenotfoundComponent,
    ComparisonComponent,
    AdminhomeComponent,
    TestComponent,
    ResetpasswordComponent,
    ForgotpasswordComponent,
    MovieComponent,
    TicketComponent





  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule, NgToastModule

  ],
  providers: [provideHttpClient(withFetch())],
  bootstrap: [AppComponent]
})
export class AppModule { }
