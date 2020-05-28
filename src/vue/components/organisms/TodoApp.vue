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
import { defineComponent } from '@vue/composition-api';
import TodoHeader from '../molecules/TodoHeader.vue';
import TodoNewItem from '../molecules/TodoNewItem.vue';
import TodoItem from '../molecules/TodoItem.vue';
import TodoControls from '../molecules/TodoControls.vue';
import setupTodoApp from '../../../ts/functions/setupTodoApp';

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
  setup: setupTodoApp,
});
</script>

<style lang="scss" module>
.todoList {
  list-style: none;
  margin: 0;
  padding-left: 0 !important;
}
</style>
