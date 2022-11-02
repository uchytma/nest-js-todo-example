import { Injectable } from '@nestjs/common';
import { Todo, UpdateTodo } from './todo.models';
import { v4 as uuidv4 } from 'uuid';
import type { Guid } from '../../utils/commonTypes';
import { TodoNotFoundError } from './todo.errors';

@Injectable()
export class TodoService {
  private todos: Todo[] = [];

  createTodo(name: string): Todo {
    const todo: Todo = { id: uuidv4(), name: name, completed: false, deleted: false };
    this.todos.push(todo);
    return { ...todo };
  }

  /**
   * @throws {TodoNotFoundError}
   */
  deleteTodo(id: Guid): void {
    const todo = this.findTodoOrThrowError(id);
    todo.deleted = true;
  }

  /**
   * @throws {TodoNotFoundError}
   */
  updateTodo(model: UpdateTodo): Todo {
    const todo = this.findTodoOrThrowError(model.id);
    todo.name = model.name;
    todo.completed = model.completed;
    return { ...todo };
  }

  /**
   * @throws {TodoNotFoundError}
   */
  getTodoById(id: Guid, includeDeleted = false): Todo {
    const todo = this.findTodoOrThrowError(id, includeDeleted);
    return { ...todo };
  }

  getTodoList(includeDeleted = false, filterCompleted: boolean | null, filterSearchByName: string | null): Todo[] {
    const filterQueryIncludeDeleted: (todo: Todo) => boolean = (d) => includeDeleted || !d.deleted;
    const filterQueryCompleted: (todo: Todo) => boolean = (d) =>
      filterCompleted == null ? true : d.completed === filterCompleted;
    const filterQuerySearchByName: (todo: Todo) => boolean = (d) =>
      filterSearchByName == null ? true : d.name.toLocaleLowerCase().includes(filterSearchByName.toLocaleLowerCase());

    return this.todos.filter(
      (d) => filterQueryIncludeDeleted(d) && filterQueryCompleted(d) && filterQuerySearchByName(d),
    );
  }

  private findTodoOrThrowError(id: Guid, includeDeleted = false): Todo {
    const todo = this.todos.find((d) => d.id === id);
    if (todo == null) throw new TodoNotFoundError();
    if (!includeDeleted && todo.deleted) throw new TodoNotFoundError();
    return todo;
  }
}
