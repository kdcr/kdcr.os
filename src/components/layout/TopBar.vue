<template>
  <div class="topBarContainer">
    <span class="focusedWindowTitle">{{focusedWindowTitle}}</span>
    <DateWidget></DateWidget>
  </div>
</template>

<script>
import DateWidget from '../atomic/widgets/DateWidget.vue';

export default {
  name: 'TopBar',
  components: { DateWidget },
  props: {},
  computed: {
    focusedWindowTitle() { return this.$store.getters.focusedWindowTitle; },
  },
};
</script>

<style scoped lang="less">
.topBarContainer {
    width: 100%;
    height: 25px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    align-items: center;
    justify-content: center;
    background: linear-gradient(var(--background), var(--background-transparent));
}
</style>
