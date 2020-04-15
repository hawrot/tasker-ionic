import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import { InboxPage } from './inbox.page';
import {Router, RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {
    path: '',
    component: InboxPage
  },
  {
    path: ':taskId',
    loadChildren: () => import('./task-detail/task-detail.module').then(m => m.TaskDetailPageModule)
  }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule

    ],
  declarations: [InboxPage]
})
export class InboxPageModule {}
