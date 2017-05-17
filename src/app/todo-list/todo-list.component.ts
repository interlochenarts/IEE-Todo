import {Component, Input, OnInit} from '@angular/core';
import {Todo} from '../todo';
// const Visualforce = require('../lib/VFRemote');

declare var Visualforce: any;

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todos: Todo[];
  isLoading = true;
  showComplete = false;
  sortColumn: string;
  sortAscending = false;

  constructor() {
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    Visualforce.remoting.Manager.invokeAction(
      'IEE_TodoViewController.getTodoList',
      (result, event) => {
        if (result) {
          this.isLoading = false;
          this.todos = result;
        }
      }, {
        buffer: false
      }
    );
  }

  getSortDirection(col: string) {
    return this.sortColumn === col ? !this.sortAscending : false;
  }

  sortByComplete(): void {
    this.sortAscending = this.getSortDirection('complete');
    this.todos.sort((a, b) => {
      if (this.sortAscending) {
        return (a.isComplete === b.isComplete) ? 0 : a.isComplete ? -1 : 1;
      } else {
        return (a.isComplete === b.isComplete) ? 0 : a.isComplete ? 1 : -1;
      }
    });
    this.sortColumn = 'complete';
  }

  sortByName(): void {
    this.sortAscending = this.getSortDirection('name');
    this.todos.sort((a, b) => {
      if (this.sortAscending) {
        return (a.personAssigned === b.personAssigned) ? 0 : a.personAssigned > b.personAssigned ? -1 : 1;
      } else {
        return (a.personAssigned === b.personAssigned) ? 0 : a.personAssigned > b.personAssigned ? 1 : -1;
      }
    });
    this.sortColumn = 'name';
  }

  sortByDescription(): void {
    this.sortAscending = this.getSortDirection('description');
    this.todos.sort((a, b) => {
      if (this.sortAscending) {
        return (a.description === b.description) ? 0 : a.description > b.description ? -1 : 1;
      } else {
        return (a.description === b.description) ? 0 : a.description > b.description ? 1 : -1;
      }
    });
    this.sortColumn = 'description';
  }

  sortByDueDate(): void {
    this.sortAscending = this.getSortDirection('dueDate');
    this.todos.sort((a, b) => {
      if (this.sortAscending) {
        return (a.dueDate === b.dueDate) ? 0 : a.dueDate > b.dueDate ? -1 : 1;
      } else {
        return (a.dueDate === b.dueDate) ? 0 : a.dueDate > b.dueDate ? 1 : -1;
      }
    });
    this.sortColumn = 'dueDate';
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
