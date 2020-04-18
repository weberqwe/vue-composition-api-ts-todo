<template>
  <header>
    <h1 :class="$style.todoHeading">{{ headerTitle }}</h1>
    <div :class="$style.todoAllWrap">
      <label for="todoAllToggleCheckbox" :class="$style.labelTodoAllToggle"></label>
      <input
        id="todoAllToggleCheckbox"
        type="checkbox"
        :checked="todoAllToggle"
        :class="$style.todoAllToggle"
        @change="$emit('update:todoAllToggle', $event.target.checked)"
      />
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  props: {
    headerTitle: {
      type: String,
      required: true,
    },
    todoAllToggle: {
      type: Boolean,
      required: true,
    },
  },
});
</script>

<style lang="scss" module>
.todoHeading {
  font-size: 64px;
  font-weight: 300;
  text-align: center;
}

.todoAllWrap {
  position: relative;
}

.labelTodoAllToggle {
  align-items: center;
  cursor: pointer;
  display: flex;
  font-size: 0;
  height: 44px;
  justify-content: center;
  left: 6px;
  position: absolute;
  top: 12px;
  transform: rotate(90deg);
  width: 66px;
  z-index: 1;

  &::before {
    color: var(--color-text);
    content: '❯';
    font-size: 22px;
  }
}

.todoAllToggle {
  display: none;
}
</style>
