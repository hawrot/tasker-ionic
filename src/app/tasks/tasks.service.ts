import { Injectable } from '@angular/core';
import {Task} from "./task.model";


@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private _tasks: Task[] = [
    new Task(
        't1',
        'Task nr 1',
        'This is a test task 1',
        new Date(Date.now()),
        new Date(Date.now())

    ),
    new Task(
        't2',
        'Task nr 2',
        'This is a test task 2',
        new Date(Date.now()),
        new Date(Date.now())

    )
  ];

  get tasks(){
    return [...this._tasks];
  }

  constructor() { }
}
