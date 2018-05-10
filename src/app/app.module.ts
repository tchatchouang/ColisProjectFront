import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {GuiModule} from './gui/gui.module';
import {ServiceModule} from './services/service.module';
import {RoutesModule} from './routes/routes.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    GuiModule,
    ServiceModule.forRoot(),
    RoutesModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
