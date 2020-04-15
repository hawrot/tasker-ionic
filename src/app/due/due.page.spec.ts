import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DuePage } from './due.page';

describe('DuePage', () => {
  let component: DuePage;
  let fixture: ComponentFixture<DuePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DuePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DuePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
