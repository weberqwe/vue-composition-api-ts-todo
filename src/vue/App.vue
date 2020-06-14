<template>
  <Wrapper :dark-mode="darkMode" @switch-mode="switchMode">
    <TodoApp :dark-mode="darkMode" />
  </Wrapper>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from '@vue/composition-api';
import Wrapper from './layouts/Wrapper.vue';
import TodoApp from './components/organisms/TodoApp.vue';

export default defineComponent({
  name: 'App',
  components: {
    Wrapper,
    TodoApp,
  },
  setup(props, { root }) {
    const darkMode = ref(false);
    const darkModeFlag = !!localStorage.getItem('darkMode');

    darkMode.value = darkModeFlag;

    watch(
      darkMode,
      (flag) => {
        // eslint-disable-next-line no-param-reassign
        root.$vuetify.theme.dark = flag;
        if (flag) {
          document.body.setAttribute('data-darkMode', '');
          localStorage.setItem('darkMode', 'on');
        } else {
          document.body.removeAttribute('data-darkMode');
          localStorage.removeItem('darkMode');
        }
      },
      { immediate: true },
    );

    function switchMode(): void {
      darkMode.value = !darkMode.value;
    }

    return { darkMode, switchMode };
  },
});
</script>
