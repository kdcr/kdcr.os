import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue';
import i18n from './i18n';
import Paint from './components/apps/Paint.vue';
import Xplore from './components/apps/Xplore.vue';
import Gallery from './components/apps/Gallery.vue';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    focusedWindow: 0,
    apps: [
      {
        name: 'system',
        title: '',
        id: 0,
        component: null,
        open: false,
        args: {},
        hidden: true,
      },
      {
        name: 'snifferApp',
        title: 'Sniffer',
        id: 1,
        component: null,
        open: false,
        args: {},
        hidden: true,
      },
      {
        name: 'paintApp',
        title: 'Paint',
        id: 2,
        component: Paint,
        open: false,
        args: {},
        hidden: false,
      },
      {
        name: 'webBrowserApp',
        title: 'Xplore',
        id: 3,
        component: Xplore,
        open: false,
        args: {},
        hidden: false,
      },
      {
        name: 'galleryApp',
        title: 'Gallery',
        id: 4,
        component: Gallery,
        open: true,
        args: {},
        hidden: false,
      },
    ],
    galleryImages: 9,
    selectedBackground: 1,
  },
  mutations: {
    focusedWindow(state, payload) {
      state.focusedWindow = payload;
    },
    closeWindow(state, payload) {
      const newApps = [...state.apps];
      newApps.find((app) => app.id === payload).open = false;
      state.apps = newApps;
      const openApp = newApps.find((app) => app.open);
      if (openApp) {
        state.focusedWindow = openApp.id;
      } else {
        state.focusedWindow = 0;
      }
    },
    openWindow(state, payload) {
      const { id, forceFocus, args } = payload;
      const newApps = [...state.apps];
      const selectedApp = newApps.find((app) => app.id === id);
      selectedApp.open = true;
      selectedApp.args = args;
      if (forceFocus) {
        state.focusedWindow = selectedApp.id;
      }
      state.apps = newApps;
    },
    selectedBackground(state, payload) {
      state.selectedBackground = payload;
      localStorage.selectedBackground = payload;
    },
  },
  getters: {
    focusedWindow(state) {
      return state.focusedWindow;
    },
    focusedWindowTitle(state) {
      return state.apps.find((app) => app.id === state.focusedWindow).title;
    },
    apps(state) {
      return state.apps;
    },
    numberOfImages(state) {
      return state.galleryImages;
    },
    selectedBackground(state) {
      return state.selectedBackground;
    },
  },
});

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  i18n,
  store,
  render: (h) => h(App),
}).$mount('#app');
