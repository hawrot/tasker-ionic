import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {Task} from "../tasks/task.model";
import {TasksService} from "../tasks/tasks.service";
import {LoadingController, MenuController} from "@ionic/angular";

@Component({
  selector: 'app-completed',
  templateUrl: './completed.page.html',
  styleUrls: ['./completed.page.scss'],
})
export class CompletedPage implements OnInit, OnDestroy {

  loadedTasks: Task[];
  private tasksSub: Subscription;
  isLoading = false;
  filteredTasks: Task[];

  constructor(private tasksService: TasksService, private menu: MenuController, private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.tasksSub = this.tasksService.tasks.subscribe(tasks =>{
      this.loadedTasks = tasks;
      this.filteredTasks =  tasks.filter(obj => obj.completed === true)

    })
  }

  ionViewWillEnter(){
    this.isLoading = true;
    this.tasksService.fetchPlaces().subscribe(()=>{
      this.isLoading = false;
    })
  }

  ngOnDestroy(): void {
    if (this.tasksSub){
      this.tasksSub.unsubscribe();
    }
  }

  onDeleteTask(taskId: string){
    this.loadingCtrl.create({message: 'Deleting'}).then(loadingEl =>{
      loadingEl.present();
      this.tasksService.removeTask(taskId).subscribe(()=>{
        loadingEl.dismiss();
      })
    })
  }



}
