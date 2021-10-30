<template>
  <div class="workspace">
    <Window v-for="app in apps"
      :windowTitle="app.title"
      :isFocused="focusedWindow === app.id"
      :appId="app.id"
      :openApplication="app.component"
      v-bind:key="app.id"
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
  props: { },
  data() {
    return {
    };
  },
  computed: {
    apps() {
      return this.$store.getters.apps.filter(
        (app) => app.open === true,
      );
    },
    focusedWindow() {
      return this.$store.getters.focusedWindow;
    },
  },
  methods: {
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
