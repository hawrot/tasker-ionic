import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, ActivationEnd, Router} from "@angular/router";
import {TasksService} from "../tasks.service";
import {AlertController, LoadingController, NavController} from "@ionic/angular";
import {Task} from "../task.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.page.html',
  styleUrls: ['./edit-task.page.scss'],
})
export class EditTaskPage implements OnInit, OnDestroy {

  task: Task;
  taskId: string;
  form: FormGroup;
  isLoading = false;
  private taskSub: Subscription;

  constructor(
      private route: ActivatedRoute,
      private tasksService: TasksService,
      private navCtrl: NavController,
      private router: Router,
      private loadingController: LoadingController,
      private altertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap =>{
      if(!paramMap.has('taskId')){
        this.navCtrl.navigateBack('/');
        return;
      }
      this.taskId = paramMap.get('taskId');
      this.isLoading = true;
      this.taskSub = this.tasksService
          .getTask(paramMap.get('taskId'))
          .subscribe(
              task =>{
                this.task = task;
                this.form = new FormGroup({
                  title: new FormControl(this.task.title,{
                    updateOn: 'blur',
                    validators: [Validators.required]
                  }),
                  description: new FormControl(this.task.description, {
                    updateOn: 'blur',
                    validators: [Validators.required, Validators.maxLength(180)]
                  }),
                  completed: new FormControl(this.task.completed, {
                    updateOn: 'blur',
                    validators: [Validators.required]
                  })
                });
                this.isLoading = false;
              },
              error => {
                this.altertCtrl.create({
                  header: 'An error occured',
                  message: 'Task not found',
                  buttons: [
                    {
                      text: 'Okay',
                      handler: () => {
                        this.router.navigate(['/']);
                      }
                    }
                  ]
                })
                    .then(alertEl =>{
                      alertEl.present();
                    })
              }
          )
    })
  }

  ngOnDestroy(): void {
  }

}
