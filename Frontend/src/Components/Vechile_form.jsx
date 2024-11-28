import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for the API call

const VehicleForm = () => {
  const navigate = useNavigate();
  const [vehicleType, setVehicleType] = useState('');
  const [serialNo, setSerialNo] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // State for error handling

  const handleStart = async () => {
    // Reset states before submission
    setErrorMessage('');
    
    // Check if all fields are filled
    if (vehicleType && serialNo && vehicleNumber && source && destination) {
      try {
        // Send data to the API
        const response = await axios.post('http://localhost:3000/api/v1/add-user-data', {
          license_no: serialNo,
          type_of_vehicle: vehicleType,
          vechicle_no: vehicleNumber,
          source,
          destination,
        });

        // Extract _id from the response
        const { _id } = response.data;

        console.log(_id) ;
        // Navigate with _id passed in the state
        navigate('/display-driver', {
          state: { _id },
        });
      } catch (error) {
        console.error('Error submitting vehicle data:', error);
        setErrorMessage('Failed to submit vehicle data. Please try again.');
      }
    } else {
      setErrorMessage('Please fill in all fields'); // Alert user to fill in all fields
    }
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f0f2f5',
  };

  const formContainerStyle = {
    maxWidth: '500px',
    width: '100%',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  };

  const formGroupStyle = {
    marginBottom: '15px',
  };

  const labelStyle = {
    display: 'block',
    fontWeight: 'bold',
    marginBottom: '5px',
  };

  const inputStyle = {
    width: '100%',
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '16px',
  };

  const buttonGroupStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
  };

  const buttonStyle = {
    width: '100%',
    padding: '10px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  };

  return (
    <div style={containerStyle}>
      <div style={formContainerStyle}>
        <form>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Serial No:</label>
            <input
              type="text"
              value={serialNo}
              onChange={(e) => setSerialNo(e.target.value)}
              placeholder="Enter serial number"
              style={inputStyle}
            />
          </div>

          <div style={formGroupStyle}>
            <label style={labelStyle}>Type of Vehicle:</label>
            <select
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              style={inputStyle}
            >
              <option value="">Select type</option>
              <option value="ambulance">Ambulance</option>
              <option value="firetruck">Firetruck</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div style={formGroupStyle}>
            <label style={labelStyle}>Vehicle Number:</label>
            <input
              type="text"
              value={vehicleNumber}
              onChange={(e) => setVehicleNumber(e.target.value)}
              placeholder="Enter vehicle number"
              style={inputStyle}
            />
          </div>

          <div style={formGroupStyle}>
            <label style={labelStyle}>Source:</label>
            <input
              type="text"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              placeholder="Enter source"
              style={inputStyle}
            />
          </div>

          <div style={formGroupStyle}>
            <label style={labelStyle}>Destination:</label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Enter destination"
              style={inputStyle}
            />
          </div>

          <div style={buttonGroupStyle}>
            <button
              type="button"
              onClick={handleStart}
              style={buttonStyle}
            >
              Start
            </button>
          </div>
        </form>

        {/* Display an error message if the form submission failed */}
        {errorMessage && (
          <div style={{ marginTop: '20px', color: 'red' }}>
            {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default VehicleForm;