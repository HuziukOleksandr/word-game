<template>
  <div class="input-wrapper">
    <input
      v-for="(letter, index) in values"
      class="input"
      
      :key="index"
      v-model="values[index]"
      ref="inputs"
      type="text"
      maxlength="1":class="{ matched: match?.includes(index) }"
      @input="handleInput(index)"
      @keydown="handleKeyDown($event, index)"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'

const { complexity, match } = defineProps<{
  complexity: number;
  match?: number[] | null
}>()
 console.log(match);
 
const emit = defineEmits<{
  input: [value: string[]]
}>()

const inputs = ref<(HTMLInputElement | null)[]>([])
const values = reactive<string[]>(Array(complexity).fill(''))

const handleInput = (index: number) => {
  if (index >= complexity - 1) {
    emit('input', [...values])
  }
  if (values[index].length > 1) {
    values[index] = values[index].charAt(0)
  }
  if (values[index] && index < inputs.value.length - 1) {
    inputs.value[index + 1]?.focus()
  }
}

const handleKeyDown = (event: KeyboardEvent, index: number) => {
  if (event.key === 'Backspace') {
    if (values[index] === '') {
      if (index > 0) {
        inputs.value[index - 1]?.focus();
      }
    } else {
      values[index] = '';
    }
  }
}

onMounted(() => {
  if (inputs.value[0]) inputs.value[0]?.focus()
})
</script>

<style scoped>
.input-wrapper {
  width: fit-content;
  display: flex;
  gap: 10px;
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
  border-color: #ffcc00; /* Змінюємо колір бордера */
  box-shadow: 0 0 8px rgba(255, 204, 0, 0.8); /* Додаємо світлову тінь для ефекту фокусу */
}

.matched {
  background-color: green;
}
</style>
