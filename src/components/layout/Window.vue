<template>
  <div
  v-on:mousedown="handleFocus(appId)"
  class="windowContainer"
  :style="windowStyle"
  ref="window">
    <div class="windowHeader"
      v-on:dblclick="!isWindowMaximized ? maximizeWindow(true) : null"
      v-on:mousedown="setDragging(true)"
      v-on:mouseup="setDragging(false)"
    >
      <div class="actionsContainer">
        <div v-on:click="closeWindow"></div>
        <div></div>
        <div v-on:click="maximizeWindow"></div>
      </div>
      <span class="windowTitle">{{windowTitle}}</span>
    </div>
    <div class="windowBody">
      <component v-bind:is="openApplication"
      ></component>
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
    windowTitle: String,
    isFocused: Boolean,
    appId: Number,
    parentRef: Object,
    openApplication: Object,
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
    windowStyle() {
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

        if (movementY < 0) {
          if (this.posY <= 0) {
            this.posY = 0;
          } else {
            this.posY += movementY;
          }
        } else if (this.posY >= window.innerHeight - this.$refs.window.clientHeight - 26) {
          this.posY = window.innerHeight - this.$refs.window.clientHeight - 26;
        } else {
          this.posY += movementY;
        }

        if (movementX < 0) {
          if (this.posX <= 0) {
            this.posX = 0;
          } else {
            this.posX += movementX;
          }
        } else if (this.posX >= window.innerWidth - this.$refs.window.clientWidth - 2) {
          this.posX = window.innerWidth - this.$refs.window.clientWidth - 2;
        } else {
          this.posX += movementX;
        }
      }
    },
    handleMouseOut(buttons) {
      if (buttons !== 1) {
        this.setDragging(false);
      }
    },
    handleFocus() {
      this.$store.commit('focusedWindow', this.appId);
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
    closeWindow() {
      this.$store.commit('closeWindow', this.appId);
    },
  },
};
</script>

<style scoped lang="less">
.windowContainer {
  position: absolute;
  resize: both;
  overflow: hidden;
  width: var(--windowWidth);
  height: var(--windowHeight);
  top: var(--posY);
  left: var(--posX);
  z-index: var(--z-index);

  border: 1px solid var(--accent);
  border-radius: 10px;
  background-color: var(--background);
  box-shadow: 1px 1px 5px var(--foreground-light);
}

.windowHeader {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-content: center;
  width: 100%;
  height: 1.5rem;
  border-bottom: 1px solid var(--accent);
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
      cursor: pointer;
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
  height: calc(100% - 1.5rem);
}
</style>
