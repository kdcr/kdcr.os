<template>
  <div class="desktopContainer">
    <TopBar/>
    <Workspace/>
  </div>
</template>

<script>
import TopBar from './TopBar.vue';
import Workspace from './Workspace.vue';

export default {
  name: 'Desktop',
  props: {
  },
  components: {
    TopBar,
    Workspace,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
