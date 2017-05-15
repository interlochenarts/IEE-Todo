import {Component, Input, OnInit} from '@angular/core';
import {Todo} from '../todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  // todos: Todo[];
  todos: Todo[] = [
    {
      isComplete: true,
      personAssigned: 'Daughter Christmas',
      description: 'Finish Application',
      dueDate: '2012-04-23T18:25:43.511Z'
    },
    {
      isComplete: false,
      personAssigned: 'Daughter Christmas',
      description: 'Pay Deposit',
      dueDate: '2013-04-23T18:25:43.511Z'
    },
    {
      isComplete: true,
      personAssigned: 'Daughter Christmas',
      description: 'Finish Application',
      dueDate: '2014-04-23T18:25:43.511Z'
    },
    {
      isComplete: true,
      personAssigned: 'Daughter Christmas',
      description: 'Finish Application',
      dueDate: '2015-04-23T18:25:43.511Z'
    },
    {
      isComplete: false,
      personAssigned: 'Daughter Christmas',
      description: 'Finish Application',
      dueDate: '2016-04-23T18:25:43.511Z'
    }
  ];
  isLoading = false;
  showComplete = true;

  constructor() {
  }

  ngOnInit() {
    this.loadData();
  }

  showCompleteChange(): void {
    console.log('show complete = ' + this.showComplete);
  }

  loadData() {
    // Visualforce.remoting.Manager.invokeAction(
    //   '{!$RemoteAction.}',
    //   (result, event) => {
    //     if (result) {
    //       this.isLoading = false;
    //       this.todos = result;
    //     }
    //   }, {
    //     buffer: false
    //   }
    // );
  }
}
