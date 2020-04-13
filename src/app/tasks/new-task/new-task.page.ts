import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TasksService} from "../tasks.service";
import {Router} from "@angular/router";
import {LoadingController} from "@ionic/angular";

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.page.html',
  styleUrls: ['./new-task.page.scss'],
})
export class NewTaskPage implements OnInit {

  form: FormGroup;

  constructor(
      private tasksService: TasksService,
      private router: Router,
      private loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl({updateOn: 'blur', validators: [Validators.required]}),
      description: new FormControl({updateOn: 'blur', validators: [Validators.required]}),
      setDueDate: new FormControl({updateOn: 'blur', validators: [Validators.required]}),
      setDueTime: new FormControl({updateOn: 'blur', validators: [Validators.required]})
    })
  }

  onCreateOffer(){
    if(!this.form.valid){
      return;
    }
    this.loadingController.create({
      message: 'Creating task...'
    }).then(loadingEl =>{
      loadingEl.present();
      this.tasksService.addTask(this.form.value.title, this.form.value.description, new Date(this.form.value.setDueDate), this.form.value.setDueTime).subscribe(()=>{
        loadingEl.dismiss();
        this.form.reset();
        this.router.navigate(['/']);
      });
    })
  }

}
