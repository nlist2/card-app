import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { initializeApp } from 'firebase/app';
import {
  CollectionReference,
  DocumentData,
  collection,
  doc,
  getDocs,
  deleteDoc,
  getFirestore,
  setDoc,
} from 'firebase/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CardComponent } from './card/card.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { firebaseConfig, psaSettings } from '../environment';
import { MatInputModule } from '@angular/material/input';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormDialog } from './form/form.component';
import { MatDialog } from '@angular/material/dialog';
import { DbService } from './db.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatSlider, MatSliderModule } from '@angular/material/slider';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatTableModule,
    MatCardModule,
    MatSlideToggleModule,
    HttpClientModule,
    MatTooltipModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    CommonModule,
    FlexLayoutModule,
    CardComponent,
    LoginComponent,
    MatFormFieldModule,
    MatInputModule,
    MatSliderModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Card Collection';
  cardData: CollectionReference<DocumentData, DocumentData>;
  cardInfoForm: FormGroup;
  formOpen: boolean = false;
  userCards: DocumentData[];
  public loggedIn: boolean = false;
  public cardView: boolean = true;
  response: any;
  cardSize: any;

  @ViewChild('cardViewElement', { read: ElementRef }) element:
    | ElementRef
    | undefined;

  card: string =
  'M5.25 17.25q-.619 0-1.059-.441T3.75 15.75v-7.5q0-.619.441-1.059T5.25 6.75h7.5q.619 0 1.059.441T14.25 8.25v7.5q0 .619-.441 1.059T12.75 17.25H5.25Zm0-2.738q.825-.487 1.763-.75t1.987-.262q1.05 0 1.988.262t1.762.75v-6.262H5.25v6.262Zm3.75.488q-.769 0-1.5.188t-1.388.563h5.775q-.656-.375-1.387-.562t-1.5-.187Zm0-2.062q-.844 0-1.453-.609T6.938 10.875q0-.844.609-1.453T9 8.813q.844 0 1.453.609T11.063 10.875q0 .844-.609 1.453T9 12.938Zm0-1.387q.281 0 .478-.197T9.675 10.875q0-.281-.197-.478T9 10.2q-.281 0-.478.197T8.325 10.875q0 .281.197 .478T9 11.55Zm6.75 5.7v-10.5h1.5v10.5h-1.5Zm3 0v-10.5h1.5v10.5h-1.5ZM9 10.875Zm0 4.875Z'
  list: string =
    'M4.8 16.8v-1.6h14.4v1.6H4.8Zm0-4v-1.6h14.4v1.6H4.8Zm0-4v-1.6h14.4v1.6H4.8Z'

  constructor(
    private dialog: MatDialog,
    private DbService: DbService,
  ) {
    DbService.loadDatabase();
  }


  ngAfterViewInit() {
    this.element?.nativeElement
      .querySelector('.mdc-switch__icon--on')
      .firstChild.setAttribute('d', this.card);
    this.element?.nativeElement
      .querySelector('.mdc-switch__icon--off')
      .firstChild.setAttribute('d', this.list);
  }

  private async loadCards(): Promise<void> {
    this.userCards = await this.DbService.loadCardData();
  }

  public onFormButtonClick(): void {
    this.loadCards();
    this.dialog.open(FormDialog);
    this.formOpen = !this.formOpen;
  }

  public updateView(): void {
    this.cardView = !this.cardView;
  }

  convertStringToNumber(value: string) {
    return parseFloat(value); // Use parseFloat for floating-point numbers
  }

  displayedColumns: string[] = ['demo-position', 'demo-name', 'demo-weight'];
}
