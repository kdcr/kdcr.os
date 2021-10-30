<template>
  <div class="desktopContainer" :style="bgStyle" >
    <TopBar />
    <Workspace/>
    <SearchBar v-if="showSearchBar" :hideSearchBar="hideSearchBar" />
  </div>
</template>

<script>
import TopBar from './TopBar.vue';
import Workspace from './Workspace.vue';
import SearchBar from '../atomic/widgets/SearchBar.vue';

export default {
  name: 'Desktop',
  props: {
  },
  data() {
    return {
      showSearchBar: false,
    };
  },
  computed: {
    bgStyle() {
      return `
        background-image: url(/${this.bgIndex}.png);
      `;
    },
    bgIndex() {
      return this.$store.getters.selectedBackground;
    },
  },
  components: {
    TopBar,
    Workspace,
    SearchBar,
  },
  mounted() {
    document.addEventListener('keypress', (e) => {
      if (e.ctrlKey && e.key === 'F') this.showSearchBar = true;
    });
  },
  methods: {
    hideSearchBar() {
      this.showSearchBar = false;
    },
  },
};
</script>

<style scoped>
.desktopContainer{
  background-repeat: no-repeat;
  background-size: cover;

  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
}
</style>
