import {Component, OnDestroy, OnInit} from '@angular/core';
import {Task} from "../../tasks/task.model";
import {ActivatedRoute, Router} from "@angular/router";
import {TasksService} from "../../tasks/tasks.service";
import {Subscription} from "rxjs";
import {NavController} from "@ionic/angular";

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.page.html',
  styleUrls: ['./task-detail.page.scss'],
})
export class TaskDetailPage implements OnInit, OnDestroy {

  task: Task;
  private taskSub: Subscription;

  constructor(private router: Router,
              private route:ActivatedRoute,
              private tasksService: TasksService,
              private navController: NavController

              ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap =>{
      if(!paramMap.has('taskId')){
       this.navController.navigateBack('/');
      }
      this.taskSub = this.tasksService.getTask(paramMap.get('taskId')).subscribe(task =>{
        this.task = task;
      })

    })
  }

  ngOnDestroy()  {
    if(this.taskSub){
      this.taskSub.unsubscribe();
    }
  }

}
