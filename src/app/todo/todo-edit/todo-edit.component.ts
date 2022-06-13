import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Todo } from '../todo';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-edit',
  templateUrl: './todo-edit.component.html',
  styleUrls: ['./todo-edit.component.css'],
})
export class TodoEditComponent implements OnInit {
  public form: FormGroup = this.formBuilder.group({
    title: ['', [Validators.required, Validators.minLength(4)]],
    description: [''],
    state: [Validators.required],
  });

  public todo: Todo = {
    _id: '',
    title: '',
    state: false,
  };

  submitted = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private todoService: TodoService,
    private formBuilder: FormBuilder
  ) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { todo: Todo };
    this.todo = state.todo;
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.todoService.findOne(id).subscribe((todo) => {
      this.todo = todo;
    });
  }

  get f() {
    return this.form.controls;
  }

  async onSubmit(todo: Todo) {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    const id = this.route.snapshot.params['id'];
    this.todoService.update(id, todo).subscribe({
      next: () => this.router.navigateByUrl('todo-list'),
      error: (err) => {
        const navigationExtras: NavigationExtras = { state: { todo: this.todo } };
        this.router.navigate(['todo-list'], navigationExtras);
      },
      complete: () => console.info('complete'),
    });

    // this.todoService.update(id, todo).subscribe(() => {
    //     this.router.navigateByUrl('todo-list');
    // }, (err) => {
    //   const navigationExtras: NavigationExtras = { state: { todo: todo } };
    //   this.router.navigate(['todo-list'], navigationExtras);
    // });
  }

  onReset() {
    this.submitted = false;
    this.form.reset();
    this.router.navigateByUrl('todo-list');
  }
}
