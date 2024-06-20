import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private loggedInSubject = new Subject<boolean>();
  loggedIn$ = this.loggedInSubject.asObservable();

  private usernameSubject = new Subject<string>();
  username$ = this.usernameSubject.asObservable();

  setLoggedIn(value: boolean): void {
    this.loggedInSubject.next(value);
  }

  setUsername(value: string): void {
    this.usernameSubject.next(value);
  }
}
