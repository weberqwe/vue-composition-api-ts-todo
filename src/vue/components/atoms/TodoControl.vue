<template>
  <li :class="[$style.control, { [$style['control--selected']]: selected }, { [$style['control--last']]: isLast }]">
    <a :href="`#${linkName}`" @click.prevent="handleClick">
      {{ sortButtonName }}
    </a>
  </li>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  props: {
    selected: {
      type: Boolean,
      default: false,
    },
    isLast: {
      type: Boolean,
      default: false,
    },
    linkName: {
      type: String,
      default: '',
    },
    sortButtonName: {
      type: String,
      default: '',
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
.control {
  text-transform: capitalize;

  &--selected {
    position: relative;
  }

  &--selected::after {
    border-bottom: 1px solid var(--color-linkColor);
    bottom: 0;
    content: '';
    display: block;
    left: 0;
    position: absolute;
    right: 0;
  }

  &:not(:first-of-type) {
    margin-left: 0.5em;
  }
}
</style>
