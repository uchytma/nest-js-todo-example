import type { Guid } from '../../utils/commonTypes';

export class Todo {
  id: Guid;
  name: string;
  completed: boolean;
  deleted: boolean;
}

export class UpdateTodo {
  id: Guid;
  name: string;
  completed: boolean;
}
