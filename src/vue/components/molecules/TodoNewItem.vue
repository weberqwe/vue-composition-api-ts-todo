<template>
  <div>
    <input
      type="text"
      :value="newTodo"
      placeholder="What needs to be done?"
      :class="$style.newTodo"
      @input="$emit('update:newTodo', $event.target.value)"
      @keyup.enter="addNewItem"
    />
    <div v-show="showTooltip" :class="$style.todoTooltipWrap">
      <span :class="[$style.todoTooltip, { [$style['todoTooltip--bright']]: !darkMode }]">Input is empty!</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  props: {
    newTodo: {
      type: String,
      required: true,
    },
    showTooltip: {
      type: Boolean,
      required: true,
    },
    darkMode: {
      type: Boolean,
      required: true,
    },
  },
  setup(props, { emit }) {
    function addNewItem(): void {
      emit('add-new-item');
    }
    return { addNewItem };
  },
});
</script>

<style lang="scss" module>
.newTodo {
  background-color: var(--color-todo-background);
  border: 1px solid var(--color-todo-border);
  font-size: 24px;
  line-height: 1.4em;
  padding: 16px 16px 16px 76px;
  position: relative;
  width: 100%;
}

.todoTooltipWrap {
  position: relative;
}

.todoTooltip {
  align-items: center;
  background-color: var(--color-todoTooltip);
  border-radius: 0.5em;
  display: flex;
  font-size: 0.9em;
  height: 36px;
  justify-content: center;
  left: 60px;
  padding: 0 0.8em;
  position: absolute;
  text-align: center;
  top: -0.5em;
  width: 120px;
  z-index: 1;

  &--bright {
    color: var(--color-todo-background);
  }

  &::before {
    border-color: transparent transparent var(--color-todoTooltip) transparent;
    border-style: solid;
    border-width: 0 5px 8px 5px;
    content: '';
    display: block;
    height: 0;
    position: absolute;
    top: -8px;
    width: 0;
  }
}
</style>
