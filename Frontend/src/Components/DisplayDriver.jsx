import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const DisplayDriver = () => {
  const location = useLocation();
  const { _id } = location.state || {}; // Retrieve _id from state passed during navigation
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  // Fetch data from the server
  const fetchData = async () => {
    if (!_id) {
      console.log(_id);
      setError("Invalid ID. Unable to fetch driver data.");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/get-driver-message/${_id}`
      ); // Include _id in the API endpoint
      if (response.status == 200) {
        console.log('Response From API', response.data.data);
        setData(response.data.data);
        // console.log(data);
      }
    } catch (err) {
      console.error("Error fetching driver data:", err);
      setError("Failed to fetch driver data");
    }
  };


  useEffect(() => {
    fetchData(); // Fetch data initially
  
    const interval = setInterval(fetchData, 5000); 
  
    return () => clearInterval(interval); 
  }, []); 
  

  // useEffect(
  //   () => {
  //     console.log('Data has been updated',data);
      
  //   } , [data]
  // )
  

 
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f0f2f5",
    padding: "20px",
  };

  const cardStyle = {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    width: "80%",
    maxWidth: "500px",
    textAlign: "center",
  };

  const titleStyle = {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "10px",
  };

  const fieldStyle = {
    marginBottom: "8px",
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={titleStyle}>Driver Details</h2>
        {error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : data ? (
          <>
            <p style={fieldStyle}>
              <strong>Serial No:</strong> {data.license_no}
            </p>
            <p style={fieldStyle}>
              <strong>Type of Vehicle:</strong> {data.type_of_vehicle}
            </p>
            <p style={fieldStyle}>
              <strong>Vehicle Number:</strong> {data.vechicle_no}
            </p>
            <p style={fieldStyle}>
              <strong>Source:</strong> {data.source}
            </p>
            <p style={fieldStyle}>
              <strong>Destination:</strong> {data.destination}
            </p>
            <p style={fieldStyle}>
              <strong>Message:</strong> {data.message}
            </p>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default DisplayDriver;
