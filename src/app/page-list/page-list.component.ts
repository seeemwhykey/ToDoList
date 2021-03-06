import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../_service/data.service';
import { EventPing } from '../_interface/eventping';
import { Subscription } from 'rxjs';
import { ToDo } from '../_interface/todo';
import { map, switchMap, catchError, mergeMap } from 'rxjs/operators';
import { DragulaService } from 'ng2-dragula';

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.sass']
})
export class PageListComponent implements OnInit {

  public ToDoShow: boolean;
  public ToDoDoneShow: boolean;
  public $todos: ToDo[];
  public $todosdone: ToDo[];
  public subs = new Subscription();

  constructor(
    public _dataService: DataService,
    public _dragulaService: DragulaService
  ) {
    this.ToDoShow = true;
    this.ToDoDoneShow = false;
    this.$todos = [];
    this.$todosdone = [];
    this.loadData();

    this._dragulaService.createGroup('todos', {
        removeOnSpill: false
    });

    this.subs.add(_dragulaService.drop('todos')
            .subscribe(({ el }) => {
                this.position();
            })
        );
  }

  ngOnInit() {
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  // Function um die Position der Objekte zu überschreiben
  public position(): void {
    console.log(`%cFUNC: position()`, `color: white; background-color:black;`);
    let position = 0;
        this.$todos.forEach((todo: ToDo) => {
            position += 1;
            todo.position = position;
            this._dataService.patchToDo(todo).subscribe((data) => {
              console.log(data);

              console.log(`%cSUC: ${data} wurde neu positioniert.`, `color: green; font-size: 12px;`);
            }, error => {
                console.log(`%cERROR: ${error.message}`, `color: red; font-size: 12px;`);
            });
        });
        this.$todosdone.forEach((tododone: ToDo) => {
          position += 1;
          tododone.position = position;
          this._dataService.patchToDo(tododone).subscribe((data: ToDo) => {
            console.log(`%cSUC: ${data.label} wurde neu positioniert.`, `color: green; font-size: 12px;`);
          }, error => {
              console.log(`%cERROR: ${error.message}`, `color: red; font-size: 12px;`);
          });
      });
}


  public loadData(): void {
      this.$todosdone = [];
      this.$todos = [];
      this._dataService.getToDo().subscribe((data: any) => {
        data.products.forEach((toDo: ToDo) => {
          if (toDo.checked === true) {
            this.$todosdone.push(toDo);
          } else {
            this.$todos.push(toDo);
          }
        });
        this.$todos.sort((obj1, obj2) => {
          return obj1.position - obj2.position;
        });
      }, error => {
          console.log(`%cERROR: ${error.message}`, `color: red; font-size: 12px;`);
      });
  }


  public create(event: ToDo): void {
    event.position = this.$todos.length + 1;
    this._dataService.postToDo(event).subscribe((data: ToDo) => {
        console.log(`%cSUC: "${data.label}" wurde erfolgreich erstellt. `, `color:green;`);
        this.$todos.push(data);
        this.position();
    }, error => {
      console.log(`%cERROR: ${error.message}`, `color: red; font-size: 12px;`);
    });
  }

  public update(event: EventPing): void {
    if ('check' === event.label) {
      console.log(`%c"${event.label}-Event" wurde getriggert. `, `color:green;`);
      if (!event.object.checked) {
          this.$todosdone.splice(this.$todosdone.indexOf(event.object), 1);
          this.$todos.push(event.object);

      } else {
        this.$todos.splice(this.$todos.indexOf(event.object), 1);
        this.$todosdone.push(event.object);
      }
      this.position();
    }

    if ('delete' === event.label) {
      console.log(`%c"${event.label}-Event" wurde getriggert. `, `color:green;`);
      if (event.object.checked) {
          this.$todosdone.splice(this.$todosdone.indexOf(event.object), 1);
      } else {
        this.$todos.splice(this.$todos.indexOf(event.object), 1);
      }
    }

    if ('label' === event.label) {
      console.log(`%c"${event.label}-Event" wurde getriggert. `, `color:green;`);
      if (event.object.checked) {
          this.$todosdone.forEach((toDo: ToDo) => {
            if (toDo._id === event.object._id) {
              toDo.label = event.object.label;
            }
          });
      } else {
        this.$todosdone.forEach((toDo: ToDo) => {
            if (toDo._id === event.object._id) {
              toDo.label = event.object.label;
            }
        });
      }
    }
    console.log(this.$todos);
    console.log(this.$todosdone);
  }
}
