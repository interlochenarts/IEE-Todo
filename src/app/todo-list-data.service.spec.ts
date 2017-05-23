import { TestBed, inject } from '@angular/core/testing';

import { TodoListDataService } from './todo-list-data.service';

describe('TodoListDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TodoListDataService]
    });
  });

  it('should be created', inject([TodoListDataService], (service: TodoListDataService) => {
    expect(service).toBeTruthy();
  }));
});
