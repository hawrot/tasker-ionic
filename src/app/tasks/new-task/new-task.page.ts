import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.page.html',
  styleUrls: ['./new-task.page.scss'],
})
export class NewTaskPage implements OnInit {

  form: FormGroup;

  constructor() { }

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
    console.log(this.form);
  }

}
