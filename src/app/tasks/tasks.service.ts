import { Injectable } from '@angular/core';
import {Task} from "./task.model";
import {BehaviorSubject} from "rxjs";
import {map, switchMap, take, tap} from "rxjs/operators";
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
                  new Date(resData[key].createdAt),
                  new Date(resData[key].dueDate),
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
    let generatedId: string;
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

    return this.http.post<{name: string}>('https://honours-matthawrot.firebaseio.com/tasks.json', {
      ...newTask,
      id: null
    }).pipe(switchMap(resData =>{
      generatedId = resData.name;
      return this.tasks;
    }),
        take(1),
        tap(tasks =>{
          newTask.id = generatedId;
          this._tasks.next(tasks.concat(newTask));
        })
    );
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
