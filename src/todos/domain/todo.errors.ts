export class TodoNotFoundError extends Error {
  constructor() {
    super('Todo item not found.');
  }
}
