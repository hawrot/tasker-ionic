import {Component, OnDestroy, OnInit} from '@angular/core';
import {Task} from "../tasks/task.model";
import {TasksService} from "../tasks/tasks.service";
import {MenuController} from "@ionic/angular";
import {Data} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.page.html',
  styleUrls: ['./inbox.page.scss'],
})
export class InboxPage implements OnInit, OnDestroy {


  loadedTasks: Task[];
  private tasksSub: Subscription;



  constructor(private tasksService: TasksService, private menu: MenuController) { }



  ngOnInit() {
   this.tasksSub = this.tasksService.tasks.subscribe(tasks =>{
     this.loadedTasks = tasks;
   })
  }

  ngOnDestroy(): void {
    if (this.tasksSub){
      this.tasksSub.unsubscribe();
    }
  }

  onCardClick(){
    console.log('It works!' + event);
  }
  onEdit(taskId : string){
    console.log('task id: ' + taskId);
  }


}
