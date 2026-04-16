import { Component } from '@angular/core';
import { ProjectsComponent } from '../projects/projects.component';

/**
 * About component displaying personal information and projects
 */
@Component({
  selector: 'app-about',
  standalone: true,
  imports: [ProjectsComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {}
