import { Routes } from '@angular/router';
import { NewExpComponent } from './new-exp/new-exp.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: AppComponent }, // Consider replacing this with a HomeComponent
    { path: 'new_exp', component: NewExpComponent },
    { path: '**', redirectTo: 'home', pathMatch: 'full' }
];
