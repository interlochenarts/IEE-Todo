import {SafeUrl} from '@angular/platform-browser';

export class Todo {
  isComplete: boolean;
  personAssigned: string;
  description: string;
  dueDate: string;
  linkUrl: string;
  safeUrl: SafeUrl;
  school: string;
}
