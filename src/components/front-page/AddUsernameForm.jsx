// AddUsernameForm.jsx

import { useState } from 'react';
import { post } from '../../services/authService';
import './AddUsernameForm.css'

function AddUsernameForm({ onUsernameAdded }) {
  const [username, setUsername] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to the correct server endpoint (/add-username)
      const response = await post('/users/add-username', { username });
      if (response.status === 200) {
        onUsernameAdded();
      } else {
        console.error('Failed to add username:', response.statusText);
        setErrorMessage('Username already in use.'); // Set error message
      }
    } catch (error) {
      console.error('Error adding username:', error);
      setErrorMessage('Username already in use.'); // Set error message
    }
  };

  const handleUsernameChange = (e) => {
    const inputUsername = e.target.value;
    setUsername(inputUsername);
    setIsFormValid(validateUsername(inputUsername));
    setErrorMessage(''); // Clear error message when username changes
  };

  const validateUsername = (inputUsername) => {
    // Define validation rules here
    const minLength = 3;
    const maxLength = 20;
    const regexPattern = /^[a-zA-Z0-9_]*$/;

    if (
      inputUsername.length >= minLength &&
      inputUsername.length <= maxLength &&
      regexPattern.test(inputUsername)
    ) {
      return true; // Username is valid
    }
    return false; // Username is invalid
  };

  return (
    <div className='form-containter'>
        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={handleUsernameChange}
            />
            <button type="submit" disabled={!isFormValid}>
              Submit
            </button>
          </label>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <div className="notes">
            <ul>
              <li>Minimum length of 3 characters</li>
              <li>Maximum length of 20 characters</li>
              <li>Only alphanumeric characters and underscores allowed</li>
            </ul>
          </div>
        </form>
    </div>
  );
}

export default AddUsernameForm;
