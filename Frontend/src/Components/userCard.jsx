import React, { useState } from 'react';
import { FaEdit } from 'react-icons/fa'; // Importing an edit icon from react-icons
import axios from 'axios'; // Axios for the API call

const UserCard = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false); // To toggle between viewing and editing
  const [newMessage, setNewMessage] = useState(user.message || 'No message provided'); // Holds the edited message
  const [errorMessage, setErrorMessage] = useState(''); // Holds error message, if any

  // Handle the change in message input field
  const handleMessageChange = (e) => {
    setNewMessage(e.target.value);
  };

  // Handle the click on the edit icon
  const handleEdit = () => {
    setIsEditing(true); // Switch to edit mode
    setNewMessage(''); // Clear the message box when editing
  };

  // Handle the save action after editing the message
  const handleSave = async () => {
    try {
      if (!user._id) {
        setErrorMessage('User ID is missing');
        return;
      }

      // Make the PUT API call to update the message
      const response = await axios.put(
        'http://localhost:3000/api/v1/add-police-message',
        { message: newMessage },
        {
          headers: { id: user._id }, // Pass user id in the header
        }
      );

      console.log('Message updated:', response.data);

      // After saving, reflect the change in the UI
      setIsEditing(false); // Switch back to view mode
      setErrorMessage(''); // Clear any previous error message
    } catch (error) {
      console.error('Error updating message:', error);
      setErrorMessage('Failed to update message');
    }
  };

  return (
    <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 w-72">
      <ul className="list-group list-group-flush">
        {/* License No */}
        <li className="list-group-item p-4">
          <span className="text-gray-700">
            <span className="font-medium">License No:</span> {user.license_no || 'N/A'}
          </span>
        </li>

        {/* Vehicle No */}
        <li className="list-group-item p-4">
          <span className="text-gray-700">
            <span className="font-medium">Vehicle No:</span> {user.vechicle_no || 'N/A'}
          </span>
        </li>

        {/* Type of Vehicle */}
        <li className="list-group-item p-4">
          <span className="text-gray-700">
            <span className="font-medium">Type of Vehicle:</span> {user.type_of_vehicle || 'N/A'}
          </span>
        </li>

        {/* Source */}
        <li className="list-group-item p-4">
          <span className="text-gray-700">
            <span className="font-medium">Source:</span> {user.source || 'N/A'}
          </span>
        </li>

        {/* Destination */}
        <li className="list-group-item p-4">
          <span className="text-gray-700">
            <span className="font-medium">Destination:</span> {user.destination || 'N/A'}
          </span>
        </li>

        {/* Message */}
        <li className="list-group-item p-4 flex justify-between items-center">
          {isEditing ? (
            // Input field for editing message
            <input
              type="text"
              value={newMessage}
              onChange={handleMessageChange}
              className="p-2 border border-gray-300 rounded-md w-full"
              placeholder="Enter new message" // Add a placeholder
            />
          ) : (
            <span className="text-gray-700">
              <span className="font-medium">Message:</span> {user.message || 'No message provided'}
            </span>
          )}
          <div className="flex space-x-2">
            {isEditing ? (
              <button
                onClick={handleSave}
                className="text-green-500 hover:text-green-700 cursor-pointer"
              >
                Save
              </button>
            ) : (
              <FaEdit className="text-gray-500 cursor-pointer hover:text-gray-700" onClick={handleEdit} />
            )}
          </div>
        </li>
      </ul>

      {/* Display Error Message if any */}
      {errorMessage && (
        <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
      )}

      <p className="text-gray-500 text-sm mt-4 border-t pt-3">
        <span className="font-medium">Joined:</span>{' '}
        {user.createdAt ? new Date(user.createdAt).toLocaleString() : 'N/A'}
      </p>
    </div>
  );
};

export default UserCard;