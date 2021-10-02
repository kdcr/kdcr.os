<template>
  <div class="topBarContainer">
    <DateWidget></DateWidget>
  </div>
</template>

<script>
import DateWidget from '../atomic/widgets/DateWidget.vue';

export default {
  components: { DateWidget },
  name: 'TopBar',
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.topBarContainer {
    width: 100%;
    height: 1.5rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    opacity: 80%;

    & > div {
      opacity: 100%;
    }
}
</style>
