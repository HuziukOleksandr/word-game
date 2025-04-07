<template>
  <div class="wrapper">
    <div class="header">
      <div class="letter" v-for="letter in WORD">{{ letter }}</div>
    </div>
    <div class="content">
      <DisplayInput
        v-for="(elem, index) in 5"
        :key="index"
        :complexity="complexity"
        :match="match[index]"
        :ref="setInputRef"
        @input="(value) => getLetter(index, value)"
      />
    </div>

    <div class="footer">
      <button class="button" :style="{ width: buttonWidth }" @click="Reset">Reset</button>
      <button class="button" :style="{ width: buttonWidth }" @click="">Next</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, nextTick, reactive } from 'vue'
import DisplayInput from './components/DisplayInput.vue'

const WORD = 'Hous'
const complexity = ref<number>(4),
  shot = ref<number>(0),
  inputRefs = reactive<any[]>([])
const match = ref<(number[] | null)[]>(Array(5).fill(null))

onMounted(() => {
  nextTick(() => {
    if (inputRefs.length > 0) {
      inputRefs[shot.value]?.$el?.querySelector('input')?.focus()
    }
  })
})

const Matched = (oldArray: string[], newArray: string[]) => {
  const matchedIndex = oldArray
    .map((item, index) => (item.toUpperCase() === newArray[index].toUpperCase() ? index : -1))
    .filter((index, item) => index !== -1)
  return matchedIndex
}

const getLetter = (index: number, value: string[]) => {
  match.value[index] = Matched(WORD.split(''), value)
  if (true) {
    setTimeout(() => {
      inputRefs[++shot.value]?.$el?.querySelector('input')?.focus()
    }, 1000)
  }
}

const Reset = () => {}

const setInputRef = (el: any) => {
  if (el) inputRefs.push(el)
}

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
  line-height: 46px;
  font-size: 28px;
}

@mixin color_ {
  background-color: black;
  color: WHITE;
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
  background-color: black;
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
