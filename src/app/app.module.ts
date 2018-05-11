import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {GuiModule} from './gui/gui.module';
import {ServiceModule} from './services/service.module';
import {RoutesModule} from './routes/routes.module';
import {StoreModule} from './stores/store.module';
import {HttpService} from './services/http/http.service';
import {HttpHandler} from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    GuiModule,
    ServiceModule.forRoot(),
    StoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
