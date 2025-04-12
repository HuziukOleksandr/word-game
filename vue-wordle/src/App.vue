<template>
  <div class="wrapper">
    <div class="wrapper--button">
      <button class="button" @click="SelectComlexity('easy')">Easy</button>
      <button class="button" @click="SelectComlexity('medium')">Medium</button>
      <button class="button" @click="SelectComlexity('hard')">Hard</button>
    </div>
    <!-- забрати  -->
    <div class="header" v-if="WinGame === true || LoseGame === true">
      <div class="letter matched" v-for="letter in WORD">{{ letter }}</div>
    </div>
    <div class="content">
      <div
        class="attemp"
        v-for="(element, indexY) in Attempt"
        :key="'row-' + indexY + '-' + Complexity"
      >
        <input
          class="input"
          v-for="(element, indexX) in Complexity"
          :key="'input-' + indexY + '-' + indexX + '-' + Complexity"
          :ref="(el) => setInputRef(el, indexY, indexX)"
          @input="Change($event, indexY, indexX)"
          @keydown="handleKeyDown($event, indexY, indexX)"
        />
      </div>
    </div>
    <div class="footer">
      <button class="button" @click="Reset()">Reset</button>
      <button class="button" @click="">Next</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { generateWord } from './services/generateWord.ts'
import { vFocus } from './services/vFocus.ts'


const Complexity = ref<number>(4),
  Attempt = ref<number>(10),
  WinGame = ref<boolean>(false),
  LoseGame = ref<boolean>(false)

onMounted(() => {
  inputsRef.value = resetGrid()
  letters.value = resetGrid()
  matched.value = resetGrid()
  nextTick(() => {
    vFocus(inputsRef.value)
  })
})

const resetGrid = () => {
  const array = []
  for (let y = 0; y < Attempt.value; y++) {
    const row: any[] = []
    for (let x = 0; x < Complexity.value; x++) {
      row.push(null)
    }
    array.push(row)
  }
  return array
}
const inputsRef = ref(resetGrid())
const letters = ref(resetGrid())
const matched = ref(resetGrid())
const WORD = ref(generateWord(Complexity.value))


const handleKeyDown = (event: KeyboardEvent, y: number, x: number) => {
  if (event.key === 'Backspace') {
    const currentValue = letters.value[y][x]
    if (currentValue) {
      letters.value[y][x] = null
    } else {
      MoveFocusBack(y, x)
    }
  }
}

const handleClass = (y: number, x: number) => {
  const input = inputsRef.value[y][x]
  if (matched.value[y][x] == true) {
    input.classList.add('matched')
  }
}

const Change = (event: Event, y: number, x: number) => {
  const inputElement = event.target as HTMLInputElement
  let value = inputElement.value

  if (!/^[a-zA-Zа-яА-ЯїЇіІєЄґҐёЁ]$/.test(value.charAt(0))) {
    value = ''
  } else {
    value = value.charAt(0).toUpperCase()
  }
  inputElement.value = value
  letters.value[y][x] = value
  if (value) {
    MoveFocusForward(y, x)
  }
}

function MoveFocusForward(y: number, x: number) {
  if (x < Complexity.value - 1) {
    inputsRef.value[y][x + 1].focus()
  } else {
    isMatched(y)
    for (let i = 0; i < Complexity.value; i++) {
      handleClass(y, i)
    }
    if (WinGame.value === false) {
      setTimeout(() => {
        if (y < Attempt.value - 1) {
          inputsRef.value[y + 1][0].focus()
        }
      }, 1000)
    }
  }
}

function MoveFocusBack(y: number, x: number) {
  if (x > 0) {
    letters.value[y][x - 1] = null
    inputsRef.value[y][x - 1].focus()
  } else if (y > 0) {
    letters.value[y - 1][Complexity.value - 1] = null
    inputsRef.value[y - 1][Complexity.value - 1].focus()
  }
}

function isMatched(y: number) {
  let count = 0
  for (let i = 0; i < Complexity.value; i++) {
    if (letters.value[y][i] == WORD.value[i].toUpperCase()) {
      count += 1
      matched.value[y][i] = true
    }
  }
  if (count === Complexity.value) {
    Win()
    console.log(WinGame.value)
  }
  count = 0
}

const setInputRef = (el: any, y: number, x: number) => {
  if (!inputsRef.value[y]) {
    inputsRef.value[y] = []
  }
  inputsRef.value[y][x] = el
}

const SelectComlexity = async (value: string) => {
  switch (value) {
    case 'easy': {
      Complexity.value = 4
      Attempt.value = 10
      break
    }
    case 'medium': {
      Complexity.value = 6
      Attempt.value = 8
      break
    }
    case 'hard': {
      Complexity.value = 8
      Attempt.value = 6
      break
    }
  }

  await nextTick()
  inputsRef.value = resetGrid()
  letters.value = resetGrid()
  matched.value = resetGrid()

  await nextTick()
  vFocus(inputsRef.value)
}

const Reset = async () => {
  WinGame.value = false
  LoseGame.value = false
  for(let y=0; y < Attempt.value; y++){
    for(let x=0; x < Complexity.value; x++){
      inputsRef.value[y][x].classList.remove("matched")
      inputsRef.value[y][x].value = null
    }
  }
  inputsRef.value = resetGrid()
  letters.value = resetGrid()
  matched.value = resetGrid()
  WORD.value = generateWord(Complexity.value)
  await nextTick()
  vFocus(inputsRef.value)
}

const Win = () => {
  WinGame.value = true
}

const Over = () => {
  LoseGame.value = true
}
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

.attemp {
  display: flex;
  gap: 10px;
  transition: all 0.4s;
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
  padding: 0 10px;
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

.input {
  width: 50px;
  height: 50px;
  text-align: center;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-weight: 400;
  line-height: 32px;
  font-size: 28px;
  text-transform: uppercase;
  background-color: black;
  color: rgb(230, 227, 224);
  border: solid gray 2px;
  caret-color: transparent;
}

.input:focus {
  outline: none;
  border-color: #ffcc00;
  box-shadow: 0 0 8px rgba(255, 204, 0, 0.8);
}

.matched {
  animation: fillGreen 1.6s forwards;
}

@keyframes fillGreen {
  0% {
    background-color: rgb(0, 0, 0);
    scale: 0.9;
  }
  50% {
    scale: 1.2;
  }
  100% {
    background-color: rgb(8, 129, 8);
    scale: 1;
  }
}
</style>
