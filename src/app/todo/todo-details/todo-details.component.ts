import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Todo } from '../todo';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.css'],
})
export class TodoDetailsComponent implements OnInit {
  todo: Todo = {
    _id: '',
    title: '',
    state: false,
  };

  constructor(
    private route: ActivatedRoute,
    private todoService: TodoService
  ) {}

  ngOnInit(): void {
    this.todo = JSON.parse(JSON.stringify(this.route.snapshot.queryParams))
    // const id = this.route.snapshot.params['id'];
    // this.todoService.findOne(id).subscribe((todo) => {
    //   this.todo = todo;
    // });
  }
}
