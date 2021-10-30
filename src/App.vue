<template>
  <div id="app">
    <Desktop/>
  </div>
</template>

<script>
import Vue from 'vue';
import VueI18n from 'vue-i18n';
import Desktop from './components/layout/Desktop.vue';

Vue.use(VueI18n);
export default {
  name: 'App',
  mounted() {
    const savedBackground = localStorage.selectedBackground;
    if (savedBackground) {
      this.$store.commit('selectedBackground', savedBackground);
    }
  },
  components: {
    Desktop,
  },
};
</script>

<style>
body {
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  --background: #fff;
  --background-transparent: #ffffff44;
  --background-dark: #F4FFF8;
  --foreground: #2f2f2f;
  --foreground-light: #2f2f2f;
  --foreground-dark: #000F08;
  --accent: #d2f898;
  --accent-secondary: #50a2a7;
  --warning: #f37d4b;
  --error: #e04200;
  --success: var(--accent);

  background-color: var(--background);
  color: var(--foreground);

  overflow: hidden;

}

</style>
