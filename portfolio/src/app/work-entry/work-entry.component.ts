import { ChangeDetectionStrategy, Component, Input, inject, Inject } from '@angular/core';
import { WorkEntry } from "../workEntry";
import { MatDialog, MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgFor, NgIf } from '@angular/common';


@Component({
  selector: 'app-work-entry',
  styleUrl: './work-entry.component.css',
  templateUrl: './work-entry.component.html',
  imports: [
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
  styleUrl: './work-entry-dialog.css',
  templateUrl: './work-entry-dialog.html',
  imports: [
    MatDialogModule,
    NgFor,
    NgIf
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkEntryComponentDialog {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: WorkEntry,
    private dialogRef: MatDialogRef<WorkEntryComponentDialog>
  ) { }

  closeDialog() {
    this.dialogRef.close('Dialog closed by user');
  }
}