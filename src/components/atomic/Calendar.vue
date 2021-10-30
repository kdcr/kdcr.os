<template>
  <div class="calendarContainer">
      <div class="periodSelector">
        <div></div>
        <span>{{$t('calendar.' + format(selectedDate, 'MMMM').toLowerCase())}}</span>
        <div></div>
      </div>
      <div class="daysGrid">
        <span class="dayNames"
        v-for="name in dayNames"
        :key="name"
        >
          {{$t('calendar.dim-' + name)}}
        </span>
      </div>
      <div class="daysGrid">
        <span
          class="daysGridItem"
          v-for="(day, index) in daysInMonth"
          v-bind:class="{ daysGridItemActive: currentDay === day.value && day.enabled,
          daysGridItemDisabled: !day.enabled }"
          :key="day + index">
          {{day.value}}
        </span>
      </div>
  </div>
</template>

<script>
import {
  getDate, getMonth, getDaysInMonth, getDay, subMonths, format,
  lastDayOfMonth,
} from 'date-fns';

const calcDaysToShow = () => {
  const finalNumbers = [];
  const daysInMonth = getDaysInMonth(Date.now());
  const daysInPrevMonth = getDaysInMonth(subMonths(Date.now(), 1));
  let lastMonthWeekDay = getDay(lastDayOfMonth(subMonths(Date.now(), 1)));
  if (lastMonthWeekDay === 0) lastMonthWeekDay = 7;
  lastMonthWeekDay -= 1;

  for (let index = daysInPrevMonth - lastMonthWeekDay;
    index <= daysInPrevMonth;
    index += 1) {
    finalNumbers.push({ value: index, enabled: false });
  }

  for (let index = 1; index <= daysInMonth; index += 1) {
    finalNumbers.push({ value: index, enabled: true });
  }

  return finalNumbers;
};

export default {
  name: 'Calendar',
  data() {
    return {
      currentDate: Date.now(),
      selectedDate: Date.now(),
      dayNames: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
    };
  },
  computed: {
    currentDay: () => getDate(Date.now()),
    daysInMonth: () => calcDaysToShow(),
    getDayTest: () => getDay(Date.now()),
  },
  methods: {
    getMonth,
    format,
  },
};
</script>

<style scoped lang="less">
.calendarContainer {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background-color: var(--background);

  border: 1px solid black;
  border-radius: 10px;
}

.periodSelector {
  display: flex;
  justify-content: center;
  align-items: center;

  user-select: none;
}

.dayNames {
  text-align: center;
}

.daysGrid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-top: 1rem;
  row-gap: 0.3rem;
  column-gap: 0.3rem;
}

.daysGridItem {
  text-align: center;
  width: 3rem;

  user-select: none;

  cursor: pointer;
  border: 1px solid black;
  border-radius: 5px;

  transition: 0.5s all;

  &:hover {
    box-shadow: 1px 1px 10px black;
  }
}

.daysGridItemActive {
  background-color: var(--accent);
}

.daysGridItemDisabled {
  background-color: var(--foreground);
  color: var(--background);

  &:hover {
    box-shadow: none;
  }
}

</style>
