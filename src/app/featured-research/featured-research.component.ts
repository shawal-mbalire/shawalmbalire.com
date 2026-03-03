import { Component } from '@angular/core';

/**
 * Featured Research Component
 * Displays the Black Soldier Fly IoT project - IEEE AFRICON 2023 publication
 * Lazy-loaded with @defer for optimal performance
 */
@Component({
  selector: 'app-featured-research',
  imports: [],
  templateUrl: './featured-research.component.html',
  styleUrl: './featured-research.component.scss'
})
export class FeaturedResearchComponent {
  readonly project = {
    title: 'A Low-Cost Internet of Things Cloud-Based Solution for the Intelligent Rearing of the Black Soldier Fly',
    conference: 'IEEE AFRICON 2023',
    location: 'Nairobi, Kenya',
    date: 'Jan 2023 - Sep 2023',
    description: 'Co-authored an IEEE AFRICON 2023 paper on IoT-based Black Soldier Fly farming. Presented the paper at AFRICON. Designed database flow and backend with Python and Firebase.',
    highlights: [
      'Prototyped IoT sensors for environmental monitoring',
      'Developed cloud-based data management system',
      'Implemented real-time monitoring dashboard',
      'Published to IEEE Xplore'
    ],
    links: {
      ieee: 'https://ieeexplore.ieee.org/document/10444688',
      github: 'https://github.com/shawalmbalire'
    },
    skills: ['IoT', 'Python', 'Firebase', 'Cloud Firestore', 'Sensor Integration', 'Data Analysis']
  };
}
