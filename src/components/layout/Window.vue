<template>
  <div
  v-on:mousedown="handleFocus(windowId)"
  class="windowContainer"
  :style="containerStyle"
  ref="window">
    <div class="windowHeader"
      v-on:dblclick="!isWindowMaximized ? maximizeWindow(true) : null"
      @mousedown="setDragging(true)"
      @mouseup="setDragging(false)"
    >
      <div class="actionsContainer">
        <div></div>
        <div></div>
        <div v-on:click="maximizeWindow"></div>
      </div>
      <span class="windowTitle">{{windowName}}</span>
    </div>
    <div class="windowBody">
    </div>
  </div>
</template>

<script>
export default {
  components: { },
  name: 'Window',
  created() {
    document.addEventListener('mousemove', (e) => {
      this.handleDrag(e.movementX, e.movementY, e.buttons, { x: e.clientX, y: e.clientY });
    });
  },
  props: {
    windowName: String,
    isFocused: Boolean,
    handleFocus: Function,
    windowId: Number,
    parentRef: Object,
  },
  data() {
    return {
      dragging: false,
      posY: 0,
      posX: 0,
      windowWidth: '600px',
      windowHeight: '400px',
      defaultWindowWidth: 600,
      defaultWindowHeight: 400,
      isWindowMaximized: false,
    };
  },
  computed: {
    containerStyle() {
      return `
        --posY: ${this.posY}px;
        --posX: ${this.posX}px;
        --windowWidth: ${this.windowWidth};
        --windowHeight: ${this.windowHeight};
        --z-index: ${this.isFocused ? '5' : '1'};
      `;
    },
  },
  methods: {
    setDragging(value) {
      this.dragging = value;
    },
    handleDrag(movementX, movementY, buttons, mousePos) {
      if (buttons !== 1) this.dragging = false;
      if (this.dragging) {
        if (this.isWindowMaximized) {
          this.maximizeWindow();
          this.posX = mousePos.x - this.defaultWindowWidth / 2;
          this.posY = mousePos.y - 35;
        }

        if ((this.posY + movementY >= 0 || movementY > 0)
         && (this.posY + movementY + this.$refs.window.clientHeight
          <= window.innerHeight)) { this.posY += movementY; }

        if ((this.posX + movementX >= 0 || movementX > 0)
         && (this.posX + movementX + this.$refs.window.clientWidth
          <= window.innerWidth)) { this.posX += movementX; }
      }
    },
    handleMouseOut(buttons) {
      if (buttons !== 1) {
        this.setDragging(false);
      }
    },
    maximizeWindow() {
      if (this.isWindowMaximized) {
        this.windowWidth = `${this.defaultWindowWidth}px`;
        this.windowHeight = `${this.defaultWindowHeight}px`;
        this.posY = (window.innerHeight / 2) - (this.defaultWindowHeight / 2);
        this.posX = (window.innerWidth / 2) - (this.defaultWindowWidth / 2);
      } else {
        this.windowWidth = '100%';
        this.windowHeight = '100%';
        this.posY = 0;
        this.posX = 0;
      }
      this.isWindowMaximized = !this.isWindowMaximized;
    },
  },
};
</script>

<style scoped lang="less">
.windowContainer {
  position: absolute;
  border: 1px solid var(--accent-secondary);
  resize: both;
  overflow: auto;

  width: var(--windowWidth);
  height: var(--windowHeight);

  top: var(--posY);
  left: var(--posX);
  z-index: var(--z-index);

  background-color: var(--background);
  box-shadow: 1px 1px 5px var(--foreground-light);
}

.windowHeader {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-content: center;
  width: 100%;
  height: 1.5rem;
  border-bottom: 1px solid var(--accent-secondary);
  background-color: var(--background);
  color: var(--foreground);
  & > .actionsContainer {
    padding-left: 0.5em;
    display: flex;
    column-gap: 3px;
    align-items: center;

    & > div {
      height: 10px;
      width: 10px;
      border-radius: 100%;
    }

    & > div:nth-child(1) {
      background-color: var(--error);
    }

    & > div:nth-child(2) {
      background-color: var(--warning);
    }

    & > div:nth-child(3) {
      background-color: var(--success);
    }
  }

  & > .windowTitle {
    color: var(--foreground);
    text-align: center;
    cursor: default;
    user-select: none;
  }
}

.windowBody {
  width: 100%;
  height: 100%;
}
</style>
