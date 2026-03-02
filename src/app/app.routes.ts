import { Routes } from '@angular/router';
import { AppComponent } from './app.component';

/**
 * Application routes configuration with SEO metadata
 * Meta tags and titles are set dynamically by AppComponent based on route data
 */
export const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    data: { 
      title: 'Shawal Mbalire - Electrical & Software Engineering Student',
      description: 'Portfolio of Shawal Mbalire - Electrical Engineering student at Makerere University, specializing in IoT, Automation, and Software Development'
    }
  },
  {
    path: 'home',
    component: AppComponent,
    data: { 
      title: 'Home - Shawal Mbalire',
      description: 'Electrical and Software Engineering Student passionate about IoT, Automation, and modern web technologies'
    }
  },
  {
    path: 'about',
    component: AppComponent,
    data: { 
      title: 'About Me - Shawal Mbalire',
      description: 'Learn more about Shawal Mbalire - Electrical Engineering student at Makerere University with expertise in embedded systems and web development'
    }
  },
  {
    path: 'experience',
    component: AppComponent,
    data: { 
      title: 'Experience - Shawal Mbalire',
      description: 'Professional experience in IoT, embedded systems, software development, and engineering projects at Makerere University and beyond'
    }
  },
  {
    path: 'contact',
    component: AppComponent,
    data: { 
      title: 'Contact - Shawal Mbalire',
      description: 'Get in touch with Shawal Mbalire for collaborations, opportunities, or questions about engineering projects'
    }
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
