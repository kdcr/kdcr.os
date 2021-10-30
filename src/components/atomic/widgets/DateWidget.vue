<template>
  <div class="dateWidgetContainer">
    <span class="currentTime"
    v-on:click="toggleCalendar">
    {{format(currentTime, 'hh:mm')}}
    </span>
    <Calendar
    v-bind:class="{ calendarDisabled: !showCalendar }"
    class="calendar"/>
  </div>
</template>

<script>
import { format } from 'date-fns';
import Calendar from '../Calendar.vue';

const showCalendar = false;

export default {
  name: 'DateWidget',
  props: {},
  created() {
    setTimeout(() => {
      this.currentTime = Date.now();
    }, 60000);
  },
  data() {
    return {
      currentTime: Date.now(),
      showCalendar,
    };
  },
  methods: {
    toggleCalendar() { this.showCalendar = !this.showCalendar; },
    format,
  },
  components: {
    Calendar,
  },
};

</script>

<style scoped lang="less">
.dateWidgetContainer {
  display: flex;
  justify-content: center;
  align-items: center;

  & > span {
    cursor: pointer;
  }
}

.calendar {
  position: absolute;
  z-index: 10;
  top: calc(1.5rem + 1rem);

  transition: 0.8s all ease-in-out;
}

.calendarDisabled {
  transform: translateY(-300px) perspective(200px) rotate3D(1, 0, 0, -30deg);
  opacity: 0;
}

.currentTime {
  user-select: none;
}
</style>
