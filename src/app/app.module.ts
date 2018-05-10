import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {GuiModule} from './gui/gui.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    GuiModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
