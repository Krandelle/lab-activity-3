// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css'; // We'll add styles here
import {
  getAuthors,
  createAuthor,
  deleteAuthor,
  getCategories,
  createCategory,
  deleteCategory,
  getBooks,
  createBook,
  deleteBook,
} from './api'; // We import all our functions from api.js

function App() {
  // --- STATE ---
  // "State" is React's memory. We need to store the lists of data we fetch from the API.
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [books, setBooks] = useState([]);

  // This state will hold the text from our "Add" forms
  const [newAuthorName, setNewAuthorName] = useState('');
  const [newCategoryName, setNewCategoryName] = useState('');
  
  // State for the "Add Book" form
  const [newBookTitle, setNewBookTitle] = useState('');
  const [newBookAuthor, setNewBookAuthor] = useState(''); // This will hold the selected author ID
  const [newBookCategory, setNewBookCategory] = useState(''); // This will hold the selected category ID
  const [newBookYear, setNewBookYear] = useState('');

  // --- EFFECTS ---
  // "useEffect" runs code when the component first loads.
  // We use it to fetch our data from the API as soon as the page opens.
  useEffect(() => {
    fetchAllData();
  }, []); // The empty array [] means "only run this once on load"

  // Function to fetch (or re-fetch) all data from the API
  const fetchAllData = async () => {
    try {
      const authorsRes = await getAuthors();
      setAuthors(authorsRes.data);

      const categoriesRes = await getCategories();
      setCategories(categoriesRes.data);

      const booksRes = await getBooks();
      setBooks(booksRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // --- HANDLER FUNCTIONS ---
  // These functions are called when you click buttons or submit forms.

  const handleAddAuthor = async (e) => {
    e.preventDefault(); // Stop the form from reloading the page
    try {
      await createAuthor({ name: newAuthorName, bio: '' }); // Send new author to API
      setNewAuthorName(''); // Clear the input box
      fetchAllData(); // Re-fetch all data to show the new author
    } catch (error) {
      console.error('Error adding author:', error);
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      await createCategory({ name: newCategoryName });
      setNewCategoryName('');
      fetchAllData(); // Re-fetch all data
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  const handleAddBook = async (e) => {
    e.preventDefault();
    try {
      // We send the IDs of the selected author and category
      const bookData = {
        title: newBookTitle,
        publicationYear: parseInt(newBookYear),
        author: { id: parseInt(newBookAuthor) }, // NestJS/TypeORM is smart enough to link this
        category: { id: parseInt(newBookCategory) },
      };
      await createBook(bookData);
      
      // Clear the form
      setNewBookTitle('');
      setNewBookAuthor('');
      setNewBookCategory('');
      setNewBookYear('');
      
      fetchAllData(); // Re-fetch all data
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  // Generic delete handler
  const handleDelete = async (type, id) => {
    // Show a confirmation popup before deleting
    if (!window.confirm('Are you sure you want to delete this?')) {
      return;
    }
    try {
      if (type === 'author') await deleteAuthor(id);
      if (type === 'category') await deleteCategory(id);
      if (type === 'book') await deleteBook(id);
      fetchAllData(); // Re-fetch all data
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  // --- JSX (The HTML part) ---
  // This is what React will render to the screen.
  return (
    <div className="App">
      <header>
        <h1>📚 My Digital Bookshelf</h1>
      </header>

      <div className="container">
        {/* --- BOOKS SECTION (MAIN) --- */}
        <div className="section">
          <h2>Books</h2>
          <form onSubmit={handleAddBook} className="add-form">
            <input
              type="text"
              placeholder="Book title"
              value={newBookTitle}
              onChange={(e) => setNewBookTitle(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Year"
              value={newBookYear}
              onChange={(e) => setNewBookYear(e.target.value)}
            />
            <select
              value={newBookAuthor}
              onChange={(e) => setNewBookAuthor(e.target.value)}
              required
            >
              <option value="" disabled>Select author</option>
              {/* Loop over authors state to create <option> tags */}
              {authors.map((author) => (
                <option key={author.id} value={author.id}>
                  {author.name}
                </option>
              ))}
            </select>
            <select
              value={newBookCategory}
              onChange={(e) => setNewBookCategory(e.target.value)}
              required
            >
              <option value="" disabled>Select category</option>
              {/* Loop over categories state to create <option> tags */}
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <button type="submit">Add Book</button>
          </form>

          {/* --- BOOK LIST --- */}
          <ul>
            {books.map((book) => (
              <li key={book.id}>
                <div>
                  <strong>{book.title}</strong> ({book.publicationYear || 'N/A'})
                  <small>
                    by {book.author ? book.author.name : 'Unknown Author'}
                    {' / '}
                    {book.category ? book.category.name : 'Uncategorized'}
                  </small>
                </div>
                <button onClick={() => handleDelete('book', book.id)} className="delete-btn">X</button>
              </li>
            ))}
          </ul>
        </div>

        {/* --- MANAGEMENT SECTIONS (SIDE) --- */}
        <div className="management-sections">
          {/* --- AUTHORS --- */}
          <div className="section">
            <h2>Manage Authors</h2>
            <form onSubmit={handleAddAuthor} className="add-form">
              <input
                type="text"
                placeholder="New author name"
                value={newAuthorName}
                onChange={(e) => setNewAuthorName(e.target.value)}
                required
              />
              <button type="submit">Add Author</button>
            </form>
            <ul>
              {authors.map((author) => (
                <li key={author.id}>
                  {author.name}
                  <button onClick={() => handleDelete('author', author.id)} className="delete-btn">X</button>
                </li>
              ))}
            </ul>
          </div>

          {/* --- CATEGORIES --- */}
          <div className="section">
            <h2>Manage Categories</h2>
            <form onSubmit={handleAddCategory} className="add-form">
              <input
                type="text"
                placeholder="New category name"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                required
              />
              <button type="submit">Add Category</button>
            </form>
            <ul>
              {categories.map((cat) => (
                <li key={cat.id}>
                  {cat.name}
                  <button onClick={() => handleDelete('category', cat.id)} className="delete-btn">X</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;