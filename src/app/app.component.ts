import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { collection, doc, getDocs, getFirestore, query, setDoc } from "firebase/firestore"; 



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'Card Collection';
  settings: any;
}


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const citiesRef = collection(db, "test");


// if the button is clicked, add this
setDoc(doc(citiesRef, "SF"), {
  name: "San Francisco", state: "CA", country: "USA",
  capital: false, population: 860000,
  regions: ["west_coast", "norcal"] });