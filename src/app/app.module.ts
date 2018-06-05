import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {GuiModule} from './gui/gui.module';
import {ServiceModule} from './services/service.module';
import {StoreModule} from './stores/store.module';
import {AuthguardGuard} from './authguard.guard';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    GuiModule,
    ServiceModule.forRoot(),
    StoreModule,
  ],
  providers: [AuthguardGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
