<template>
  <div class="container">
    <span class="title">{{ title }}</span>
    <div class="digital-container">
      <span class="single-digit">
        {{ leftDigit }}
      </span>
      <span class="single-digit">
        {{ rightDigit }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    digit: {
      type: Number,
      require: true,
    },
    title: {
      type: String,
      require: false,
    },
  },
  computed: {
    leftDigit() {
      return this.digit >= 10 ? this.digit.toString()[0] : "0";
    },
    rightDigit() {
      return this.digit >= 10
        ? this.digit.toString()[1]
        : this.digit.toString();
    },
  },
};
</script>
<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 5px;
}
.container:first-child {
  margin-left: 0;
}
.title {
  font-size: 12px;
}
.digital-container {
  display: flex;
  flex-direction: row;
  padding: 0;
}
.single-digit {
  position: relative;
  display: flex;
  flex: 0 1 25%;
  font-size: 18px;
  font-weight: bold;
  background-color: #ff0000;
  border-radius: 5px; 
  padding: 5px 5px;
  color: white;
}
.single-digit:first-child {
  margin-right: 2px;
}
.single-digit:after {
  position: absolute;
  left: 0px;
  right: 0px;
  top: 50%;
  bottom: 50%;
  content: "";
  width: "100%";
  height: 2px;
  background-color: #ff8e8e;
  opacity: 0.4;
}
</style>
