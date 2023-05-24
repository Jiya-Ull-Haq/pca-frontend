import axios from "axios";

const API_URL = "http://localhost:8000";

export const TaskViewService = {
  getTasks: async () => {
    const token = localStorage.getItem("auth");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.get(`${API_URL}/get-tasks`, {
      headers: headers,
    });
    return response.data;
  },

  updateTask: async (id: number, status: string) => {
    try {
      const token = localStorage.getItem("auth");
      const response = await axios.put(
        `${API_URL}/update-task/${id}`,
        { status: status },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.log("Error updating task:", error);
    }
  }
};
