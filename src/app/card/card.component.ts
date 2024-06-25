import { Component, Input } from '@angular/core';
import { NgIf, UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { DocumentData } from 'firebase/firestore';
import { MatButtonModule } from '@angular/material/button';
import { DbService } from '../db.service';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { CardDialogComponent } from './card-dialog/card-dialog.component';

@Component({
  standalone: true,
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  imports: [
    FormsModule,
    MatCardModule,
    NgIf,
    UpperCasePipe,
    MatButtonModule,
    MatIconModule,
    CommonModule,
  ],
})
export class CardComponent {
  @Input() card: DocumentData;
  @Input() size: string;
  @Input() width: number;
  private DbService: DbService;
  public isFlipped: boolean = false;
  public noImage: boolean;

  constructor(
    DbService: DbService,
    public dialog: MatDialog,
  ) {
    this.DbService = DbService;
  }

  ngOnInit() {
    this.noImage = this.card['imageURL'] === ''
    this.isFlipped = this.card['imageURL'] === '';
  }

  toggleFlip() {
    if (!this.noImage) {
      this.isFlipped = !this.isFlipped;
    }
  }

  public deletePlayer(player: string): void {
    this.toggleFlip();
    this.DbService.deleteCard(player);
  }

  public getCardMore(card: DocumentData): void {
    this.toggleFlip();
    this.dialog.open(CardDialogComponent, {
      data: card,
    });
  }
}
