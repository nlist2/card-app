import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { psaToken } from '../../environment';
import { DbService } from '../db.service';

@Component({
  selector: 'form',
  templateUrl: 'form.component.html',
  standalone: true,
  styleUrls: ['./form.component.css'],
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
  ],
})
export class FormDialog {
  public cardForm: FormGroup;
  private subscription: Subscription;
  response: JSON;
  private dbService: DbService;
  private card: any;

  constructor(
    private DbService: DbService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private dialog: MatDialog,
  ) {
    this.cardForm = this.formBuilder.group({
      certNumber: ['', Validators.required],
      playerName: ['', Validators.required],
      cardNumber: ['', Validators.required],
      cardGrade: ['', Validators.required],
      cardCompany: ['', Validators.required],
    });

    this.dbService = DbService;

    this.subscription = this.cardForm
      .get('certNumber')!
      .valueChanges.pipe(
        map((value) => value.toString()), // Ensure the value is treated as a string
        filter((value) => value.length === 8), // Filter so the function only runs when length is exactly 8
      )
      .subscribe((value) => {
        this.fetchData(value);
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe(); // Prevent memory leaks
  }

  private fetchData(certNumber: string): void {
    const headers = new HttpHeaders({
      Authorization: psaToken,
    });

    this.http
      .get<any>(
        `https://api.psacard.com/publicapi/cert/GetByCertNumber/${certNumber}`,
        { headers },
      )
      .subscribe(
        (data) => {
          this.response = data; // Handle the response data
          this.card = data;

          this.cardForm.patchValue({
            playerName: data.PSACert.Subject,
            cardGrade: data.PSACert.GradeDescription,
            cardNumber: data.PSACert.CardNumber,
            cardCompany: data.PSACert.Brand,
          });
        },
        (error) => {
          console.error('There was an error!', error);
        },
      );
  }

  public submitForm(): void {
    const headers = new HttpHeaders({
      Authorization: psaToken,
    });

    const values = this.cardForm.value;

    this.http
      .get<any>(
        `https://api.psacard.com/publicapi/cert/GetImagesByCertNumber/${values.certNumber}`,
        { headers },
      )
      .subscribe(
        (data) => {
          this.response = data; // Handle the response data
          data.forEach((element: { ImageURL: any; IsFrontImage: any }) => {
            if (element.IsFrontImage) {
              this.dbService.onFormSubmit(
                values.playerName,
                values.cardNumber,
                values.cardCompany,
                this.card.PSACert,
                element.ImageURL,
              );
            }
          });
        },
        (error) => {
          console.error('There was an error!', error);
          this.dbService.onFormSubmit(
            values.playerName,
            values.cardNumber,
            values.cardCompany,
            this.card.PSACert,
          );
        },
      );
    this.DbService.loadCardData();
  }
}
