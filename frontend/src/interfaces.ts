export interface Todo {
  _id: string;
  title: string;
  description?: string;
  completed: boolean;
}

export interface UpdateTodoResponse {
  message: string;
  todo: Todo;
}

export interface ErrorResponse {
  message: string;
  statusCode: number;
}

export interface TodosState {
  todos: Todo[];
  loading: boolean;
  error: ErrorResponse | null;
}

export interface TodoUpdateData {
  title?: string;
  completed?: boolean;
}
