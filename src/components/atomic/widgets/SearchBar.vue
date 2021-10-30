<template>
  <div class="container">
    <div class="searchBarContainer"
      v-bind:class="{searchBarContainerActive : results.length > 0}"
    >
      <input v-model="searchValue"
      v-on:keyup="onInput"
      v-on:keyup.esc="hideSearchBar"
      ref="searchInput"
      type="text" class="searchInput">
      <MagnifyingGlass class="searchImage"/>
    </div>
    <div v-if="results.length > 0" class="resultsContainer">
      <span class="resultsItem"
        v-for="(result, index) in results"
        v-bind:class="{resultsItemActive : index === selected}"
        v-bind:key="result.name"
        v-on:click="openApp(index)"
      >{{result.title}}</span>
    </div>
  </div>
</template>

<script>
import MagnifyingGlass from '../../../assets/icons/MagnifyingGlass.svg';

export default {
  data() {
    return {
      searchValue: '',
      results: [],
      selected: 0,
    };
  },
  mounted() {
    this.$refs.searchInput.focus();
    this.$store.commit('focusedWindow', 1);
  },
  components: {
    MagnifyingGlass,
  },
  props: {
    hideSearchBar: Function,
  },
  methods: {
    onInput(e) {
      switch (e.key) {
        case 'Enter':
          this.openApp();
          break;
        case 'ArrowUp':
          if (this.selected > 0) this.selected -= 1;
          break;
        case 'ArrowDown':
          if (this.selected < this.results.length - 1) this.selected += 1;
          break;

        default:
          if (this.searchValue?.length > 0) {
            const foundApps = this.$store.getters.apps.filter(
              (app) => (app.title.toLowerCase().includes(this.searchValue.toLowerCase())
              && app.hidden === false),
            );
            this.results = [...foundApps];
          } else {
            this.results = [];
          }
          break;
      }
    },
    setSelectedOption(index) {
      this.selected = index;
    },
    openApp(index) {
      if (this.searchValue?.length === 0) return;
      this.selected = index || this.selected;
      this.$store.commit('openWindow', {
        id: this.results[this.selected].id,
        forceFocus: true,
      });
      this.hideSearchBar();
    },
  },
};
</script>

<style scoped lang="less">
.container {
  position: absolute;
  width: 30%;
  height: 0;
  top: 50%;
  left: 50% - 15%;
  z-index: 10;
}

.searchBarContainer {
  display: flex;
  align-items: center;
  justify-content: space-between;

  background-color: var(--background);
  height: 2em;
  width: 100%;
  border: 1px solid var(--accent);
  box-shadow: 1px 1px 5px var(--foreground);
  border-radius: 10px;

  & > .searchInput {
    height: 2em;
    width: 100%;
    background-color: var(--background);
    border-radius: 10px;

    border: 0;
    outline: 0;
    text-decoration: none;
  }

  & > .searchImage {
    width: 16px;
    height: 16px;
    margin-right: 0.5em;
    margin-left: 0.5em;
  }
}

.searchBarContainerActive {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.resultsContainer {
  position: relative;
  display: flex;
  flex-direction: column;
  top: 0;
  background-color: var(--background);
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  border: 1px solid var(--accent);
  width: 100%;
  height: 5em;

  & > * {
    cursor: pointer;
  }
}

.resultsItem {
  background-color: var(--background);
}

.resultsItemActive {
  background-color: var(--accent);
}
</style>
