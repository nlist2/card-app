import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogRef } from '@angular/material/dialog';
import { DbService } from '../db.service';

@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  standalone: true,
  styleUrls: ['./login.component.css'],
  imports: [MatDialogModule, MatButtonModule, MatFormFieldModule],
})
export class LoginComponent {
  public loggedIn: boolean = false;

  constructor(
    public dialog: MatDialog,
    private DbService: DbService,
  ) {
    const dialogRef = this.dialog.open(DialogContentExampleDialog);

    dialogRef.afterClosed().subscribe(() => {
      this.DbService.loadCardData();
    });
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
export class DialogContentExampleDialog implements OnInit {
  loginForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<DialogContentExampleDialog>,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    // Implement your login logic here if needed
    // For example:
    // if (this.loginForm.valid) { ... }
  }
}
