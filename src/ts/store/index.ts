import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { nanoid } from 'nanoid';
import { RootState, TodoItem } from './types';
import { mutations } from './mutations';
import { actions } from './actions';

Vue.use(Vuex);

// TODO: Integrate with vue components. But do we really need Vuex in the first place??
const store: StoreOptions<RootState> = {
  state: {
    todoAllToggle: false,
    newTodo: '',
    beforeEditTodo: '',
    showTooltip: false,
    todoItems: [],
    sortButtons: [
      {
        id: `sortButton_${nanoid()}`,
        name: 'all',
        selected: true,
      },
      {
        id: `sortButton_${nanoid()}`,
        name: 'active',
        selected: false,
      },
      {
        id: `sortButton_${nanoid()}`,
        name: 'completed',
        selected: false,
      },
    ],
    sortCategory: 'all',
  },
  getters: {
    todoItemsToShow({ sortCategory, todoItems }): TodoItem[] {
      const isActive = sortCategory === 'active';
      const isCompleted = sortCategory === 'completed';
      if (!(isActive || isCompleted)) return todoItems;
      return todoItems.filter((item) => (isActive ? !item.completed : item.completed));
    },
    numberOfItemsLeft({ todoItems }): number {
      return todoItems.filter((item) => !item.completed).length;
    },
  },
  mutations,
  actions,
};

export default new Vuex.Store<RootState>(store);
