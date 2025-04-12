<template>
  <div class="wrapper">
    <header class="header">
      <p class="logo">Words</p>
    </header>
    <div class="content">
      <div
        class="attemp"
        v-for="(element, indexY) in attempt"
        :key="'row-' + indexY + '-' + complexity"
      >
        <input
          class="input"
          v-for="(element, indexX) in complexity"
          :key="'input-' + indexY + '-' + indexX + '-' + complexity"
          :ref="(el) => setInputRef(el, indexY, indexX)"
          @input="change($event, indexY, indexX)"
          @keydown="handleKeyDown($event, indexY, indexX)"
        />
      </div>
    </div>
    <div class="footer">
      <button class="button" @click="restart()">
        <img src="./assets/images/restart.svg" alt="restart" class="image" />
      </button>
      <button class="button" @click="minus()">
        <img src="./assets/images/minus.svg" alt="minus" class="image" />
      </button>
      <button class="button" @click="plus()">
        <img src="./assets/images/plus.svg" alt="plus" class="image" />
      </button>
      <button class="button" @click="next()">
        <img src="./assets/images/next.svg" alt="restart" class="image" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { generateWord } from './services/generateWord.ts'
import { vFocus } from './services/vFocus.ts'
import { resetGrid } from './services/resetGrid.ts'

const complexity = ref<number>(4),
  attempt = ref<number>(10),
  winGame = ref<boolean>(false),
  loseGame = ref<boolean>(false),
  inputsRef = ref(resetGrid(complexity.value, attempt.value)),
  letters = ref(resetGrid(complexity.value, attempt.value)),
  matched = ref(resetGrid(complexity.value, attempt.value)),
  word = ref(generateWord(complexity.value))

onMounted(() => {
  word.value = generateWord(complexity.value)
  nextTick(() => {
    vFocus(inputsRef.value)
  })
})

const handleKeyDown = (event: KeyboardEvent, y: number, x: number) => {
  const key = event.key
  const currentValue = letters.value[y][x]
  switch (key) {
    case 'Backspase': {
      if (currentValue) {
        letters.value[y][x] = null
      } else {
        moveFocusBack(y, x)
      }
      break
    }
    case 'Enter': {
      if (x == complexity.value - 1 && y < attempt.value && currentValue) {
        isMatched(y)
        for (let i = 0; i < complexity.value; i++) {
            handleClass(y, i)
          }
        if (y != attempt.value - 1 && winGame.value != true  ) {
          inputsRef.value[y + 1][0].focus()
        }
        break
      }
    }
  }
}

const handleClass = (y: number, x: number) => {
  const input = inputsRef.value[y][x]
  if (matched.value[y][x] == true) {
    input.classList.add('matched')
  }
}

const change = (event: Event, y: number, x: number) => {
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
    moveFocusForward(y, x)
  }
}

function moveFocusForward(y: number, x: number) {
  if (x < complexity.value - 1) {
    inputsRef.value[y][x + 1].focus()
  }
}

function moveFocusBack(y: number, x: number) {
  if (x > 0) {
    letters.value[y][x - 1] = null
    inputsRef.value[y][x - 1].focus()
  } else if (y > 0) {
    letters.value[y - 1][complexity.value - 1] = null
    inputsRef.value[y - 1][complexity.value - 1].focus()
  }
}

function isMatched(y: number) {
  let count = 0
  for (let i = 0; i < complexity.value; i++) {
    if (letters.value[y][i] == word.value[i].toUpperCase()) {
      count += 1
      matched.value[y][i] = true  
    }
  }
  if (count === complexity.value) {
    winGame.value = true
  }
  count = 0
}

const setInputRef = (el: any, y: number, x: number) => {
  if (!inputsRef.value[y]) {
    inputsRef.value[y] = []
  }
  inputsRef.value[y][x] = el
}

const restart = async () => {
 winGame .value = false
  loseGame.value = false
  for (let y = 0; y < attempt.value; y++) {
    for (let x = 0; x < complexity.value; x++) {
      inputsRef.value[y][x].classList.remove('matched')
      inputsRef.value[y][x].value = null
    }
  }
  inputsRef.value = resetGrid(complexity.value, attempt.value)
  letters.value = resetGrid(complexity.value, attempt.value)
  matched.value = resetGrid(complexity.value, attempt.value)
  word.value = generateWord(complexity.value)
  await nextTick()
  vFocus(inputsRef.value)
}

const next = () => {

}

const plus = async () => {
  if (complexity.value <= 8) {
    complexity.value++
    await nextTick()
    inputsRef.value = resetGrid(complexity.value, attempt.value)
    letters.value = resetGrid(complexity.value, attempt.value)
    matched.value = resetGrid(complexity.value, attempt.value)
    word.value = generateWord(complexity.value)
  }
  await nextTick()
  vFocus(inputsRef.value)
}

const minus = async () => {
  if (complexity.value > 4) {
    complexity.value--
    await nextTick()
    inputsRef.value = resetGrid(complexity.value, attempt.value)
    letters.value = resetGrid(complexity.value, attempt.value)
    matched.value = resetGrid(complexity.value, attempt.value)
    word.value = generateWord(complexity.value)
    await nextTick()
    vFocus(inputsRef.value)
  }
}
</script>

<style scoped lang="scss">
$color-text: white;
$color-background: black;
$color-border: gray;
$width-input: 46px;

@mixin font_ {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-weight: 400;
  line-height: 32px;
  font-size: 28px;
}

@mixin color_ {
  background-color: $color-background;
  color: $color-text;
  border: solid $color-border 2px;
}

@mixin size_ {
  width: fit-content;
  height: fit-content;
}

@mixin border_ {
  border: solid $color-border 2px;
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
  background-color: $color-background;

  .header,
  .content,
  .footer,
  .wrapper--button {
    display: flex;
    gap: 10px;
    padding: 10px;
    @include border_();
    @include size_();
  }
  .content {
    flex-direction: column;
  }
}

.logo {
  color: $color-text;
  border-bottom: 2px solid $color-border;
  @include font_();
}

.attemp {
  display: flex;
  gap: 10px;
  transition: all 0.4s;
}

.button {
  width: $width-input;
  aspect-ratio: 1 / 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
  transition: all 0.4s;
  @include font_();
  @include color_();
}

.button:hover {
  cursor: pointer;
  scale: 1.05;
}

.input {
  width: $width-input;
  aspect-ratio: 1 / 1;
  text-align: center;
  text-transform: uppercase;
  background-color: $color-background;
  color: $color-text;
  caret-color: transparent;
  @include border_();
  @include font_();
}

.input:focus {
  outline: none;
  border-color: #ffcc00;
  box-shadow: 0 0 8px rgba(255, 204, 0, 0.8);
}

.matched {
  animation: fillGreen 1.6s forwards;
}

.image {
  width: 36px;
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
