<template>
  <div class="workspace">
    <Window
      :windowName="'kdcr.os'"
      :isFocused="focusedWindow === 1"
      :handleFocus="handleFocus"
      :windowId="1"
    >
    </Window>
    <Window
      :windowName="'Minesweeper'"
      :isFocused="focusedWindow === 2"
      :handleFocus="handleFocus"
      :windowId="2"
    >
    </Window>
  </div>
</template>

<script>
import Window from './Window.vue';

export default {
  name: 'Workspace',
  components: {
    Window,
  },
  data() {
    return {
      focusedWindow: 1,
    };
  },
  methods: {
    handleFocus(value) {
      this.focusedWindow = value;
    },
  },
};
</script>

<style scoped>
.workspace {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
