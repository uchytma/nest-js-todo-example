import type { Guid } from '../utils/commonTypes';
import { IsNotEmpty } from 'class-validator';

export class CreateTodoDto {
  @IsNotEmpty()
  name: string;
}

export class TodoDto {
  id: Guid;
  name: string;
  completed: boolean;
  deleted: boolean;
}

export class UpdateTodoDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  completed: boolean;
}
