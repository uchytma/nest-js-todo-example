import type { Guid } from '../utils/commonTypes';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { transformToNullableBoolean } from '../utils/commonTransforms';

export class CreateTodoDto {
  @IsNotEmpty()
  @IsString()
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
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsBoolean()
  @Transform(({ value }) => transformToNullableBoolean(value))
  completed: boolean;
}

export class GetTodoDto {
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => transformToNullableBoolean(value))
  includeDeleted = false;
}

export class GetListDto {
  @IsNotEmpty()
  @IsBoolean()
  @Transform(({ value }) => transformToNullableBoolean(value))
  includeDeleted = false;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => transformToNullableBoolean(value))
  filterCompleted: boolean | null;

  @IsOptional()
  @IsString()
  filterSearchByName: string | null;
}
