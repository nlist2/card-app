import { Injectable } from '@angular/core';
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
import { firebaseConfig, psaSettings } from '../environment';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  cardData: CollectionReference<DocumentData, DocumentData>;
  cardInfoForm: FormGroup;
  userCards = [] as DocumentData[];
  public loggedIn: boolean = false;
  response: any;

  public loadDatabase(): void {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    this.cardData = collection(db, 'test');
  }

  public onFormSubmit(
    playerName: string,
    cardNumber: string,
    cardCompany: string,
    imageURL?: string,
  ): void {
    setDoc(doc(this.cardData, playerName), {
      playerName: playerName,
      cardNumber: cardNumber,
      cardCompany: cardCompany,
      imageURL: imageURL ?? '',
    });

    this.loadCardData();
  }

  public async loadCardData(): Promise<DocumentData[]> {
    const querySnapshot = await getDocs(this.cardData);
    // this might cause problems later
    this.userCards = [];
    querySnapshot.forEach((doc) => {
      this.userCards.indexOf(doc.data()) === -1
        ? this.userCards.push(doc.data())
        : console.log('This item already exists');
    });

    return this.userCards;
  }

  public async deleteCard(playerName: string): Promise<void> {
    await deleteDoc(doc(this.cardData, playerName));
    this.loadCardData();
  }
}
