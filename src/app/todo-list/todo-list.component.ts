import {Component, Input, OnInit} from '@angular/core';
import {Todo} from '../todo';
// const Visualforce = require('../lib/VFRemote');

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  @Input() todos: Array<Todo>;
  @Input() isLoading;
  @Input() showComplete: boolean;
  sortColumn = 'dueDate';
  sortAscending = false;

  constructor() {
  }

  ngOnInit() {
  }

  taskIsPastDue(dueDate: Date, isComplete: boolean) {
    return (!isComplete && new Date() > dueDate);
  }

  getSortDirection(col: string) {
    return this.sortColumn === col ? !this.sortAscending : false;
  }

  sortByComplete(): void {
    if (this.todos && this.todos.length > 0) {
      this.sortAscending = this.getSortDirection('complete');
      this.todos.sort((a, b) => {
        if (this.sortAscending) {
          return (a.isComplete === b.isComplete) ? 0 : a.isComplete ? -1 : 1;
        } else {
          return (a.isComplete === b.isComplete) ? 0 : a.isComplete ? 1 : -1;
        }
      });
      this.sortColumn = 'complete';
      this.todos = this.todos.slice();
    }
  }

  sortByColumnName(col: string): void {
    if (this.todos && this.todos.length > 0) {
      this.sortAscending = this.getSortDirection(col);
      this.todos.sort((a, b) => {
        if (this.sortAscending) {
          return (a[col] === b[col]) ? 0 : a[col] > b[col] ? -1 : 1;
        } else {
          return (a[col] === b[col]) ? 0 : a[col] > b[col] ? 1 : -1;
        }
      });
      this.sortColumn = col;
      this.todos = this.todos.slice();
    }
  }

  getSortDirectionClass(col: string) {
    let sortClass: string;

    if (this.sortColumn === col) {
      sortClass = this.sortAscending ? 'fa-caret-up' : 'fa-caret-down';
    } else {
      sortClass = '';
    }

    return sortClass;
  }
}
