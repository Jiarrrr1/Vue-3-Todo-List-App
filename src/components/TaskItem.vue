<script setup>
import { reactive, computed, ref } from 'vue';

const props = defineProps(['id', 'name', 'isFinished']);
const emit = defineEmits(['showStatus', 'createTask',]);
console.log(props.name);
const newInput = ref('');

const currentTask = reactive({
  id: props.id,
  name: props.name,
  isFinished: props.isFinished,
});


const status = () => {
  emit('showStatus', currentTask);
};

const isEditing = computed(() => !props.name);


const createTask = () => {
  if (newInput.name !== '') {
    const listOfTask = {
      id: currentTask.id,
      name: newInput,
      isFinished: currentTask.isFinished,
    }
    emit('createTask', listOfTask, listOfTask.id)
    newInput.name = '';
  }
};

const removeTodo = (payload) => {
    removeTask(payload)
  }



</script>



<template>
  <li class="flex items-center bg-indigo-500 p-8 w-10/12 text-lg gap-6 rounded-xl lg:p-5 sm:p-4 sm:text-sm ">
    <input :disabled="!isEditing" class="accent-green-600 outline-none border-none scale-150 rounded-xl sm:scale-100 "
      type="checkbox" v-model="currentTask.isFinished" @change="status" @click="">
    <p v-if="isEditing" @click=""
      class=" tracking-widest text-slate-100 capitalize overflow-hidden text-ellipsis whitespace-nowrap px-10 py-2 2xl:text-3xl 2xl:py-5 lg:text-lg sm:px-8">
      {{ props.name }}
    </p>
    <input v-else type="text" v-model="newInput" placeholder="Enter your updated task"
      class=" update-input absolute bg-transparent border-b-2 outline-none  text-slate-100 tracking-widest overflow-hidden text-ellipsis whitespace-nowrap "
      @blur="createTask">
    <button v-if="currentTask.isFinished" @click=""
      class=" font-semibold text-gray-100 bg-red-600 px-5 py-2 rounded-xl 2xl:py-6 2xl:text-4xl sm:text-xs">Delete</button>
  </li>
</template>
