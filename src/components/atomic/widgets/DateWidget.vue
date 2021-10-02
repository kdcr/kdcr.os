<template>
  <div class="dateWidgetContainer">
    <span class="currentTime"
    v-on:click="toggleCalendar">
    {{currentTime}}
    </span>
    <Calendar
    v-bind:class="{ calendarDisabled: showCalendar }"
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
  data() {
    return {
      currentTime: format(Date.now(), 'hh:mm'),
      showCalendar,
    };
  },
  methods: {
    toggleCalendar() { this.showCalendar = !this.showCalendar; },
  },
  components: {
    Calendar,
  },
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
