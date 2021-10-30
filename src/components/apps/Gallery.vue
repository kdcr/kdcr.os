<template>
  <div class="container">
    <div class="setBgBtn" v-on:click="setDesktopBackground(selectedPhoto)"></div>
    <div class="photoView" @wheel="(e) => onWheel(e)">
      <img :src="'/' + selectedPhoto + '.png'" :style="photoStyle" />
    </div>
    <div class="photoCarrousel">
      <img
      v-for="photo in photos"
      v-bind:key="photo.index"
      :src="photo.image"
      v-on:click="onImageSelect(photo.index)"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Gallery',
  data() {
    return {
      imageWidth: 600,
      imageHeight: 400,
      selectedPhoto: 1,
    };
  },
  computed: {
    photoStyle() {
      return `
        --imageWidth: ${this.imageWidth}px;
        --imageHeight: ${this.imageHeight}px;
      `;
    },
    totalImages() {
      return this.$store.getters.numberOfImages;
    },
    photos() {
      const totalPhotos = this.$store.getters.numberOfImages;
      const result = [];
      for (let index = 1; index <= totalPhotos; index += 1) {
        result.push({
          index,
          image: `/${index}.png`,
        });
      }

      return result;
    },
  },
  methods: {
    onWheel(e) {
      if (e.ctrlKey) {
        e.preventDefault();
        const newWidth = this.imageWidth + 5 * -e.deltaY;
        if (newWidth < 300) {
          this.imageWidth = 300;
        } else if (newWidth < 3000) {
          this.imageWidth = newWidth;
        }
      }
    },
    onImageSelect(index) {
      this.selectedPhoto = index;
    },
    setDesktopBackground(index) {
      this.$store.commit('selectedBackground', index);
    },
  },
};
</script>

<style scoped lang=less>
.container {
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
}

.photoView {
  height: calc(100% - 8em);
  width: 100%;
  position: relative;

  overflow: auto;

  & > img {
    width: var(--imageWidth);
  }
}

.photoCarrousel {
  display: flex;
  height: 8em;
  flex-direction: row;
  overflow-x: scroll;
  z-index: 5;

  box-shadow: 0px 0px 10px var(--accent);
  background-color: var(--background);

  & > img {
    padding: 1em;
    cursor: pointer;
  }
}

.setBgBtn {
  position: absolute;
  left: 50%;
  bottom: calc(8em - 2px);
  height: 1em;
  width: 3em;
  background-color: var(--background);
  z-index: 6;
  border-top-left-radius: 1em;
  border-top-right-radius: 1em;
  cursor: pointer;
  box-shadow: 0px -5px 10px var(--accent);
  transition: all 200ms;

  &:hover {
    height: 2em;
  }
}
</style>
