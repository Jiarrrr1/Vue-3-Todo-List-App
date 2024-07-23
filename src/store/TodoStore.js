import { reactive, ref, toRefs } from "vue";
import apiClient from "@/config/axiosClient";

export const state = reactive({
  taskList: [],
  finishedTask:[],
});

export default function useTodo() {
  const fetchTodo = async () => {
    try {
      const response = await apiClient("/access");
      console.log(response.data.content);
      state.taskList = response.data.content;
    } catch (err) {
      console.log(err);
    }

  };

  const checkTask = () => {
    console.log(state.taskList.value.length);
    return state.taskList.value.length > 0;
};

const createTask = (payload) => {
  state.taskList.push(payload);
    console.log(state.taskList)
}
const removeTask = (id) => {
  state.taskList = state.taskList.filter(t => t.id !== id);
};

  // const newTask = async () => {
  //   try {
  //     const response = await apiClient.post("/add")
  //     console.log(response.data.content);
  //     taskList = response.data.content;
  //   } catch (err) {
  //     console.log(err);
  //   }
  // } 

  return {
    ...toRefs(state),
    fetchTodo,
    checkTask,
    createTask,
    removeTask,
  };
} 