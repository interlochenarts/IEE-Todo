import {Component, Input, OnInit} from '@angular/core';
import {Todo} from '../todo';
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
  sortValues: SortSettings;

  constructor(private todoDataService: TodoListDataService) {
  }

  ngOnInit() {
    this.todoDataService.sortSettings.asObservable().subscribe({
      next: data => this.sortValues = data
    });
  }

  taskIsPastDue(dueDate: Date, isComplete: boolean) {
    return (!isComplete && new Date() > dueDate);
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

  sortByColumnName(col: string): void {
    this.todoDataService.sortByColumnName(col);
  }

  sortByComplete(): void {
    this.todoDataService.sortByComplete();
  }
}
