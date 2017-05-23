import {Component, Input, OnInit} from '@angular/core';
import {Todo} from '../todo';
import {Observable} from 'rxjs/Observable';
import {SortSettings} from '../sort-settings';
import {TodoListDataService} from '../todo-list-data.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  @Input() todos: Array<Todo>;
  @Input() isLoading;
  @Input() showComplete: boolean;
  sortSettings: Observable<SortSettings>;
  sortValues: SortSettings;

  static taskIsPastDue(dueDate: Date, isComplete: boolean) {
    return (!isComplete && new Date() > dueDate);
  }

  constructor(private todoDataService: TodoListDataService) {
  }

  ngOnInit() {
    this.sortSettings = this.todoDataService.getSortSettings();
    this.sortSettings.subscribe(data => this.sortValues = data);
  }

  getSortDirectionClass(col: string) {
    let sortClass: string;

    if (this.sortValues && this.sortValues.sortColumn === col) {
      sortClass = this.sortValues.sortAscending ? 'fa-caret-up' : 'fa-caret-down';
    } else {
      sortClass = '';
    }

    return sortClass;
  }
}
