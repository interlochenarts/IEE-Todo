import {Component, Input, OnInit} from '@angular/core';
import {Todo} from '../todo';

@Component({
  selector: '[app-todo]',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  @Input() todo: Todo;

  constructor() { }

  ngOnInit() {
  }

  getCompleteClass() {
    return this.todo.isComplete ? 'fa-check-square-o' : 'fa-square-o';
  }

}
