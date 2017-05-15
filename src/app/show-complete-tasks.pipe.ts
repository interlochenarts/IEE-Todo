import {Pipe, PipeTransform} from '@angular/core';
import {Todo} from './todo';

@Pipe({
  name: 'showCompleteTasks'
})
export class ShowCompleteTasksPipe implements PipeTransform {

  transform(todos: Todo[], showComplete: boolean): Todo[] {
    if (!todos) {
      return [];
    }
    return todos.filter((todo) => (todo.isComplete === showComplete) || !todo.isComplete);
  }

}
