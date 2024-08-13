<!-- <script setup>
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
      {{ props.taskname }}
    </p>
    <input v-else type="text" v-model="newInput" placeholder="Enter your updated task"
      class=" update-input absolute bg-transparent border-b-2 outline-none  text-slate-100 tracking-widest overflow-hidden text-ellipsis whitespace-nowrap "
      @blur="createTask"> 
    <button v-if="currentTask.isFinished" @click=""
      class=" font-semibold text-gray-100 bg-red-600 px-5 py-2 rounded-xl 2xl:py-6 2xl:text-4xl sm:text-xs">Delete</button>
  </li>
</template> -->

<template>

  <li class="flex  gap-3 p-2 my-2 rounded-sm shadow">
      <input  v-model="currentTask.isFinished" @click="toggleCheckboxHandler(currentTask.id)" type="checkbox">
      <p :class="isDone" @dblclick="isUpdating(currentTask.id)">{{ props.name }}
      </p>
      <button v-if="currentTask.isFinished === true"
      class="px-3 ml-auto bg-red-600 text-gray-50" @click="deleteTaskHandler(props.id)">Remove</button>
  </li>
  <div>
      <Modal v-if="IsUpdateShow === currentTask.id">
      <template #modal-header>
      <h3 class="text-lg font-extrabold">Updating task: {{ props.name }}</h3>
    </template> 

    <!-- Second Slot -->
    <template #modal-content>
      <input v-model="updateTask.name" type="text" class="border rounded border-black  px-2">
    </template>

    <!-- Last Slot Action -->
    <template #default>
      <div class="modal-action">
        <form method="dialog">
          <!-- if there is a button in form, it will close the modal -->
          <div class="flex gap-5">
          <button class="bg-red-500 text-white py-1 px-3 rounded font-semibold" @click="isUpdating">Cancel</button>
          <button class="bg-green-500 text-white py-1 px-3 rounded font-semibold" @click="updatedTodo(props.id, updateTask )">Update Task</button>
        </div>
        </form>
      </div>
    </template>
    </Modal>
        </div>
</template>
<script setup>
const props = defineProps(['name', 'id', 'isFinished'])
import Modal from '@/components/ModalTemplate.vue'
import {useTodo}   from "@/store/TodoStore";
import { computed, reactive } from 'vue';
const { IsUpdateShow, isUpdating, updatedTodo } = useTodo();

const currentTask = reactive({
  id: props.id,
  name: props.name,
  isFinished: props.isFinished,
});

const updateTask = reactive ({
name: ''
})

const isDone = computed( ()=> {
  if (currentTask.isFinished === true) {
    return 'opacity-50 pointer-events-none	'
  }
})


const toggleCheckboxHandler = async (taskId) => {
const { toggleCheckbox } = useTodo();

try {
      await toggleCheckbox(taskId)
} catch (err) {
  console.log(err);
}
};

const deleteTaskHandler = async (taskId) => {
  const { deleteTask } = useTodo();
  try {
      await deleteTask(taskId);
  } catch (err) {
      console.log(err);
  }
}



</script>
