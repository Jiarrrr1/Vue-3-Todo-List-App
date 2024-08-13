// import { reactive, ref, toRefs } from "vue";
// import apiClient from "@/config/axiosClient";

// export const allTask = reactive({
//   taskList: [],
//   finishedTask:[],
// });

// export default function useTodo() {
//   const fetchTodo = async () => {
//     try {
//       const response = await apiClient("/access");
//       console.log(response.data.content);
//       allTask.taskList = response.data.content;
//     } catch (err) {
//       console.log(err);
//     }

//   };

//   const checkTask = async () => {
//     console.log(allTask.taskList.value.length);
//     return allTask.taskList.value.length > 0;
// };

// const createTask = (payload) => {
//   allTask.taskList.push(payload);
// }
// const removeTask = (id) => {
//   allTask.taskList = allTask.taskList.filter(t => t.id !== id);
// };

//   // const newTask = async () => {
//   //   try {
//   //     const response = await apiClient.post("/add")
//   //     console.log(response.data.content);
//   //     taskList = response.data.content;
//   //   } catch (err) {
//   //     console.log(err);
//   //   }
//   // } 

//   return {
//     ...toRefs(allTask),
//     fetchTodo,
//     checkTask,
//     createTask,
//     removeTask,
//   };
// } 

import { reactive, toRefs } from "vue";
import apiClient from "@/config/axiosClient";

const taskStore = reactive ({
  taskList:[],
  IsUpdateShow: ''
});

export function useTodo() {

  const fetchTodo = async () => {
    try {
      const response = await apiClient("/access");
      taskStore.taskList =  response.data;
    } catch (err) {
      console.log(err);
    }
  };

  const checkTask = async () => {
        await fetchTodo();
        return await taskStore.taskList.content.length > 0;   
    };

  const addTodo = async (taskname) => {
    try {
      const response = await apiClient.post('/add', { taskname });
      await fetchTodo();  
      console.log(taskStore.taskList.content);      
    }catch (err) {
      console.log(err);
    }
  };

  const toggleCheckbox = async (id) => {
    try {
      const response = await apiClient.patch(`/markAsDone/${id}`)
      console.log(response.data.content.isFinished);
      
      await fetchTodo();

  } catch (err) {
      console.log(err);
  }
  }

  const deleteTask = async (id) => {
    try {
      const remove = await apiClient.delete(`/delete/${id}`);
      await fetchTodo();
  } catch (err) {
      console.log(err);
  }
  }

  const isUpdating = async (id) => {
    if(taskStore.IsUpdateShow !== id){
      taskStore.IsUpdateShow = id
    }
    else{
      taskStore.IsUpdateShow = ''
    }
  }

  const updatedTodo = async ( task, taskName ) => {
    const taskId = task
    try {
      const newTaskData = taskName.name;
      const update = await apiClient.patch('/change', { taskId, newTaskData })
      await fetchTodo();
      taskStore.IsUpdateShow = ''
  } catch (err) {
      console.log(err);
  }
  }


  return {
    fetchTodo,
    checkTask,
    addTodo,
    toggleCheckbox,
    deleteTask,
    isUpdating,
    updatedTodo,
    ...toRefs(taskStore)
  };
}