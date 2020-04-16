import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'inbox', pathMatch: 'full' },
  { path: 'inbox', loadChildren: () => import('./inbox/inbox.module').then( m => m.InboxPageModule)},
  {
    path: 'inbox',
    loadChildren: () => import('./inbox/inbox.module').then( m => m.InboxPageModule)
  },
  {
    path: 'tasks',
    loadChildren: () => import('./tasks/tasks.module').then( m => m.TasksPageModule)
  },
  {
    path: 'task-detail',
    loadChildren: () => import('./inbox/task-detail/task-detail.module').then( m => m.TaskDetailPageModule)
  },
  {
    path: 'due',
    loadChildren: () => import('./due/due.module').then( m => m.DuePageModule)
  },
  {
    path: 'completed',
    loadChildren: () => import('./completed/completed.module').then( m => m.CompletedPageModule)
  },
  {
    path: 'map-modal',
    loadChildren: () => import('./shared/map-modal/map-modal.module').then( m => m.MapModalPageModule)
  },
  {
    path: 'location-picker',
    loadChildren: () => import('./shared/location-picker/location-picker.module').then( m => m.LocationPickerPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }


/*
{ path: '', redirectTo: 'home', pathMatch: 'full' },
{ path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},*/
