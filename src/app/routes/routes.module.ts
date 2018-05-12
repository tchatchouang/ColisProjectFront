import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from '../gui/login/login.component';
import {SingUpComponent} from '../gui/sing-up/sing-up.component';
import {HomePageComponent} from '../gui/home-page/home-page.component';
import {TrajetDetailsComponent} from '../gui/trajet-details/trajet-details.component';
import {AuthguardGuard} from '../authguard.guard';
import {DashboardComponent} from '../gui/dashboard/dashboard.component';
import {GeneralDashboardComponent} from '../gui/general-dashboard/general-dashboard.component';
import {TrajetPublierComponent} from '../gui/trajet-publier/trajet-publier.component';
import {ProposeTrajetComponent} from '../gui/propose-trajet/propose-trajet.component';
import {TrajetDemanderComponent} from '../gui/trajet-demander/trajet-demander.component';
import {MessagerieComponent} from '../gui/messagerie/messagerie.component';
import {MessagerieMessageComponent} from '../gui/messagerie-message/messagerie-message.component';
import {AvisComponent} from '../gui/avis/avis.component';
import {AvisRecuComponent} from '../gui/avis-recu/avis-recu.component';
import {ProfilComponent} from '../gui/profil/profil.component';
import {CommonModule} from '@angular/common';
import {SignOutComponent} from '../gui/sign-out/sign-out.component';

const appRoutes: Routes = [
  {
    path: 'sign-in', component: LoginComponent
  },
  {
    path: 'sign-up', component: SingUpComponent
  },
  {
    path: 'sign-out', component: SignOutComponent
  },
  {
    path: 'home', component: HomePageComponent,
    children: [
      {path: 'detailsTrajet/:idTrajet', component: TrajetDetailsComponent}
    ],
  },
  {
    path: 'dashboard', canActivate: [AuthguardGuard], children: [
      {
        path: 'general', component: DashboardComponent, children: [
          {
            path: 'general', component: GeneralDashboardComponent
          },
          {
            path: 'trajetProposer', component: TrajetPublierComponent
          },
          {
            path: 'proposeTrajet', component: ProposeTrajetComponent
          },
          {
            path: 'trajetDemander', component: TrajetDemanderComponent
          },
          {
            path: 'messagerie', component: MessagerieComponent,
            children: [
              {path: 'message/:idConversation', component: MessagerieMessageComponent}
            ],
          },
          {
            path: 'avis', component: AvisComponent
          },
          {
            path: 'avisRecu', component: AvisRecuComponent
          },
          {
            path: 'profil', component: ProfilComponent
          }
        ]
      }
    ]
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes),
  ],
  exports: [RouterModule],
  declarations: []
})
export class RoutesModule {
}
