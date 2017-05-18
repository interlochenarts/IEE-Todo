import {Component, OnInit} from '@angular/core';
import {Todo} from '../todo';

declare var Visualforce: any;

@Component({
  selector: 'app-todo-controls',
  templateUrl: './todo-controls.component.html',
  styleUrls: ['./todo-controls.component.css']
})
export class TodoControlsComponent implements OnInit {
  todos: Todo[];
  isLoading = true;
  showComplete = true;

  pageNumber = 1;
  pageLength = 10;
  maxPages = 1;

  todoSlice: Array<Todo>;

  constructor() {
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    Visualforce.remoting.Manager.invokeAction(
      'IEE_TodoViewController.getTodoList',
      (result) => {
        if (result) {
          this.isLoading = false;
          this.todos = result;
          this.maxPages = Math.ceil(this.todos.length / this.pageLength);
          this.getTodoPageSlice();
        }
      }, {
        buffer: false
      }
    );
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

  getTodoPageSlice(): void {
    if (this.todos) {
      const p = this.pageNumber - 1;
      const start = p * this.pageLength;
      const end = (this.todos.length - (this.pageNumber * this.pageLength)) > 0
        ? this.pageNumber * this.pageLength
        : this.todos.length;

      console.log('Slicing:: start: ' + start + ' / end: ' + end);
      console.log(this.todos.slice(start, end));
      this.todoSlice = JSON.parse(JSON.stringify(this.todos.slice(start, end)));
    }
  }
}
