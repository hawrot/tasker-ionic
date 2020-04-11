import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TaskItemPage } from './task-item.page';

describe('TaskItemPage', () => {
  let component: TaskItemPage;
  let fixture: ComponentFixture<TaskItemPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskItemPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskItemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
