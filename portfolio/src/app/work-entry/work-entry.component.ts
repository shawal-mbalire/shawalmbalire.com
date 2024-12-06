import { Component,Input } from '@angular/core';
import { WorkEntry } from "../workEntry";

@Component({
  selector: 'app-work-entry',
  imports: [],
  templateUrl: './work-entry.component.html',
  styleUrl: './work-entry.component.css'
})
export class WorkEntryComponent {
  @Input() workEntry!:WorkEntry;
}
