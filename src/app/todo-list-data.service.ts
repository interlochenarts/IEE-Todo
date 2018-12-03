import {Injectable} from '@angular/core';
import {SortSettings} from './sort-settings';
import {BehaviorSubject} from 'rxjs';
import {Todo} from './todo';

declare const Visualforce: any;

@Injectable()
export class TodoListDataService {
  public sortSettings = new BehaviorSubject<SortSettings>({sortAscending: true, sortColumn: 'dueDate'});
  public todoList = new BehaviorSubject<Todo[]>([]);

  constructor() {
    Visualforce.remoting.Manager.invokeAction(
      'IEE_TodoViewController.getTodoList',
      result => {
        const toDoObjects: Array<Todo> = [];
        result.forEach(t => {
          const toDoObj = new Todo();
          Object.assign(toDoObj, t);
          toDoObjects.push(t);
        });

        this.todoList.next(toDoObjects);
        this.sortByColumnName('dueDate');
      },
      {buffer: false, escape: false}
    );
  }

  setSortSettings(settings: SortSettings): void {
    this.sortSettings.next(settings);
  }

  sortByComplete(): void {
    const todos = this.todoList.getValue();
    if (todos && todos.length > 0) {
      const sortSet = this.sortSettings.getValue();
      sortSet.sortAscending = this.getSortDirection('complete');
      todos.sort((a, b) => {
        if (sortSet.sortAscending) {
          return (a.isComplete === b.isComplete) ? 0 : a.isComplete ? -1 : 1;
        } else {
          return (a.isComplete === b.isComplete) ? 0 : a.isComplete ? 1 : -1;
        }
      });
      sortSet.sortColumn = 'complete';
      this.setSortSettings(sortSet);
      this.todoList.next(todos.slice());
    }
  }

  sortByColumnName(col: string): void {
    const todos = this.todoList.getValue();
    if (todos && todos.length > 0) {
      const sortSet = this.sortSettings.getValue();
      sortSet.sortAscending = this.getSortDirection(col);
      todos.sort((a, b) => {
        if (sortSet.sortAscending) {
          return (a[col] === b[col]) ? 0 : a[col] > b[col] ? -1 : 1;
        } else {
          return (a[col] === b[col]) ? 0 : a[col] > b[col] ? 1 : -1;
        }
      });
      sortSet.sortColumn = col;
      this.setSortSettings(sortSet);
      this.todoList.next(todos.slice());
    }
  }

  getSortDirection(col: string) {
    const sortSet = this.sortSettings.getValue();
    return sortSet.sortColumn === col ? !sortSet.sortAscending : false;
  }
}
