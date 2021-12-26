<template>
  <div class="timer-container align-items-center">
    <Digit v-if="days" :digit="days" />
    <span class="separator-container" v-if="days">
      :
    </span>
    <Digit :digit="hours" />
    <span class="separator-container">
      :
    </span>
    <Digit :digit="minutes" />
    <span class="separator-container">
      :
    </span>
    <Digit :digit="seconds" />
  </div>
</template>

<script>
import Digit from "./digit.vue";
export default {
  components: { Digit },
  props: {
    days: {
      type: Number,
      required: false,
    },
    hours: {
      type: Number,
      required: true,
    },
    minutes: {
      type: Number,
      required: true,
    },
    seconds: {
      type: Number,
      required: true,
    },
  },
};
</script>
<style scoped>
.timer-container {
  display: inline-flex;
  align-items: center;
}
.separator-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: flex-end;
  margin: 0 0 7px 0px;
}
.separator {
  display: inline-block;
  width: 6px;
  height: 6px;
  background-color: #404549;
  border-radius: 6px;
  margin: 5px 0px;
}
</style>