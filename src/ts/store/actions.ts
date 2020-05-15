import { ActionTree } from 'vuex';
import { RootState } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const actions: ActionTree<RootState, any> = {
  setTodoAllToggle({ commit }, todoAllToggle: boolean) {
    commit('setTodoAllToggle', todoAllToggle);
  },
  setNewTodo({ commit }, newTodo: string) {
    commit('setNewTodo', newTodo);
  },
  addNewItem({ commit }, newTodo: string) {
    commit('addNewItem', newTodo);
  },
  checkItem({ commit }, itemId: string) {
    commit('checkItem', itemId);
  },
  finishEditTodoItem({ commit }) {
    commit('finishEditTodoItem');
  },
  editTodoItem({ commit }, itemId: string) {
    commit('editTodoItem', itemId);
  },
  cancelEditTodoItem({ commit }, itemId: string) {
    commit('cancelEditTodoItem', itemId);
  },
  deleteItem({ commit }, itemId: string) {
    commit('deleteItem', itemId);
  },
  sortItems({ commit }, sortButtonId: string) {
    commit('sortItems', sortButtonId);
  },
  clearCompleted({ commit }) {
    commit('clearCompleted');
  },
};
