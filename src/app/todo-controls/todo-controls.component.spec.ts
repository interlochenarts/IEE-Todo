import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoControlsComponent } from './todo-controls.component';

describe('TodoControlsComponent', () => {
  let component: TodoControlsComponent;
  let fixture: ComponentFixture<TodoControlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoControlsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
