import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, ActivationEnd, Router} from "@angular/router";
import {TasksService} from "../tasks.service";
import {AlertController, LoadingController, NavController} from "@ionic/angular";

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.page.html',
  styleUrls: ['./edit-task.page.scss'],
})
export class EditTaskPage implements OnInit, OnDestroy {

  constructor(
      private route: ActivatedRoute,
      private tasksService: TasksService,
      private navCtrl: NavController,
      private router: Router,
      private loadingController: LoadingController,
      private altertCtrl: AlertController
  ) { }

  ngOnInit() {

  }

  ngOnDestroy(): void {
  }

}
