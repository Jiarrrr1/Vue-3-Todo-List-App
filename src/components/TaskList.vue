<script setup>
import TaskItem from './TaskItem.vue';
import { ref, computed, reactive } from 'vue';

const emit = defineEmits([ 'displayTasks', 'removeTask', 'showStatus', 'createTask'])
const props = defineProps(['taskitem']);
console.log(props.taskitem);
const checkTask = () => {
  emit('displayTasks')
};

const status = (payload) => {
  emit('showStatus', payload)
  
}




</script>



<template>
    <section>
      <ul v-if="checkTask">
        <TaskItem
          v-for="item in props.taskitem"
          :key="item.id"
          :id="item.id"
          :name="item.taskname"
          :isFinished="item.isFinished"
          @showStatus="status"

        
        ></TaskItem>
      </ul>
      <div v-else>
        <p class="text-center text-red-500 font-bold uppercase">List of Tasks is Empty</p>
      </div>
    </section>
  </template>
  
