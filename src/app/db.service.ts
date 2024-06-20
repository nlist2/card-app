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
import { Subject } from 'rxjs';
import { firebaseConfig } from '../environment';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  cardData: CollectionReference<DocumentData>;
  userCards: DocumentData[] = [];
  private cardDataSubject = new Subject<DocumentData[]>();
  cardData$ = this.cardDataSubject.asObservable();
  public loggedIn: boolean = false;
  response: any;

  constructor() {
    this.loadDatabase(); // Ensure the database is loaded when the service is instantiated
  }

  public loadDatabase(): void {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    this.cardData = collection(db, 'test');
  }

  public async onFormSubmit(
    playerName: string,
    cardNumber: string,
    cardCompany: string,
    psaCert: any,
    imageURL?: string,
  ): Promise<void> {
    if (!this.cardData) {
      console.error('Card data collection is not initialized.');
      return;
    }

    await setDoc(doc(this.cardData, playerName), {
      playerName: playerName,
      cardNumber: cardNumber,
      cardCompany: cardCompany,
      psaCert: psaCert,
      imageURL: imageURL ?? '',
    });

    await this.loadCardData(); // Reload data after submitting
  }

  public async loadCardData(): Promise<void> {
    if (!this.cardData) {
      console.error('Card data collection is not initialized.');
      return;
    }

    const querySnapshot = await getDocs(this.cardData);
    this.userCards = [];
    querySnapshot.forEach((doc) => {
      if (this.userCards.indexOf(doc.data()) === -1) {
        this.userCards.push(doc.data());
      } else {
        console.log('This item already exists');
      }
    });

    this.cardDataSubject.next(this.userCards); // Notify subscribers
  }

  public async deleteCard(playerName: string): Promise<void> {
    if (!this.cardData) {
      console.error('Card data collection is not initialized.');
      return;
    }

    await deleteDoc(doc(this.cardData, playerName));
    await this.loadCardData(); // Reload data after deletion
  }
}
