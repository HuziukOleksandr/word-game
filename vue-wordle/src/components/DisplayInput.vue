<template>
  <div class="input-wrapper">
    <input  
      v-for="letter in complexity" 
      class="input" 
      type="text"
      maxlength="1"
    >
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const { word, complexity } = defineProps<{
  word: string;
  complexity: number;
}>();

const letterArray = ref([])

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
  font-size:28px;
  text-transform: uppercase;
  background-color: black;
  color: rgb(230, 227, 224);
  border: solid gray 2px;
}


</style>bas