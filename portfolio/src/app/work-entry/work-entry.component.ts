import { ChangeDetectionStrategy, Component, Input, inject, Inject } from '@angular/core';
import { WorkEntry } from "../workEntry";
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { NgFor,NgIf } from '@angular/common';


@Component({
  selector: 'app-work-entry',
  styleUrl: './work-entry.component.css',
  templateUrl: './work-entry.component.html',
  imports: [
    MatButtonModule, 
    MatDialogModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkEntryComponent {

  @Input() workEntry!: WorkEntry;
  readonly dialog = inject(MatDialog);
  openDialog() {
    const dialogRef = this.dialog.open(
      WorkEntryComponentDialog,
      {
        height: '70vh',
        width: '70vw',
        data: this.workEntry
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}

@Component({
  selector: 'app-work-entry-dialog',
  templateUrl: './work-entry-dialog.html',
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatListModule,
    MatCardModule,
    NgFor,
    NgIf
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkEntryComponentDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: WorkEntry) { }
}