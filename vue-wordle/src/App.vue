<template>
  <div class="wrapper">
    <div class="header">
      <div class="letter" v-for="letter in complexity">{{ letter }}</div>
    </div>
    <div class="content">
      <DisplayInput :word="WORD" :complexity="complexity" />
      <
    </div>

    <div class="footer">
      <button class="button" :style="{ width: buttonWidth }">Reset</button>
      <button class="button" :style="{ width: buttonWidth }">Next</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import DisplayInput from './components/DisplayInput.vue'

const WORD = 'Hous'
const complexity = ref<number>(8)

const chooseLevel = (value: string) => {
  switch (value) {
    case 'easy':
      complexity.value = 4
      break
    case 'medium':
      complexity.value = 6
      break
    case 'medium':
      complexity.value = 8
      break
  }
}
const buttonWidth = computed(() => {
  const width = (complexity.value / 2) * 50 + 10 * (complexity.value / 2 - 1) + 'px'
  return width
})
</script>

<style scoped lang="scss">
@mixin font_ {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-weight: 400;
  line-height: 50px;
  font-size: 28px;
}

@mixin color_ {
  background-color: black;
  color: rgb(230, 227, 224);
  border: solid gray 2px;
}

@mixin size_ {
  width: fit-content;
  height: fit-content;
}
.wrapper {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 100px 0;
  background-color: rgb(2, 2, 2);
}

.header,
.footer {
  display: flex;
  gap: 10px;
  padding: 10px;
  border: solid gray 2px;
  @include size_();
}

.letter {
  width: 50px;
  height: 50px;
  text-align: center;
  text-transform: uppercase;
  @include font_();
  @include color_();
}

.content {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  border: solid gray 2px;
  @include size_();
}

.button {
  @include font_();
  @include color_();
}
</style>
