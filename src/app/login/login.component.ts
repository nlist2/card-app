import { Component, Input } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DbService } from '../db.service';
import { LoginService } from './login.service';

@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  standalone: true,
  styleUrls: ['./login.component.css'],
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class LoginComponent {
  public loginForm: FormGroup;

  constructor(
    private dbService: DbService,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  async login(): Promise<void> {
    const username = this.loginForm.get('username')?.value;
    const password = this.loginForm.get('password')?.value;

    const loggedIn = await this.dbService.signIn(username, password);
    this.loginService.setLoggedIn(loggedIn);
    if (loggedIn) {
      this.loginService.setUsername(username);
      this.dbService.loadCardData();
    }
  }
}
