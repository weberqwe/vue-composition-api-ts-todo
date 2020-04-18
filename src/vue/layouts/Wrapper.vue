<template>
  <v-app>
    <v-container :class="$style.container" fluid>
      <slot></slot>
    </v-container>

    <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }} Written by <a href="https://github.com/MrSung">@MrSung</a></span>
      <v-spacer></v-spacer>
      <v-switch v-model="darkModeSwitch" @change="switchMode"></v-switch>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';

export default defineComponent({
  props: {
    darkMode: {
      type: Boolean,
      required: true,
    },
  },
  setup({ darkMode }, { emit }) {
    const darkModeSwitch = ref(false);

    darkModeSwitch.value = darkMode; // Avoid props mutation

    function switchMode(): void {
      emit('switch-mode');
    }

    return { darkModeSwitch, switchMode };
  },
});
</script>

<style lang="scss" module>
.container {
  margin: 60px auto 120px;
  max-width: 550px;
  padding: 0;
}
</style>
