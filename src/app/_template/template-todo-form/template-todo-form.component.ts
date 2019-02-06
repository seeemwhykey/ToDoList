import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ToDo } from '../../_interface/todo';
import { EventPing } from 'src/app/_interface/eventping';

@Component({
  selector: 'app-template-todo-form',
  templateUrl: './template-todo-form.component.html',
  styleUrls: ['./template-todo-form.component.sass']
})
export class TemplateTodoFormComponent implements OnInit {

  public toDo$: ToDo;
  @Output() ping: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
    this.toDo$ = {
        _id: undefined,
        label: '',
        status: false,
        position: undefined
    };
}
  ngOnInit() {
  }

   // Create new ToDo
  public createToDo(event: any): void {
        this.ping.emit(this.toDo$);
        this.toDo$ = {
          _id: undefined,
          label: '',
          status: false,
          position: undefined
      };
  }


}
