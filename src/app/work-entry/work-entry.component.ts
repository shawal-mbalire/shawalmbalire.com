import { ChangeDetectionStrategy, Component, inject, Inject, input } from '@angular/core';
import { WorkEntry } from '../core/models/work-entry.model';
import { MatDialog, MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

/**
 * Work entry component displaying individual work experience
 */
@Component({
  selector: 'app-work-entry',
  styleUrl: './work-entry.component.scss',
  templateUrl: './work-entry.component.html',
  imports: [MatDialogModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkEntryComponent {
  readonly workEntry = input.required<WorkEntry>();
  readonly dialog = inject(MatDialog);

  openDialog(): void {
    const dialogRef = this.dialog.open(
      WorkEntryComponentDialog,
      {
        data: this.workEntry()
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

@Component({
  selector: 'app-work-entry-dialog',
  styleUrl: './work-entry-dialog.scss',
  templateUrl: './work-entry-dialog.html',
  imports: [MatDialogModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkEntryComponentDialog {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: WorkEntry,
    private readonly dialogRef: MatDialogRef<WorkEntryComponentDialog>
  ) {}

  closeDialog(): void {
    this.dialogRef.close('Dialog closed by user');
  }
}
