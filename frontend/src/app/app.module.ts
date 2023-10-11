import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EditorModule } from 'primeng/editor';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from '@auth0/auth0-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { CardComponent } from './components/card/card.component';
import { BodyComponent } from './components/body/body.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SpinnerComponent } from './spinner/spinner.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CardComponent,
    BodyComponent,
    SidebarComponent,
    SpinnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    EditorModule,
    FormsModule,
    HttpClientModule,
    AuthModule.forRoot({
      domain: 'dev-ctz4ajacgyylyi6s.us.auth0.com',
      clientId: 'gfunUXj2bGDE23zauMGkLxuCHZir8d9z',
      authorizationParams: {
        audience: "https://dev-ctz4ajacgyylyi6s.us.auth0.com/api/v2/",
        redirect_uri: window.location.origin
      }
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
