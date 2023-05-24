import axios from "axios";

const API_URL = "http://localhost:8000";

export const TaskCreateService = {

  getUsers: async () => {
      const token = localStorage.getItem("auth");
      const headers = {
        Authorization: `Bearer ${token}`,
      }
      const response = await axios.get(`${API_URL}/get-users`, {
        headers: headers
      });
      return response.data;
    },

    createTask: async (task: string, assignee_id: number, priority: string, due_date: string) => {
      const token = localStorage.getItem("auth");
      const headers = {
        Authorization: `Bearer ${token}`,
      }
      const response = await axios.post(`${API_URL}/create-task`, {
        task: task,
        assignee_id: assignee_id,
        priority: priority,
        due_date: due_date
      },{
        headers: headers
      });
      return response.data;
    }
};