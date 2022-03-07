import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class SendEmailService {

  private env:string;

  constructor(private _http: HttpClient) {
    this.env=environment.APP_URL;
   }

  sendEmail(content: any){
    return this._http.post<any>(this.env +'email/sendEmail', content);
  }
}
