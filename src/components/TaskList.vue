<!-- <script setup>
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
          v-for="item in props"
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
   -->

   <template>
    <section>
        <h2 class="p-6 text-3xl font-bold text-center">List of Todo</h2>
        <ul v-if="checkTask">
            <TaskItem v-for="task in taskList.content" :key="task._id"
                :id="task._id" :name="task.name" :isFinished="task.isFinished" />
        </ul>
    </section>
</template>
<script setup>
import { useTodo } from '@/store/TodoStore';
const { taskList, checkTask } = useTodo()


import TaskItem from './TaskItem.vue';
</script>   