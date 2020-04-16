import { Injectable } from '@angular/core';
import {Task} from "./task.model";
import {BehaviorSubject, of} from "rxjs";
import {map, switchMap, take, tap} from "rxjs/operators";
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {PlaceLocation} from "./location.model";

interface TaskData {
  id: string,
  title: string,
  description: string,
  createdAt: string,
  dueDate: string,
  dueTime: string,
  status: string,
  completed: boolean,
  location: PlaceLocation,
  imageUrl: string

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
                  resData[key].completed,
                  resData[key].location,
                  resData[key].imageUrl
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



  addTask(title: string, description: string, dueDate, dueTime, location: PlaceLocation, imageUrl){
    let generatedId: string;
    const newTask = new Task(
        Math.random().toString(),
        title,
        description,
        new Date(Date.now()),
        new Date(dueDate),
        dueTime,
        "open",
        false,
        location,
        imageUrl

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

  removeTask(taskId: string) {
      return this.http.delete(`https://honours-matthawrot.firebaseio.com/tasks/${taskId}.json`)
          .pipe(switchMap(() => {
                  return this.tasks;
              }),
              take(1),
              tap(tasks => {
                  this._tasks.next(tasks.filter(b => b.id !== taskId));
              }));

  }

updateTask(taskId: string, title: string, description: string, completed: boolean){
      let updatedTasks: Task[];

    return this.tasks.pipe(take(1), switchMap(tasks =>{
        if(!tasks || tasks.length <= 0){
            return this.fetchPlaces();
        }
        else {
            return of(tasks);
        }
    }),
        switchMap(tasks =>{
            const updatedTaskIndex = tasks.findIndex(t => t.id === taskId);
            updatedTasks = [...tasks];
            const oldTasks = updatedTasks[updatedTaskIndex];
            updatedTasks[updatedTaskIndex] = new  Task(oldTasks.id, title, description, oldTasks.createdAt, oldTasks.dueDate, oldTasks.dueTime, oldTasks.status, completed, oldTasks.location, oldTasks.imageUrl);
            this._tasks.next(updatedTasks);
            return this.http.put(`https://honours-matthawrot.firebaseio.com/tasks/${taskId}.json`,
                {...updatedTasks[updatedTaskIndex], id: null});

        }),
        tap(()=>{
            this._tasks.next(updatedTasks);
        })
    )
}
    uploadImage(image: File) {
        const uploadData = new FormData();
        uploadData.append('image', image);
                return this.http.post<{ imageUrl: string; imagePath: string }>(
                    'https://us-central1-ionic-angular-course-f44b5.cloudfunctions.net/storeImage',
                    uploadData
                );
            }



}
