import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CollectionReference, DocumentData } from 'firebase/firestore';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CardComponent } from './card/card.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormDialog } from './form/form.component';
import { MatDialog } from '@angular/material/dialog';
import { DbService } from './db.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatSliderModule } from '@angular/material/slider';
import { card, list } from '../environment';
import { LoginService } from './login/login.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatMenuModule,
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
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'),
      ),
    ]),
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Card Collection';
  cardData: CollectionReference<DocumentData, DocumentData>;
  formOpen: boolean = false;
  userCards: DocumentData[];
  public loggedIn: boolean;
  public cardView: boolean = true;
  cardSize: any;
  public isMobileLayout: boolean = false;
  dataSource: DocumentData[];
  columnsToDisplay = ['cardNumber', 'playerName', 'cardCompany'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: DocumentData[] | null;
  public username: string;

  @ViewChild('cardViewElement', { read: ElementRef }) element:
    | ElementRef
    | undefined;

  constructor(
    public _snackBar: MatSnackBar,
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

    this.loginService.username$.subscribe((username: string) => {
      this.username = username;
    });
  }

  ngAfterViewInit() {
    this.element?.nativeElement
      .querySelector('.mdc-switch__icon--on')
      .firstChild.setAttribute('d', card);
    this.element?.nativeElement
      .querySelector('.mdc-switch__icon--off')
      .firstChild.setAttribute('d', list);

    if (typeof window !== 'undefined') {
      if (window.screen.width === 360) {
        this.isMobileLayout = true;
      }
    }
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
    const plyr = 'Deleted ' + player + '!';
    this._snackBar.open(plyr, undefined, {
      duration: 2000,
    });
  }

  logout() {
    this.loginService.logout();
    this._snackBar.open('Successfully logged out!', undefined, {
      duration: 2000,
    });
  }
}
