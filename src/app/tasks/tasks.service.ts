import { Injectable } from '@angular/core';
import {Task} from "./task.model";


@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private _phisicalTasks: Task[];

  private _tasks: Task[] = [
    new Task(
        't1',
        'Task nr 1',
        'This is a test task 1',
        new Date(Date.now()),
        new Date(Date.now()),
        "open",
        false

    ),
    new Task(
        't2',
        'Task nr 2',
        'This is a test task 2',
        new Date(Date.now()),
        new Date(Date.now()),
      "open",
      false

    )
  ];

  get tasks(){
    return [...this._tasks];
  }

  getTasks(id: string){
    return {...this._tasks.find(p => p.id === id)};
  }
  getTask(id: string){
    return {...this._tasks.find(p => p.id === id)};
  }

  constructor() { }
}
