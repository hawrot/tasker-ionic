import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TaskItemPage } from './task-item.page';

const routes: Routes = [
  {
    path: '',
    component: TaskItemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaskItemPageRoutingModule {}
