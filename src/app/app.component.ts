import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { CollectionReference, DocumentData, collection, doc, getDocs, getFirestore, query, setDoc } from "firebase/firestore"; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatCardModule, MatButtonModule, MatIconModule, ReactiveFormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'Card Collection';
  cardData: CollectionReference<DocumentData, DocumentData>;
  cardInfoForm: FormGroup;
  formOpen: boolean = false;
  userCards = [] as DocumentData[];

  constructor(private formBuilder: FormBuilder){}

  async ngOnInit(): Promise<void> {
    this.cardInfoForm = this.formBuilder.group({
      name: ['', Validators.required],
      cardNumber: ['', Validators.required],
      cardCompany: ['', Validators.required],
    });

    this.loadCardData();
  }

  public onFormSubmit(): void {
    const formData = this.cardInfoForm.value;

    setDoc(doc(this.cardData, "user"), {
      playerName: formData.name, 
      cardNumber: formData.cardNumber, 
      cardCompany: formData.cardCompany});

    this.formOpen = false;
    this.loadCardData();
  }

  public onFormButtonClick(): void {
    this.formOpen = !this.formOpen;
  }

  private async loadCardData(): Promise<void> {
    const querySnapshot = await getDocs(this.cardData);
    querySnapshot.forEach((doc) => {
      this.userCards.push(doc.data());
    });
  }

  private loadDatabase(): void {
    const firebaseConfig = {
      apiKey: "AIzaSyCXWprLVXeI8GO_F9kOtdavG13Zc8UeAfI",
      authDomain: "card-app-e8d58.firebaseapp.com",
      projectId: "card-app-e8d58",
      storageBucket: "card-app-e8d58.appspot.com",
      messagingSenderId: "1082177021578",
      appId: "1:1082177021578:web:a5726757e3a1480719af73",
      measurementId: "G-YRN16NYZ0T"
    };

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    this.cardData = collection(db, "test");
  }
}