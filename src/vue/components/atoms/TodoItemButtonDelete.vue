<template>
  <button type="button" :class="[$style.todoDelete, { [$style['todoDelete--dark']]: darkMode }]" @click="handleClick">
    <svg :class="$style.iconClose" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"
      />
    </svg>
  </button>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  props: {
    darkMode: {
      type: Boolean,
      required: true,
    },
  },
  setup(props, { emit }) {
    function handleClick(): void {
      emit('handle-click');
    }
    return { handleClick };
  },
});
</script>

<style lang="scss" module>
.todoDelete {
  align-items: center;
  bottom: 0;
  color: var(--color-todoTooltip);
  display: flex;
  font-size: 30px;
  height: 40px;
  justify-content: center;
  margin: auto 0;
  position: absolute;
  right: 10px;
  top: 0;
  width: 40px;

  &--dark {
    color: var(--color-todoDelete);
  }

  & > svg {
    height: 24px;
    width: 24px;
  }
}

.iconClose {
  height: 24px;
  width: 24px;
}
</style>
