import {Component, OnDestroy, OnInit} from '@angular/core';
import {Task} from "../tasks/task.model";
import {TasksService} from "../tasks/tasks.service";
import {IonItemSliding, LoadingController, MenuController} from "@ionic/angular";
import {Data, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {FormControl} from "@angular/forms";
import {catchError, debounceTime} from "rxjs/operators";
import {Plugins, PushNotification, PushNotificationToken, PushNotificationActionPerformed} from "@capacitor/core";




@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.page.html',
  styleUrls: ['./inbox.page.scss'],
})
export class InboxPage implements OnInit, OnDestroy {


  loadedTasks: Task[];
  private tasksSub: Subscription;
  isLoading = false;



  constructor(private tasksService: TasksService, private menu: MenuController, private loadingCtrl: LoadingController, private router: Router) {

  }



  ngOnInit() {
   this.tasksSub = this.tasksService.tasks.subscribe(tasks =>{
     this.loadedTasks = tasks.filter(obj => obj.completed === false);
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

  onCardClick(){
    console.log('It works!' + event);
  }
  onEdit(taskId : string){
    this.router.navigate(['/tasks/edit-task', taskId])
  }

  onDeleteTask(taskId: string){
   this.loadingCtrl.create({message: 'Deleting'}).then(loadingEl =>{
     loadingEl.present();
     this.tasksService.removeTask(taskId).subscribe(()=>{
       loadingEl.dismiss();
     })
   })
  }

  onCompleteTask(taskId: string){
    this.loadingCtrl.create({message: 'Updating'}).then(loadingEl =>{
      loadingEl.present();
      this.tasksService.updateTaskStatus(taskId).subscribe(()=>{
        loadingEl.dismiss();
      })
    })
  }

}
