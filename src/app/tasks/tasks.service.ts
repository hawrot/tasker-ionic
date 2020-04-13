import { Injectable } from '@angular/core';
import {Task} from "./task.model";
import {BehaviorSubject} from "rxjs";
import {map, take, tap} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class TasksService {


  constructor() { }

  private _tasks = new BehaviorSubject<Task[]> ([
    new Task(
        't1',
        'Task nr 1',
        'This is a test task 1',
        new Date(Date.now()),
        new Date(Date.now()),
        "13:22",
        "open",
        false

    ),
    new Task(
        't2',
        'Task nr 2',
        'This is a test task 2',
        new Date(Date.now()),
        new Date(Date.now()),
      "13:22",
      "open",
      false

    )
  ]);

  addTask(title: string, description: string, dueDate, dueTime){
    const newTask = new Task(
        Math.random().toString(),
        title,
        description,
        new Date(Date.now()),
        new Date(dueDate),
        dueTime,
        "open",
        false
    );

    return this.tasks.pipe(take(1), tap(tasks =>{
      this._tasks.next(tasks.concat(newTask));
    }))
  }

  get tasks(){
    return this._tasks.asObservable();
  }

  getTasks(id: string){
    return this.tasks.pipe(take(1));
  }
  getTask(id: string){
    return this.tasks.pipe(take(1), map(tasks =>{
      return{...tasks.find(t => t.id === id)}
    }));
  }



}
