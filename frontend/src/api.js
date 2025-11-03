// src/api.js
import axios from 'axios';

// All our API calls will go to this URL
const API_URL = 'http://localhost:3001'; // This must match your NestJS port

// --- Author Functions ---
export const getAuthors = () => axios.get(`${API_URL}/author`);
export const createAuthor = (author) => axios.post(`${API_URL}/author`, author);
export const deleteAuthor = (id) => axios.delete(`${API_URL}/author/${id}`);

// --- Category Functions ---
export const getCategories = () => axios.get(`${API_URL}/category`);
export const createCategory = (category) => axios.post(`${API_URL}/category`, category);
export const deleteCategory = (id) => axios.delete(`${API_URL}/category/${id}`);

// --- Book Functions ---
export const getBooks = () => axios.get(`${API_URL}/book`);
export const createBook = (book) => axios.post(`${API_URL}/book`, book);
export const deleteBook = (id) => axios.delete(`${API_URL}/book/${id}`);