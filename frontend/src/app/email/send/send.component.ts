import { Component, OnInit } from '@angular/core';
import { SendEmailService } from '../../services/send-email.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-send',
  templateUrl: './send.component.html',
  styleUrls: ['./send.component.css'],
})
export class SendComponent implements OnInit {
  public content: any;
  private message: string = '';
  private horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  private verticalPosition: MatSnackBarVerticalPosition = 'top';
  private durationInSeconds: number = 3000;

  constructor(private _sendEmailService: SendEmailService, private _snackBar: MatSnackBar) {
    this.content = {};
  }

  sendEmail(){
    if (!this.content.email || !this.content.subject || !this.content.message) {
      this.message = "Incomplete data";
      this.openSnackBarkError();
    } else {
      this._sendEmailService.sendEmail(this.content).subscribe({
        next:(v)=>{
          this.message="Email sent";
          this.openSnackBarSuccesfull();
          this.content= {};
        },
        error:(e)=>{
          this.message = e.error.message;
          this.openSnackBarkError();
        }
      })
    }
  }

  openSnackBarSuccesfull() {
    this._snackBar.open(this.message, ' X ', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds,
      panelClass: ['styleSnackBarkSuccesfull']
    })
  }
  openSnackBarkError() {
    this._snackBar.open(this.message, ' X ', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds,
      panelClass: ['styleSnackBarkError']
    })
  }

  ngOnInit(): void {}
}
