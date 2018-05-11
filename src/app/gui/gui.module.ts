import {ContactUsComponent} from './contact-us/contact-us.component';
import {HomePageComponent} from './home-page/home-page.component';
import {ProfilComponent} from './profil/profil.component';
import {ProposeTrajetComponent} from './propose-trajet/propose-trajet.component';
import {MessagerieMessageComponent} from './messagerie-message/messagerie-message.component';
import {PersonnesComponent} from './personnes/personnes.component';
import {AdvertisementComponent} from './advertisement/advertisement.component';
import {MessagerieComponent} from './messagerie/messagerie.component';
import {GuiComponent} from './gui.component';
import {TrajetDetailsComponent} from './trajet-details/trajet-details.component';
import {GeneralDashboardComponent} from './general-dashboard/general-dashboard.component';
import {FooterComponent} from './footer/footer.component';
import {SingUpComponent} from './sing-up/sing-up.component';
import {TrajetDemanderComponent} from './trajet-demander/trajet-demander.component';
import {MenuComponent} from './menu/menu.component';
import {AvisComponent} from './avis/avis.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {TrajetPublierComponent} from './trajet-publier/trajet-publier.component';
import {AvisRecuComponent} from './avis-recu/avis-recu.component';
import {TeamComponent} from './team/team.component';
import {NgModule} from '@angular/core';
import {LoginComponent} from './login/login.component';
import {CommonModule} from '@angular/common';
import {ServiceModule} from '../services/service.module';
import {FormsModule} from '@angular/forms';
import {RoutesModule} from '../routes/routes.module';



@NgModule({
  imports: [CommonModule, ServiceModule, FormsModule, RoutesModule],
  declarations: [
    GuiComponent,
    AdvertisementComponent,
    AvisRecuComponent,
    AvisComponent,
    ContactUsComponent,
    DashboardComponent,
    GeneralDashboardComponent,
    FooterComponent,
    HomePageComponent,
    MenuComponent,
    MessagerieMessageComponent,
    MessagerieComponent,
    PersonnesComponent,
    ProfilComponent,
    ProposeTrajetComponent,
    SingUpComponent,
    TeamComponent,
    TrajetDemanderComponent,
    TrajetDetailsComponent,
    TrajetPublierComponent,
    LoginComponent],
  exports: [GuiComponent],
})
export class GuiModule {
}
