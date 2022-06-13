import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { Todo } from '../todo';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  public todos: Todo[] = [
    {
      _id: '507f191e810c19729de860ea',
      title: 'hardCodedTodo1',
      description: '',
      state: false,
    },
    {
      _id: '507f1f77bcf86cd799439011',
      title: 'hardCodedTodo2',
      description: 'description',
      state: true,
    },
  ];

  constructor(private router: Router, private todoService: TodoService) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      const state = navigation?.extras.state as { todo: Todo };
      const todo = state.todo;
      if (todo) {
        let index = this.todos.findIndex((t) => t._id == todo['_id']);
        this.todos[index] = todo;
      }
    }
  }

  ngOnInit(): void {
    this.todoService.findAll().subscribe((todos) => this.todos.push(...todos));
  }

  details(todo: Todo) {
    this.router.navigate([`todo/${todo._id}`], { queryParams: todo });
  }

  edit(todo: Todo) {
    const navigationExtras: NavigationExtras = { state: { todo: todo } };
    this.router.navigate([`todo-edit/${todo._id}`], navigationExtras);
  }

  add() {
    const newTodo = { title: 'newTodo', description: '', state: false };
    this.todos.splice(0, 0, newTodo);
    this.todoService.create(newTodo).subscribe((todo) => {
      this.router.navigate([`todo-edit/${todo._id}`], { queryParams: todo });
    });
  }

  delete(id: string = '') {
    const index = this.todos.findIndex((todo) => todo._id == id);
    this.todos.splice(index, 1);
    this.todoService.delete(id).subscribe((todo) => console.log(todo));
  }

  check(todo: any) {
    todo.state = !todo.state;
    this.todoService.update(todo._id, todo).subscribe();
    this.todos.push(this.todos.splice(this.todos.indexOf(todo), 1)[0]);
  }
}
