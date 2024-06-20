import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CollectionReference, DocumentData } from 'firebase/firestore';
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
import { card, list } from '../environment';
import { LoginService } from './login/login.service';

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
    MatSliderModule,
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

  constructor(
    private dialog: MatDialog,
    private DbService: DbService,
    private loginService: LoginService,
  ) {
    this.DbService.cardData$.subscribe((data) => {
      this.userCards = data;
    });

    this.loginService.loggedIn$.subscribe((loggedIn: boolean) => {
      this.loggedIn = loggedIn;
    });
  }

  ngAfterViewInit() {
    this.element?.nativeElement
      .querySelector('.mdc-switch__icon--on')
      .firstChild.setAttribute('d', card);
    this.element?.nativeElement
      .querySelector('.mdc-switch__icon--off')
      .firstChild.setAttribute('d', list);
  }

  public onFormButtonClick(): void {
    this.dialog.open(FormDialog);
    this.formOpen = !this.formOpen;
  }

  public updateView(): void {
    this.cardView = !this.cardView;
  }

  convertStringToNumber(value: string) {
    return parseFloat(value);
  }

  removePlayer(player: string) {
    this.DbService.deleteCard(player);
  }

  displayedColumns: string[] = [
    'demo-delete',
    'demo-position',
    'demo-name',
    'demo-weight',
  ];
}
