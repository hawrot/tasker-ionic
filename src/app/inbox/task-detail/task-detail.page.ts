import { Component, OnInit } from '@angular/core';
import {Task} from "../../tasks/task.model";
import {ActivatedRoute, Router} from "@angular/router";
import {TasksService} from "../../tasks/tasks.service";

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.page.html',
  styleUrls: ['./task-detail.page.scss'],
})
export class TaskDetailPage implements OnInit {

  task: Task;

  constructor(private router: Router, private route:ActivatedRoute, private tasksService: TasksService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap =>{
      if(!paramMap.has('taskId')){
        console.log('Error');
      }
      this.task = this.tasksService.getTasks(paramMap.get('taskId'));

    })
  }

}
