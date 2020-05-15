export interface TodoItem {
  id: string;
  name: string;
  completed: boolean;
  editable: boolean;
}

export interface SortButton {
  id: string;
  name: string;
  selected: boolean;
}

export interface RootState {
  todoAllToggle: boolean;
  newTodo: string;
  beforeEditTodo: string;
  showTooltip: boolean;
  todoItems: TodoItem[];
  sortButtons: SortButton[];
  sortCategory: string;
}
