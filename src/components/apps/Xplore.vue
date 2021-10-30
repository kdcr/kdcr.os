<template>
  <div class="container">
    <iframe src="https://www.google.com/search?igu=1"></iframe>
  </div>
</template>

<script>

export default {
  name: 'Paint',
  data() {
    return {
    };
  },
};
</script>

<style scoped lang=less>
.container {
  width: 100%;
  height: calc(100% - 1.5rem);
  top: 1.5rem;
  left: 0;

  & > iframe {
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;
  }
}
</style>
