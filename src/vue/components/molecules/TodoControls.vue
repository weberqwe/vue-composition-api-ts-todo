<template>
  <li :class="$style.controlsWrap">
    <span>{{ numberOfItemsLeft }} items left</span>
    <div :class="$style.controls">
      <ul :class="$style.controlList">
        <TodoControl
          v-for="sortButton in sortButtons"
          :key="sortButton.id"
          :selected="sortButton.selected"
          :link-name="sortButton.name"
          :sort-button-name="sortButton.name"
          @handle-click="handleSortClick(sortButton.id)"
        />
      </ul>
      <ul :class="$style.controlList">
        <TodoControl is-last sort-button-name="Clear completed" @handle-click="handleClearClick" />
      </ul>
    </div>
  </li>
</template>

<script lang="ts">
import { PropType } from 'vue';
import { defineComponent } from '@vue/composition-api';
import TodoControl from '../atoms/TodoControl.vue';

interface SortButton {
  id: string;
  name: string;
  selected: boolean;
}

export default defineComponent({
  components: {
    TodoControl,
  },
  props: {
    numberOfItemsLeft: {
      type: Number,
      required: true,
    },
    sortButtons: {
      type: Array as () => PropType<SortButton[]>,
      required: true,
    },
  },
  setup(props, { emit }) {
    function handleSortClick(itemId: string): void {
      emit('handle-sort-click', itemId);
    }
    function handleClearClick(): void {
      emit('handle-clear-click');
    }
    return {
      handleSortClick,
      handleClearClick,
    };
  },
});
</script>

<style lang="scss" module>
.controlsWrap {
  background-color: var(--color-todo-background);
  border-top: 1px solid var(--color-todo-boxShadow-light);
  box-shadow: 0 1px 1px var(--color-todo-boxShadow-lighter);
  display: flex;
  font-size: 14px;
  padding: 16px;
  position: relative;
}

.controls {
  display: flex;
  flex-grow: 1;
}

.controlList {
  display: inline-flex;
  justify-content: center;
  list-style: none;
  padding-left: 0;

  &:first-of-type {
    flex-grow: 1;
  }

  &:not(:first-of-type) {
    margin-left: auto;
  }
}
</style>
