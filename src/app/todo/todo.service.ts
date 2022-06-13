import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from './todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(public http:HttpClient) { 

  }

  create(todo: Todo): Observable<Todo>{
    return this.http.post<Todo>(`http://localhost:3000/todo`, todo);
  }

  findAll(): Observable<Todo[]> {
    return this.http.get<Todo[]>("http://localhost:3000/todo");
  }

  findOne(id:string): Observable<Todo>{
    return this.http.get<Todo>(`http://localhost:3000/todo/${id}`);
  }

  update(id:string, todo:Todo): Observable<Todo> {
    return this.http.put<Todo>(`http://localhost:3000/todo/${id}`, todo);
  }

  delete(id:string) {
    return this.http.delete(`http://localhost:3000/todo/${id}`);
  }
}
