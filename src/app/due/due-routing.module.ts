import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DuePage } from './due.page';

const routes: Routes = [
  {
    path: '',
    component: DuePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DuePageRoutingModule {}
