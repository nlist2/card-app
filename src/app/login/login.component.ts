import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  standalone: true,
  styleUrls: ['./login.component.css'],
  imports: [MatDialogModule, MatButtonModule, MatFormFieldModule],
})
export class LoginComponent {
  public loggedIn: boolean = false;
  constructor(public dialog: MatDialog) {
    const dialogRef = this.dialog.open(DialogContentExampleDialog);
  }
}

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'dialog.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  providers: [],
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class DialogContentExampleDialog {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  login() {}
}
