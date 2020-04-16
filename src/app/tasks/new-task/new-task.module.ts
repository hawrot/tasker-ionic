import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewTaskPageRoutingModule } from './new-task-routing.module';

import { NewTaskPage } from './new-task.page';
import {SharedModule} from "../../shared/shared.module";
import {RouterModule} from "@angular/router";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        NewTaskPageRoutingModule,
        ReactiveFormsModule,
        SharedModule

    ],
  declarations: [NewTaskPage]
})
export class NewTaskPageModule {}
