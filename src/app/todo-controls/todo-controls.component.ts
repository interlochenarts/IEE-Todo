import {Component, OnInit} from '@angular/core';
import {Todo} from '../todo';
import {TodoListDataService} from '../todo-list-data.service';
import {ShowCompleteTasksPipe} from '../show-complete-tasks.pipe';

@Component({
  selector: 'app-todo-controls',
  templateUrl: './todo-controls.component.html',
  styleUrls: ['./todo-controls.component.css'],
  providers: [ShowCompleteTasksPipe]
})
export class TodoControlsComponent implements OnInit {
  todos: Array<Todo>;
  isLoading = false;
  showComplete = true;

  pageNumber = 1;
  pageLength = 10;
  maxPages = 1;

  todoSlice: Array<Todo>;

  constructor(private todoDataService: TodoListDataService, private completePipe: ShowCompleteTasksPipe) {
  }

  ngOnInit() {
    this.todoDataService.todoList.asObservable().subscribe({
      next: data => {
        this.todos = data;
        this.calculateMaxPages(this.todos);
        this.getTodoPageSlice();
        this.isLoading = false;
      }
    });
  }

  showLeftPageControls(): boolean {
    return this.pageNumber > 1;
  }

  showRightPageControls(): boolean {
    return this.pageNumber < this.maxPages;
  }

  getFirstPage() {
    this.pageNumber = 1;
    this.getTodoPageSlice();
  }

  getPreviousPage() {
    this.pageNumber = this.pageNumber - 1;
    this.getTodoPageSlice();
  }

  getNextPage() {
    this.pageNumber = this.pageNumber + 1;
    this.getTodoPageSlice();
  }

  getLastPage() {
    this.pageNumber = this.maxPages;
    this.getTodoPageSlice();
  }

  updateShowComplete(): void {
    this.getTodoPageSlice();
  }

  calculateMaxPages(todos: Array<Todo>): void {
    this.maxPages = Math.ceil(todos.length / this.pageLength);
  }

  getTodoPageSlice(): void {
    if (this.todos) {
      const todos = this.completePipe.transform(this.todos, this.showComplete);
      this.calculateMaxPages(todos);

      if (this.pageNumber > this.maxPages) {
        this.pageNumber = this.maxPages;
      }

      if (this.pageNumber < 1) {
        this.pageNumber = 1;
      }

      const p = this.pageNumber - 1;
      const start = p * this.pageLength;
      const end = (this.todos.length - (this.pageNumber * this.pageLength)) > 0
        ? this.pageNumber * this.pageLength
        : this.todos.length;

      this.todoSlice = JSON.parse(JSON.stringify(todos.slice(start, end)));
    }
  }
}
