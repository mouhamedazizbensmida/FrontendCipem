import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FormationsComponent } from './formations/formations.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { FormationDetailsComponent } from './formation-details/formation-details.component';

export const PUBLIC_ROUTES: Routes = [
  { 
    path: '', 
    component: HomeComponent, 
    data: { 
      title: 'TITLE.HOME',
      breadcrumb: 'HOME.HEADER'
    } 
  },
  {
    path: 'formations',
    children: [
      {
        path: '',
        component: FormationsComponent,
        pathMatch: 'full',
        data: { 
          title: 'TITLE.TRAININGS',
          breadcrumb: 'FORMATIONS.HEADER'
        }
      },
      {
        path: ':id',
        component: FormationDetailsComponent,
        data: { 
          title: 'TITLE.TRAINING_DETAILS',
          breadcrumb: 'FORMATION_DETAILS.HEADER'
        }
      }
    ]
  },
  { 
    path: 'a-propos', 
    component: AboutComponent, 
    data: { 
      title: 'TITLE.ABOUT',
      breadcrumb: 'ABOUT.HEADER'
    } 
  },
  { 
    path: 'contact', 
    component: ContactComponent, 
    data: { 
      title: 'TITLE.CONTACT',
      breadcrumb: 'CONTACT.HEADER'
    } 
  }
];