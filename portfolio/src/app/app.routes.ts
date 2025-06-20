import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ExperienceComponent } from './experience/experience.component';
import { ContactComponent } from './contact/contact.component';
import { ResumeManagerComponent } from './resume-manager/resume-manager.component';

export const routes: Routes = [
    {
        path: '',
        component: AppComponent
    },
    {
        path: 'home',
        component: AppComponent
    },
    {
        path: 'about',
        component: AboutComponent
    },
    {
        path: 'experience',
        component: ExperienceComponent
    },
    {
        path: 'contact',
        component: ContactComponent
    },
    {
        path: 'me',
        component: ResumeManagerComponent
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch:'full'
    }
];
