import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Project} from "./project.model";
import {Task} from "../tasks/task.model";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor() { }

  private _projects = new BehaviorSubject<Project[]>([
      new Project(
          "t1",
        [],
          new Date(Date.now()),
          1
      )
  ]);

  get projects(){
    return this._projects.asObservable();
  }
}
