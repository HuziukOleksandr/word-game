<template>
  <div class="wrapper">
    <div class="wrapper--button">
      <button class="button" @click="ChooseComplexity('easy')" :style="{ width: buttonWidth }">4</button>
      <button class="button" @click="ChooseComplexity('medium')" :style="{ width: buttonWidth }">6</button>
      <button class="button" @click="ChooseComplexity('hard')" :style="{ width: buttonWidth }">8</button>
    </div>
    <div class="header">
      <transition-group name="letter" >
        <div class="letter" v-for="letter in WORD">{{ letter }}</div>
      </transition-group>
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
import { generate } from 'random-words'
import DisplayInput from './components/DisplayInput.vue'

const WORD = computed(() => {
  return generate({ minLength: complexity.value, maxLength: complexity.value }) as string
})
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
  console.log(WORD.value)

  match.value[index] = Matched(WORD.value.split(''), value)
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

const ChooseComplexity = (value: string) => {
  switch (value) {
    case 'easy':
      complexity.value = 4
      break
    case 'medium':
      complexity.value = 6
      break
    case 'hard':
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
.footer,
.wrapper--button {
  display: flex;
  gap: 10px;
  padding: 10px;
  border: solid gray 2px;
  @include size_();
}
.header {
  transition: all 0.4s;
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
  transition: all 0.4s;
}

.button:hover,
.letter:hover {
  cursor: pointer;
  scale: 1.05;
}

.letter-group {
  display: flex;
  gap: 10px;
  padding: 10px;
  border: solid gray 2px;
}

.letter-enter-active,
.letter-leave-active {
  transition: transform 0.4s ease, opacity 0.4s ease;
}
.letter-enter-from,
.letter-leave-to {
  transform: scale(0.8);
  opacity: 0;
}
</style>
