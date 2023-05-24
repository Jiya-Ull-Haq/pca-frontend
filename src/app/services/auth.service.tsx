import axios from 'axios';

const API_URL = 'http://localhost:8000';

export const AuthService = {
    login: async (email: string, password: string) => {

        try {
            const response = await axios.post(`${API_URL}/login`, { email, password }, {
              headers: {
                'Content-Type': 'application/json'
              }
            });
            localStorage.setItem('auth', response.data.access_token);
            return response.data.access_token;
          } catch (error) {
            throw new Error('Login failed. Please try again.');
          }
      },

      register: async (username: string, email: string, password: string) => {
        try {
          const response = await axios.post(`${API_URL}/register`, { username, email, password },{
            headers: {
              'Content-Type': 'application/json'
            }
          });
          if (response.data){
            return true
          }
        } catch (error) {
          throw new Error('Registration failed. Please try again.');
        }
      },
}