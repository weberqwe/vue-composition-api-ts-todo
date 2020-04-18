<template>
  <div>
    <input type="checkbox" :class="$style.todoToggle" :checked="checked" @change="handleChange" />
    <div
      :class="[
        $style.todoLabel,
        { [$style['todoLabel--completed']]: checked },
        { [$style['todoLabel--dark']]: darkMode },
      ]"
      @dblclick.stop="handleDbClick"
    >
      {{ labelText }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  props: {
    checked: {
      type: Boolean,
      required: true,
    },
    darkMode: {
      type: Boolean,
      required: true,
    },
    labelText: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit }) {
    function handleChange(): void {
      emit('handle-change');
    }
    function handleDbClick(): void {
      emit('handle-db-click');
    }
    return {
      handleChange,
      handleDbClick,
    };
  },
});
</script>

<style lang="scss" module>
.todoToggle {
  appearance: none;
  border: none;
  bottom: 0;
  cursor: pointer;
  height: auto;
  margin: auto 0;
  position: absolute;
  text-align: center;
  top: 0;
  width: 46px;
}

.todoLabel {
  display: block;
  line-height: 1.2;
  min-height: 58px;
  padding: 15px 15px 15px 60px;
  word-break: break-all;

  &--completed {
    color: var(--color-todo-boxShadow-lighter);
    text-decoration: line-through;
  }

  .todoToggle + & {
    background-image: url('data:image/svg+xml;charset=utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23272727%22%20stroke-width%3D%223%22%2F%3E%3C%2Fsvg%3E');
    background-position: center left;
    background-repeat: no-repeat;
  }

  .todoToggle:checked + & {
    background-image: url('data:image/svg+xml;charset=utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23272727%22%20stroke-width%3D%223%22%2F%3E%3Cpath%20fill%3D%22%2301997d%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22%2F%3E%3C%2Fsvg%3E');
  }

  .todoToggle + &--dark {
    background-image: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23ededed%22%20stroke-width%3D%223%22/%3E%3C/svg%3E');
  }

  .todoToggle:checked + &--dark {
    background-image: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23bddad5%22%20stroke-width%3D%223%22/%3E%3Cpath%20fill%3D%22%235dc2af%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22/%3E%3C/svg%3E');
  }
}
</style>
