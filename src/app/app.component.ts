import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";

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

console.log(app);
// Initialize Firebase
//const analytics = getAnalytics(app);

//export var settings = jQuery.ajax({
 // "async": true,
//  "crossDomain": true,
 // "url": "https://api.psacard.com/publicapi/cert/GetByCertNumber/00000002",
//  "method": "GET",
 // "headers": {
 //       "authorization": "bearer mTGre-L_PPwEklu2QiXwrwvj5eKoJ1shY4dlP3navOqpnu-tMFiZjMu8PQWmMk4_OdK5qk7KOMTyDRWC6bm3h8RE8lkl34yRcl4T4EgCfZmub4sfg0qceByQr2o6LDBCplbp7aIcHWYOWOqPkETEK8ejQ6ybpJXslP4ZFYnPz85OzaVtL5VX-S75LFxvEkiotNg99pHJGIv1gUu775sH_Jtx4DIBH4nXEhHvmgEykC83gOlM1wqDjiYROQsTRtj63LuAAOB92D-PKRhe1xN9PrD38s9vIlb_AUGdwZa_ytziI0OV"
 // }}
//);