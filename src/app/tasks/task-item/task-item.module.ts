import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TaskItemPageRoutingModule } from './task-item-routing.module';

import { TaskItemPage } from './task-item.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TaskItemPageRoutingModule
  ],
  declarations: [TaskItemPage]
})
export class TaskItemPageModule {}
