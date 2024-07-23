<template>
    <div>
      <h1 class="p-6 text-3xl font-bold text-center">Todo App 📋</h1>
      <TaskForm @addTodo="addTodoHandler" />
      <TaskList
        :taskitem="taskList" 
         @displayTasks="showList"
          @showStatus="status"
          @removeTask = "removeTodo"
         
      />
    </div>
  </template>
  
  <script setup>
  import { ref , defineAsyncComponent} from "vue";
  import TaskList from '../components/TaskList.vue';
  import TaskForm from '../components/TaskForm.vue';
  import useTodo from '@/store/TodoStore';
  
  const { taskList , checkTask, createTask, removeTask } = useTodo();
  
  const showList = () => {
  checkTask();
};

  const status = (payload) => {
        console.log(`Id: ${payload.id}, Task: ${payload.name}, Completed: ${payload.isFinished}`);
  };
 
  const addTodoHandler = (payload) => {
    createTask(payload)
  }
  
  const removeTodo = (payload) => {
    removeTask(payload)
  }

  </script>
  
  <style lang="scss" scoped>
  /* Add your styles here */
  </style>
  