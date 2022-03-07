import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SendComponent } from './email/send/send.component';

const routes: Routes = [
  {
    path:'',
    component:SendComponent
  },
  {
    path:'send',
    component:SendComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
