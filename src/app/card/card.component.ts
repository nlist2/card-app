import { Component, Input } from '@angular/core';
import { NgIf, UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { DocumentData } from 'firebase/firestore';
import { MatButtonModule } from '@angular/material/button';
import { DbService } from '../db.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  imports: [FormsModule, MatCardModule, NgIf, UpperCasePipe, MatButtonModule, MatIconModule],
})

export class CardComponent {
    @Input() card: DocumentData; 
    private DbService: DbService;

    constructor(DbService: DbService){
        this.DbService = DbService;
    }

    isFlipped = false;
    backContent = 'Initial back content';
  
    toggleFlip() {
      this.isFlipped = !this.isFlipped;
    }

    public deletePlayer(player: string): void {
        this.DbService.deleteCard(player);
    }
}