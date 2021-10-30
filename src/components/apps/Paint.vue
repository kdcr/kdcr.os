<template>
  <div ref="container" class="paintContainer">
    <div class="toolRack">
      <div class="toolItem"
      v-for="(tool, index) in tools"
      v-bind:key="tool.name"
      v-on:click="selectTool(index)"
      v-bind:class="{toolSelected : index === selectedTool}"
      >
        <img v-bind:is="tool.icon">
      </div>
      <div class="colorTool"></div>
    </div>
    <div class="canvasContainer">
      <canvas ref="canvas" class="canvas"
      :style="canvasStyle"
      v-bind:height="canvasHeight"
      v-bind:width="canvasWidth"
      v-on:mousedown="handleMouseDown"
      v-on:mouseup="handleMouseUp"
      ></canvas>
    </div>
  </div>
</template>

<script>
import MagnifyingGlass from '../../assets/icons/MagnifyingGlass.svg';

const tools = [
  {
    name: 'Pencil',
    icon: MagnifyingGlass,
  },
  {
    name: 'Line',
    icon: MagnifyingGlass,
  },
  {
    name: 'Circle',
    icon: MagnifyingGlass,
  },
  {
    name: 'Bucket',
    icon: MagnifyingGlass,
  },
  {
    name: 'Erraser',
    icon: MagnifyingGlass,
  },
];

export default {
  name: 'Paint',
  props: {
    windowDimensions: Object,
  },
  data() {
    return {
      tools,
      selectedTool: 1,
      startPoint: { x: 0, y: 0 },
      canvasWidth: 350,
      canvasHeight: 350,
    };
  },
  methods: {
    selectTool(index) {
      this.selectedTool = index;
    },
    handleMouseDown(e) {
      const rect = this.$refs.canvas.getBoundingClientRect();
      switch (this.selectedTool) {
        case 1:
          this.startPoint.x = e.clientX - rect.left;
          this.startPoint.y = e.clientY - rect.top;
          break;

        default:
          break;
      }
    },
    handleMouseUp(e) {
      switch (this.selectedTool) {
        case 1:
          this.drawLine(e);
          break;

        default:
          break;
      }
    },
    drawLine(e) {
      const rect = this.$refs.canvas.getBoundingClientRect();
      const ctx = this.$refs.canvas.getContext('2d');
      ctx.beginPath();
      ctx.moveTo(this.startPoint.x, this.startPoint.y);
      ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
      ctx.stroke();
    },
  },
  computed: {
    canvasStyle() {
      return `
        --canvasWidth: ${this.canvasWidth}px;
        --canvasHeight: ${this.canvasHeight}px;
      `;
    },
  },
};
</script>

<style scoped lang="less">
.paintContainer {
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: row;
  background-color: var(--foreground-light);
}

.toolRack {
  width: 6em;

  display: grid;
  grid-template-columns: 3em 3em;
  align-content: flex-start;

  border-right: 1px solid var(--accent);
  background-color: var(--background);
}

.toolItem {
  cursor: pointer;

  &:hover {
    padding: 2px;
  }

  &:active {
    background-color: red;
  }

  &  > img {
    height: calc (3em - 2px);
    width: calc (3em - 2px);
  }
}

.toolSelected {
  padding: 1px;
  border: 1px solid var(--accent);
}

.colorTool {
  background-color: black;
  grid-column-start: 1;
  grid-column-end: 2;
  width: 6em;
  height: 6em;
}

.canvasContainer {
  overflow: auto;
  display: flex;
  width: 100%;
  height: 100%;
  justify-items: center;
  align-items: center;
}

.canvas {
  position: relative;
  left: calc(50% - var(--canvasWidth) / 2);
  cursor: crosshair;
  width: var(--canvasWidth);
  height: var(--canvasHeight);
  background-color: #fff;
}

</style>
