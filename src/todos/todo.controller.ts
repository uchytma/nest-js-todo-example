import { Controller, Get, Post, Body, Put, Param, Delete, HttpException, HttpStatus, Query } from '@nestjs/common';
import { CreateTodoDto, TodoDto, UpdateTodoDto } from './todo.dtos';
import { TodoService } from './domain/todo.service';
import type { Guid } from '../utils/commonTypes';
import { TodoNotFoundError } from './domain/todo.errors';
import { transformToBoolean, transformToNullableBoolean, transformToNullableString } from '../utils/commonTransforms';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  create(@Body() model: CreateTodoDto): TodoDto {
    return this.todoService.createTodo(model.name);
  }

  @Put(':id')
  update(@Body() model: UpdateTodoDto, @Param('id') id: Guid): TodoDto {
    const todo = {
      id: id,
      name: model.name,
      completed: model.completed,
    };

    return this.processAndHandleDomainErrors(() => this.todoService.updateTodo(todo));
  }

  @Delete(':id')
  delete(@Param('id') id: Guid): void {
    this.processAndHandleDomainErrors(() => this.todoService.deleteTodo(id));
  }

  @Get(':id')
  get(@Param('id') id: Guid, @Query('includeDeleted') includeDeleted = false): TodoDto {
    const includeDeletedBool = transformToBoolean(includeDeleted);

    return this.processAndHandleDomainErrors(() => this.todoService.getTodoById(id, includeDeletedBool));
  }

  @Get()
  getList(
    @Query('includeDeleted') includeDeleted = false,
    @Query('filterCompleted') filterCompleted: boolean | null,
    @Query('filterSearchByName') filterSearchByName: string | null,
  ): TodoDto[] {
    const includeDeletedBool = transformToBoolean(includeDeleted);
    const filterCompletedBool = transformToNullableBoolean(filterCompleted);
    const filterSearchByNameString = transformToNullableString(filterSearchByName);

    return this.todoService.getTodoList(includeDeletedBool, filterCompletedBool, filterSearchByNameString);
  }

  private processAndHandleDomainErrors<T>(fn: () => T): T {
    try {
      return fn();
    } catch (e) {
      if (e instanceof TodoNotFoundError) {
        throw new HttpException('Todo not found.', HttpStatus.NOT_FOUND);
      } else {
        throw e;
      }
    }
  }
}
