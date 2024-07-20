import { ref } from "vue";
import apiClient from "@/config/axiosClient";
const taskList = ref([]);
export function useTodo() {
  const fetchTodo = async () => {
    try {
      const response = await apiClient("/");
      console.log(response.data.content);
      taskList.value = response.data.content;
    } catch (err) {
      console.log(err);
    }
  };
  return {
    fetchTodo,
    taskList,
  };
} 