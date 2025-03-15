import { Component } from '@angular/core';
import { WorkEntryComponent } from "../work-entry/work-entry.component";
import { CommonModule } from "@angular/common";
import { WorkEntry } from '../core/models/workEntry';

@Component({
  selector: 'app-experience',
  imports: [
    WorkEntryComponent,
    CommonModule,
  ],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.css'
})
export class ExperienceComponent {
  workEntryList: WorkEntry[] = require('../../../public/work-entries.json');
 }
