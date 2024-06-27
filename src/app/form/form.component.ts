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
import { CommonModule } from '@angular/common';
import { DbService } from '../db.service';
import { MatIconModule } from '@angular/material/icon';

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
    CommonModule,
    MatIconModule
  ],
})
export class FormDialog {
  public cardForm: FormGroup;
  private subscription: Subscription;
  response: JSON;
  private dbService: DbService;
  private card: any;
  public query: string;
  public priceResults: any[] = [];

  constructor(
    private DbService: DbService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private dialog: MatDialog,
  ) {
    this.cardForm = this.formBuilder.group({
      certNumber: [''],
      userQuery: [''],
    });

    this.dbService = DbService;

    this.subscription = this.cardForm
      .get('certNumber')!
      .valueChanges.pipe(
        map((value) => value.toString()),
        filter((value) => value.length === 8),
      )
      .subscribe((value) => {
        this.fetchData(value);
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
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
          this.response = data;
          this.card = data;
          this.query =  data.PSACert.Year + " " + data.PSACert.Subject + " " + data.PSACert.Brand;

          console.log(data.PSACert);
          this.getPrices(this.query);
        },
        (error) => {
          console.error('There was an error!', error);
        },
      );
  }

  public getPrices(query: string): void {
    this.http
    .get<any>(
      `https://www.sportscardspro.com/search-products?q=${query}&type=prices`
    )
    .subscribe(
      (data) => {
        // Data response
        console.log(query);
        this.priceResults = data.products?.slice(0,3);
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
    this.card = this.card.PSACert;

    this.http
      .get<any>(
        `https://api.psacard.com/publicapi/cert/GetImagesByCertNumber/${this.card.CertNumber}`,
        { headers },
      )
      .subscribe(
        (data) => {
          this.response = data;
          data.forEach((element: { ImageURL: any; IsFrontImage: any }) => {
            if (element.IsFrontImage) {
              this.dbService.onFormSubmit(
                this.card.Subject ?? "",
                this.card.CardNumber ?? "",
                this.card.Brand ?? "",
                this.card ?? 'N/A',
                element.ImageURL,
              );
            }
          });
        },
        (error) => {
          console.error('There was an error!', error);
        },
      );
    this.DbService.loadCardData();
  }
}
