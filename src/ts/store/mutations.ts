import { MutationTree } from 'vuex';
import { nanoid } from 'nanoid';
import { TodoItem, SortButton, RootState } from './types';

export const mutations: MutationTree<RootState> = {
  setTodoAllToggle(state, todoAllToggle) {
    state.todoAllToggle = todoAllToggle;
  },
  setNewTodo(state, newTodo) {
    state.newTodo = newTodo;
  },
  addNewItem(state, newTodo): void {
    if (newTodo === '') {
      state.showTooltip = true;
      setTimeout(() => {
        state.showTooltip = false;
      }, 1000);
      return;
    }
    state.todoItems.push({
      id: `todoItem_${nanoid()}`,
      name: newTodo,
      completed: false,
      editable: false,
    });
    state.newTodo = '';
  },
  checkItem(state, itemId): void {
    const matchedTodoItem = state.todoItems.find((item: TodoItem) => item.id === itemId);
    if (!matchedTodoItem) return;
    matchedTodoItem.completed = !matchedTodoItem.completed;
  },
  // TODO: Use separate function
  finishEditTodoItem(state): void {
    state.todoItems = state.todoItems.map((item: TodoItem) => ({ ...item, editable: false }));
    const emptyTodoItem = state.todoItems.find((item: { name: string }) => item.name === '');
    if (emptyTodoItem) {
      state.todoItems = state.todoItems.filter((item: TodoItem) => item.id !== emptyTodoItem.id);
    }
  },
  editTodoItem(state, itemId): void {
    // TODO: START - Use separate function
    state.todoItems = state.todoItems.map((item: TodoItem) => ({
      ...item,
      editable: false,
    }));
    const emptyTodoItem = state.todoItems.find((item: { name: string }) => item.name === '');
    if (emptyTodoItem) {
      state.todoItems = state.todoItems.filter((item: TodoItem) => item.id !== emptyTodoItem.id);
    }
    // TODO: END - Use separate function
    const matchedEditTodoItem = state.todoItems.find((item: TodoItem) => item.id === itemId);
    if (!matchedEditTodoItem) return;
    matchedEditTodoItem.editable = !matchedEditTodoItem.editable;
    state.beforeEditTodo = matchedEditTodoItem.name;
  },
  cancelEditTodoItem(state, itemId): void {
    const matchedEditTodoItem = state.todoItems.find((item: TodoItem) => item.id === itemId);
    if (!matchedEditTodoItem) return;
    matchedEditTodoItem.name = state.beforeEditTodo;
    // TODO: START - Use separate function
    state.todoItems = state.todoItems.map((item: TodoItem) => ({
      ...item,
      editable: false,
    }));
    const emptyTodoItem = state.todoItems.find((item: { name: string }) => item.name === '');
    if (emptyTodoItem) {
      state.todoItems = state.todoItems.filter((item: TodoItem) => item.id !== emptyTodoItem.id);
    }
    // TODO: END - Use separate function
  },
  deleteItem(state, itemId): void {
    state.todoItems = state.todoItems.filter((item: TodoItem) => item.id !== itemId);
  },
  sortItems(state, sortButtonId: string): void {
    state.sortButtons = state.sortButtons.map((sortButton: SortButton) => ({ ...sortButton, selected: false }));
    const matchedSortButton = state.sortButtons.find((sortButton: SortButton) => sortButton.id === sortButtonId);
    if (matchedSortButton) {
      matchedSortButton.selected = !matchedSortButton.selected;
      state.sortCategory = matchedSortButton.name;
    }
  },
  clearCompleted(state): void {
    state.todoItems = state.todoItems.filter((item: { completed: boolean }) => !item.completed);
  },
};
