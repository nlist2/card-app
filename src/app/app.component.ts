import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { initializeApp } from 'firebase/app';
import { CollectionReference, DocumentData, collection, doc, getDocs, deleteDoc, getFirestore, setDoc } from "firebase/firestore"; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CardComponent } from './card/card.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { firebaseConfig, psaSettings } from '../environment';
import { MatInputModule } from '@angular/material/input';
import { LoginComponent } from './login/login.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { FormDialog } from './form/form.component';
import { MatDialog } from '@angular/material/dialog';
import { DbService } from './db.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatCardModule, HttpClientModule, MatButtonModule, MatIconModule, ReactiveFormsModule, CommonModule, FlexLayoutModule, CardComponent, LoginComponent, MatFormFieldModule, MatInputModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent{
  title = 'Card Collection';
  cardData: CollectionReference<DocumentData, DocumentData>;
  cardInfoForm: FormGroup;
  formOpen: boolean = false;
  userCards: DocumentData[];
  public loggedIn: boolean = false;
  response: any;

  constructor(private dialog: MatDialog, private DbService: DbService){
    DbService.loadDatabase();
  }

  private async loadCards(): Promise<void> {
    this.userCards = await this.DbService.loadCardData();
  }

  public onFormButtonClick(): void {
    this.loadCards();
    this.dialog.open(FormDialog);
    this.formOpen = !this.formOpen;
  }
}