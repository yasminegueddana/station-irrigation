import { Routes } from '@angular/router';
import { PompeListComponent } from './energy/pompe-list/pompe-list.component';
import { PompeFormComponent } from './energy/pompe-form/pompe-form.component';
import { ConsoPompeComponent } from './energy/conso-pompe/conso-pompe.component';
import { ReservoirFormComponent } from './water/reservoir-form/reservoir-form.component';
import { ReservoirListComponent } from './water/reservoir-list/reservoir-list.component';
import { DebitFormComponent } from './water/debit-form/debit-form.component';
import { DebitPompeComponent } from './water/debit-pompe/debit-pompe.component';
import { DebitListComponent } from './water/debit-list/debit-list.component';
import { AlerteEauListComponent } from './water/alerte-eau-list/alerte-eau-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';



export const routes: Routes = [
    { path: 'pompes', component: PompeListComponent },
    { path: 'pompes/nouveau', component: PompeFormComponent },
    { path: 'pompes/:id', component: PompeFormComponent },
    { path: 'pompes/:id/consommations', component: ConsoPompeComponent },
    { path: 'reservoirs', component: ReservoirListComponent },
    { path: 'reservoirs/nouveau', component: ReservoirFormComponent },
    { path: 'reservoirs/:id', component: ReservoirFormComponent },
    { path: 'debits', component: DebitListComponent },
    { path: 'debits/nouveau', component: DebitFormComponent },
    { path: 'debits/:id', component: DebitFormComponent },
    { path: 'pompes/:id/debits', component: DebitPompeComponent },
    { path: 'alertes-eau', component: AlerteEauListComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'pompes', component: PompeListComponent },





    { path: '', redirectTo: 'dashboard', pathMatch: 'full' }

];

