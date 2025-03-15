import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NewExpComponent } from './new-exp/new-exp.component';

export const routes: Routes = [
    {path: '',     component: AppComponent},
    {path: 'new_exp',component: NewExpComponent},
    {path: '**',redirectTo: '',pathMatch: 'full' }
];
