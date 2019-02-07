import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToDo } from '../../_interface/todo';
import { EventPing } from 'src/app/_interface/eventping';
import { DataService } from '../../_service/data.service';

@Component({
  selector: 'app-template-todo',
  templateUrl: './template-todo.component.html',
  styleUrls: ['./template-todo.component.sass']
})
export class TemplateTodoComponent implements OnInit {

    @Input() toDo$: ToDo;
    @Output() ping: EventEmitter<any> = new EventEmitter<any>();

    constructor(
      public _dataService: DataService
    ) {}

    ngOnInit() {}

    // Checkbox
    public changeCheck(event?: any): void {
        this.toDo$.checked = !this.toDo$.checked;
        this._dataService.patchToDo(this.toDo$).subscribe((data: ToDo) => {
          const eventObject: EventPing = {
            label: 'check',
            object: this.toDo$
          };
          this.ping.emit(eventObject);
      }, error => {
          console.log(`%cERROR: ${error.message}`, `color: red; font-size: 12px;`);
      });
    }

     // Function to update the Label/description
     public changeLabel(event?: any): void {
      this._dataService.patchToDo(this.toDo$).subscribe((data: ToDo) => {
        const eventObject: EventPing = {
          label: 'label',
          object: this.toDo$
        };
        this.ping.emit(eventObject);
        }, error => {
            console.log(`%cERROR: ${error.message}`, `color: red; font-size: 12px;`);
        });
    }

    public deleteToDo($event?: any): void {
      this._dataService.deleteToDo(this.toDo$).subscribe((data: ToDo) => {
          const eventObject: EventPing = {
            label: 'delete',
            object: this.toDo$
          };
          this.ping.emit(eventObject);
      }, error => {
          console.log(`%cERROR: ${error.message}`, `color: red; font-size: 12px;`);
      });
   }
}
