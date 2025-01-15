import { Component,Input } from '@angular/core';
import { WorkEntry } from "../workEntry";

@Component({
  selector: 'app-work-entry',
  imports: [],
  templateUrl: './work-entry.component.html',
  styleUrl: './work-entry.component.css'
})
//const dialog = document.querySelector("dialog");
//const showButton = document.querySelector("dialog + button");
//const closeButton = document.querySelector("dialog button");
//
//// "Show the dialog" button opens the dialog modally
//showButton.addEventListener("click", () => {
//  dialog.showModal();
//});
//
//// "Close" button closes the dialog
//closeButton.addEventListener("click", () => {
//  dialog.close();
//});
export class WorkEntryComponent {
  @Input() workEntry!:WorkEntry;
}
