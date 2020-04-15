import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DuePageRoutingModule } from './due-routing.module';

import { DuePage } from './due.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DuePageRoutingModule
  ],
  declarations: [DuePage]
})
export class DuePageModule {}
