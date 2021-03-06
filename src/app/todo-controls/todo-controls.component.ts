import {Component, OnInit} from '@angular/core';
import {Todo} from '../todo';
import {TodoListDataService} from '../todo-list-data.service';

@Component({
  selector: 'app-todo-controls',
  templateUrl: './todo-controls.component.html',
  styleUrls: ['./todo-controls.component.css']
})
export class TodoControlsComponent implements OnInit {
  todos: Array<Todo>;
  isLoading = false;

  pageNumber = 1;
  pageLength = 10;
  maxPages = 1;

  todoSlice: Array<Todo>;

  constructor(private todoDataService: TodoListDataService) {
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

  calculateMaxPages(todos: Array<Todo>): void {
    this.maxPages = Math.ceil(todos.length / this.pageLength);
  }

  getTodoPageSlice(): void {
    if (this.todos) {
      const p = this.pageNumber - 1;
      const start = p * this.pageLength;
      const end = (this.todos.length - (this.pageNumber * this.pageLength)) > 0
        ? this.pageNumber * this.pageLength
        : this.todos.length;

      this.todoSlice = JSON.parse(JSON.stringify(this.todos.slice(start, end)));
    }
  }
}
