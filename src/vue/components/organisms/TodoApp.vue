<template>
  <div>
    <TodoHeader header-title="todos" :todo-all-toggle.sync="todoAllToggle" />
    <TodoNewItem
      :new-todo.sync="newTodo"
      :show-tooltip="showTooltip"
      :dark-mode="darkMode"
      @add-new-item="addNewItem"
    />
    <ul :class="$style.todoList">
      <TodoItem
        v-for="item in todoItemsToShow"
        :key="item.id"
        :editable="item.editable"
        :checked="item.completed"
        :dark-mode="darkMode"
        :label-text="item.name"
        :item-editable="item.editable"
        :item-name.sync="item.name"
        @handle-label-change="checkItem(item.id)"
        @handle-label-db-click="editTodoItem(item.id)"
        @handle-close-button-click="deleteItem(item.id)"
        @handle-input-blur="finishEditTodoItem"
        @handle-input-keyup-enter="finishEditTodoItem"
        @handle-input-keyup-esc="cancelEditTodoItem(item.id)"
      />
      <TodoControls
        :number-of-items-left="numberOfItemsLeft"
        :sort-buttons="sortButtons"
        @handle-sort-click="sortItems"
        @handle-clear-click="clearCompleted"
      />
    </ul>
  </div>
</template>

<script lang="ts">
import { nanoid } from 'nanoid';
import { defineComponent, ref, computed, watch, onBeforeMount } from '@vue/composition-api';
import TodoHeader from '../molecules/TodoHeader.vue';
import TodoNewItem from '../molecules/TodoNewItem.vue';
import TodoItem from '../molecules/TodoItem.vue';
import TodoControls from '../molecules/TodoControls.vue';

const localStorageName = 'todoItems';

export default defineComponent({
  components: {
    TodoHeader,
    TodoNewItem,
    TodoItem,
    TodoControls,
  },
  props: {
    darkMode: {
      type: Boolean,
      required: true,
    },
  },
  setup() {
    /**
     * Reactive data
     */
    const todoAllToggle = ref(false);
    const newTodo = ref('');
    const beforeEditTodo = ref('');
    const showTooltip = ref(false);
    const todoItems = ref<Array<{ id: string; name: string; completed: boolean; editable: boolean }>>([]);
    const sortButtons = ref([
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
    ]);
    const sortCategory = ref('all');
    /**
     * Computed properties
     */
    const todoItemsToShow = computed(() => {
      const isActive = sortCategory.value === 'active';
      const isCompleted = sortCategory.value === 'completed';
      if (!(isActive || isCompleted)) return todoItems.value;
      return todoItems.value.filter((item) => (isActive ? !item.completed : item.completed));
    });
    const numberOfItemsLeft = computed(() => {
      return todoItems.value.filter((item) => !item.completed).length;
    });
    /**
     * Watch
     * MEMO: Composition APIのwatchがOptions APIのそれとは異なり、デフォルトの状態では最初に一回実行されるため`lazy: true`を指定
     */
    watch(todoAllToggle, (isChecked) => {
      todoItems.value = todoItems.value.map((item) => ({ ...item, completed: isChecked }), { lazy: true });
    });
    watch(
      todoItems,
      (items) => {
        localStorage.setItem(localStorageName, JSON.stringify([...items]));
      },
      { lazy: true, deep: true },
    );
    /**
     * On before mount (It also works with onMounted)
     */
    onBeforeMount(() => {
      const localStorageValue = localStorage.getItem(localStorageName);
      const itemsToSet = localStorageValue ? JSON.parse(localStorageValue) : [];
      todoItems.value = itemsToSet;
    });
    /**
     * Methods
     */
    function addNewItem(): void {
      if (newTodo.value === '') {
        showTooltip.value = true;
        setTimeout(() => {
          showTooltip.value = false;
        }, 1000);
        return;
      }
      todoItems.value.push({
        id: `todoItem_${nanoid()}`,
        name: newTodo.value,
        completed: false,
        editable: false,
      });
      newTodo.value = '';
    }
    function checkItem(itemId: string): void {
      const matchedTodoItem = todoItems.value.find((item) => item.id === itemId);
      if (!matchedTodoItem) return;
      matchedTodoItem.completed = !matchedTodoItem.completed;
    }
    function finishEditTodoItem(): void {
      todoItems.value = todoItems.value.map((item) => ({ ...item, editable: false }));
      const emptyTodoItem = todoItems.value.find((item) => item.name === '');
      if (emptyTodoItem) {
        todoItems.value = todoItems.value.filter((item) => item.id !== emptyTodoItem.id);
      }
    }
    function editTodoItem(itemId: string): void {
      finishEditTodoItem();
      const matchedEditTodoItem = todoItems.value.find((item) => item.id === itemId);
      if (!matchedEditTodoItem) return;
      matchedEditTodoItem.editable = !matchedEditTodoItem.editable;
      beforeEditTodo.value = matchedEditTodoItem.name;
    }
    function cancelEditTodoItem(itemId: string): void {
      const matchedEditTodoItem = todoItems.value.find((item) => item.id === itemId);
      if (!matchedEditTodoItem) return;
      matchedEditTodoItem.name = beforeEditTodo.value;
      finishEditTodoItem();
    }
    function deleteItem(itemId: string): void {
      todoItems.value = todoItems.value.filter((item) => item.id !== itemId);
    }
    function sortItems(itemId: string): void {
      sortButtons.value = sortButtons.value.map((sortButton) => ({ ...sortButton, selected: false }));
      const matchedSortButton = sortButtons.value.find((item) => item.id === itemId);
      if (matchedSortButton) {
        matchedSortButton.selected = !matchedSortButton.selected;
        sortCategory.value = matchedSortButton.name;
      }
    }
    function clearCompleted(): void {
      todoItems.value = todoItems.value.filter((item) => !item.completed);
    }
    /**
     * Return
     */
    return {
      // Reactive data
      todoAllToggle,
      newTodo,
      showTooltip,
      todoItems,
      sortButtons,
      sortCategory,
      // Computed properties
      todoItemsToShow,
      numberOfItemsLeft,
      // Methods
      addNewItem,
      checkItem,
      editTodoItem,
      cancelEditTodoItem,
      deleteItem,
      finishEditTodoItem,
      sortItems,
      clearCompleted,
    };
  },
});
</script>

<style lang="scss" module>
.todoList {
  list-style: none;
  margin: 0;
  padding-left: 0 !important;
}
</style>
