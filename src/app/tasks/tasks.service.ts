import { Injectable } from '@angular/core';
import {Task} from "./task.model";
import {BehaviorSubject} from "rxjs";
import {map, take, tap} from "rxjs/operators";
import {HttpClient, HttpClientModule} from '@angular/common/http';

interface TaskData {
  id: string,
  title: string,
  description: string,
  createdAt: string,
  dueDate: string,
  dueTime: string,
  status: string,
  assigned: boolean

}

@Injectable({
  providedIn: 'root'
})
export class TasksService {


private _tasks = new BehaviorSubject<Task[]>([]);

  /*private _tasks = new BehaviorSubject<Task[]> ([
    new Task(
        't1',
        'Task nr 1',
        'This is a test task 1',
        "2020-04-20",
        "2020-04-20",
        "13:22",
        "open",
        false

    ),
    new Task(
        't2',
        'Task nr 2',
        'This is a test task 2',
        "2020-04-20",
        "2020-04-20",
      "13:22",
      "open",
      false

    )
  ]);*/
  constructor(private http: HttpClient) { }

  fetchPlaces(){
    return this.http.get<{[key: string]: TaskData}>('https://honours-matthawrot.firebaseio.com/tasks.json')
        .pipe(map(resData =>{
          const tasks = [];
          for (const key in resData){
            if(resData.hasOwnProperty(key)){
              tasks.push(new Task(
                  key, resData[key].title,
                  resData[key].description,
                  resData[key].createdAt,
                  resData[key].dueDate,
                  resData[key].dueTime,
                  resData[key].status,
                  resData[key].assigned
              ));
            }
          }
          return tasks;
        }),
            tap(tasks =>{
              this._tasks.next(tasks);
            })
        )
  };

  addTask(title: string, description: string, dueDate, dueTime){
    const newTask = new Task(
        Math.random().toString(),
        title,
        description,
        new Date(Date.now()).toDateString(),
        dueDate,
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
