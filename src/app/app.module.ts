import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RoutingModule} from "./routing/routing.module";
// import {Ng2BootstrapModule} from "ng2-bootstrap";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


import { AppComponent } from './app.component';
import { SearchingComponent } from './searching/searching.component';
import {HttpModule} from "@angular/http";
import {FormsModule} from "@angular/forms";
import {SearchingService} from "./services/searching.service";
import { PublicOpionComponent } from './public-opion/public-opion.component';
import { InnovativeComponent } from './innovative/innovative.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchingComponent,
    PublicOpionComponent,
    InnovativeComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    HttpModule,
    FormsModule,
    NgbModule.forRoot()
  ],
  providers: [SearchingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
