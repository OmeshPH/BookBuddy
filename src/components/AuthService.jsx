import axios from 'axios';

const apiUrl = 'https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api'; // Replace with your API base URL

const AuthService = {
  login: async (email, password) => {
    const response = await axios.post(`${apiUrl}/users/login`, { email, password });
    const data = await response.data;
    localStorage.setItem('token', data.token);
    return data.user;
  },
  logout: () => {
    localStorage.removeItem('token');
  },
  isLoggedIn: () => {
    return localStorage.getItem('token') !== null;
  },
  getCurrentUser: () => {
    // Implement logic to retrieve user data based on token
  }
};

export default AuthService;