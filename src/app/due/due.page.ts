import {Component, OnDestroy, OnInit} from '@angular/core';
import {TasksService} from "../tasks/tasks.service";
import {LoadingController, MenuController, ToastController} from "@ionic/angular";
import {Task} from "../tasks/task.model";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-due',
  templateUrl: './due.page.html',
  styleUrls: ['./due.page.scss'],
})
export class DuePage implements OnInit, OnDestroy {

  loadedTasks: Task[];
  private tasksSub: Subscription;
  isLoading = false;
  filteredTasks: Task[];

  constructor(private tasksService: TasksService, private menu: MenuController, private router: Router, private loadingCtrl: LoadingController, private toastCtrl: ToastController) { }

  ngOnInit() {
    this.tasksSub = this.tasksService.tasks.subscribe(tasks =>{
      this.loadedTasks = tasks;
      const today = new Date().setHours(0,0,0,0);
      this.filteredTasks =  tasks.filter(obj => new Date(obj['dueDate']).setHours(0,0,0,0) <= today)
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

  getDate(){
   return new Date(Date.now());
  }

  onEdit(taskId : string){
    this.router.navigate(['/tasks/edit-task', taskId])
  }

  onDeleteTask(taskId: string){
    this.loadingCtrl.create({message: 'Deleting'}).then(loadingEl =>{
      loadingEl.present();
      this.tasksService.removeTask(taskId).subscribe(()=>{
        loadingEl.dismiss();
        this.toastCtrl.create({
          color: 'dark',
          duration: 2000,
          message: 'Deleted'
        }).then(toastEl =>{
          toastEl.present();
        })


      })
    })
  }



}
