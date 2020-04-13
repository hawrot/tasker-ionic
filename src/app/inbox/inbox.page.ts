import { Component, OnInit } from '@angular/core';
import {Task} from "../tasks/task.model";
import {TasksService} from "../tasks/tasks.service";
import {MenuController} from "@ionic/angular";

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.page.html',
  styleUrls: ['./inbox.page.scss'],
})
export class InboxPage implements OnInit {

  loadedTasks: Task[];


  constructor(private tasksService: TasksService, private menu: MenuController) { }



  ngOnInit() {
    this.loadedTasks = this.tasksService.tasks;
  }

  onCardClick(){
    console.log('It works!' + event);
  }

}
