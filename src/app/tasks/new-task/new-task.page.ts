import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TasksService} from "../tasks.service";
import {Router} from "@angular/router";
import {LoadingController} from "@ionic/angular";
import {PlaceLocation} from "../location.model";

function base64toBlob(base64Data, contentType) {
  contentType = contentType || '';
  const sliceSize = 1024;
  const byteCharacters = window.atob(base64Data);
  const bytesLength = byteCharacters.length;
  const slicesCount = Math.ceil(bytesLength / sliceSize);
  const byteArrays = new Array(slicesCount);

  for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
    const begin = sliceIndex * sliceSize;
    const end = Math.min(begin + sliceSize, bytesLength);

    const bytes = new Array(end - begin);
    for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
      bytes[i] = byteCharacters[offset].charCodeAt(0);
    }
    byteArrays[sliceIndex] = new Uint8Array(bytes);
  }
  return new Blob(byteArrays, { type: contentType });
}

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
      setDueTime: new FormControl({updateOn: 'blur', validators: [Validators.required]}),
      location: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null)
    })
  }

  onImagePicked(imageData: string | File) {
    let imageFile;
    if (typeof imageData === 'string') {
      try {
        imageFile = base64toBlob(
            imageData.replace('data:image/jpeg;base64,', ''),
            'image/jpeg'
        );
      } catch (error) {
        console.log(error);
        return;
      }
    } else {
      imageFile = imageData;
    }
    this.form.patchValue({ image: imageFile });
  }

  onLocationPicked(location: PlaceLocation) {
    this.form.patchValue({ location: location });
  }

  onCreateOffer(){
    if(!this.form.valid){
      return;
    }
    this.loadingController.create({
      message: 'Creating task...'
    }).then(loadingEl =>{
      loadingEl.present();
      this.tasksService.addTask(this.form.value.title, this.form.value.description, new Date(this.form.value.setDueDate), this.form.value.setDueTime, this.form.value.location, this.form.value.image).subscribe(()=>{
        loadingEl.dismiss();
        this.form.reset();
        this.router.navigate(['/']);
      });
    })
  }

}
