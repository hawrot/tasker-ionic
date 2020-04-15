import {Component, OnDestroy, OnInit} from '@angular/core';
import {TasksService} from "../tasks/tasks.service";
import {MenuController} from "@ionic/angular";
import {Task} from "../tasks/task.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-due',
  templateUrl: './due.page.html',
  styleUrls: ['./due.page.scss'],
})
export class DuePage implements OnInit, OnDestroy {

  loadedTasks: Task[];
  private tasksSub: Subscription;
  isLoading = false;
  filteredTasks: Task[];

  constructor(private tasksService: TasksService, private menu: MenuController) { }

  ngOnInit() {
    this.tasksSub = this.tasksService.tasks.subscribe(tasks =>{
      this.loadedTasks = tasks;
      const today = new Date().setHours(0,0,0,0);
      this.filteredTasks =  tasks.filter(obj => new Date(obj['dueDate']).setHours(0,0,0,0) <= today)
    })
  }
  ionViewWillEnter(){
    this.isLoading = true;
    this.tasksService.fetchPlaces().subscribe(()=>{
      this.isLoading = false;

    })
  }

  ngOnDestroy(): void {
    if (this.tasksSub){
      this.tasksSub.unsubscribe();
    }
  }

  getDate(){
   return new Date(Date.now());
  }



}
