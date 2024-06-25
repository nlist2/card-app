import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-card-dialog',
  templateUrl: 'card-dialog.component.html',
  styleUrls: ['card-dialog.component.css'],
})
export class CardDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
