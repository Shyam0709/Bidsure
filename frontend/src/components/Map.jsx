import React, { useState, useEffect } from 'react';

const Map = () => {
  const [country, setCountry] = useState('India');
  const [industry, setIndustry] = useState('Cotton Processing');
  const [locations, setLocations] = useState([]);
  const [sqftRate, setSqftRate] = useState(null);
  const [contractors, setContractors] = useState([]);


  const bestPlaces = {
    India: {
      'Cotton Processing': [
        { lat: 28.7041, lng: 77.1025, name: 'Delhi' },
        { lat: 19.0760, lng: 72.8777, name: 'Mumbai' },
        { lat: 12.9716, lng: 77.5946, name: 'Bangalore' },
        { lat: 22.5726, lng: 88.3639, name: 'Kolkata' },
        { lat: 13.0827, lng: 80.2707, name: 'Chennai' },
      ],
      'Fireworks Manufacturing': [
        { lat: 22.5726, lng: 88.3639, name: 'Kolkata' },
        { lat: 19.0760, lng: 72.8777, name: 'Mumbai' },
        { lat: 28.7041, lng: 77.1025, name: 'Delhi' },
        { lat: 14.5995, lng: 120.9842, name: 'Manila' },
        { lat: 23.6345, lng: 102.5877, name: 'Vietnam' },
      ],
      'Steel Manufacturing': [
        { lat: 22.5726, lng: 88.3639, name: 'Kolkata' },
        { lat: 19.0760, lng: 72.8777, name: 'Mumbai' },
        { lat: 28.7041, lng: 77.1025, name: 'Delhi' },
        { lat: 26.4499, lng: 80.3319, name: 'Lucknow' },
        { lat: 21.1458, lng: 79.0882, name: 'Nagpur' },
      ],
      'Textile Manufacturing': [
        { lat: 19.0760, lng: 72.8777, name: 'Mumbai' },
        { lat: 28.7041, lng: 77.1025, name: 'Delhi' },
        { lat: 12.9716, lng: 77.5946, name: 'Bangalore' },
        { lat: 22.5726, lng: 88.3639, name: 'Kolkata' },
        { lat: 23.2599, lng: 77.4126, name: 'Bhopal' },
      ],
      'ETDC (Electrical, Thermal, and Data Construction)': [
        { lat: 28.7041, lng: 77.1025, name: 'Delhi' },
        { lat: 19.0760, lng: 72.8777, name: 'Mumbai' },
        { lat: 13.0827, lng: 80.2707, name: 'Chennai' },
        { lat: 26.4499, lng: 80.3319, name: 'Lucknow' },
        { lat: 21.1458, lng: 79.0882, name: 'Nagpur' },
      ],
    },
    USA: {
      'Cotton Processing': [
        { lat: 33.4484, lng: -112.0740, name: 'Phoenix, Arizona' },
        { lat: 34.0522, lng: -118.2437, name: 'Los Angeles, California' },
        { lat: 40.7128, lng: -74.0060, name: 'New York, New York' },
        { lat: 41.8781, lng: -87.6298, name: 'Chicago, Illinois' },
        { lat: 29.7604, lng: -95.3698, name: 'Houston, Texas' },
      ],
      'Fireworks Manufacturing': [
        { lat: 36.7783, lng: -119.4179, name: 'California' },
        { lat: 39.8283, lng: -98.5795, name: 'Midwest USA' },
        { lat: 40.7128, lng: -74.0060, name: 'New York' },
        { lat: 34.0522, lng: -118.2437, name: 'Los Angeles' },
        { lat: 25.7617, lng: -80.1918, name: 'Miami, Florida' },
      ],
      'Steel Manufacturing': [
        { lat: 40.7128, lng: -74.0060, name: 'New York, New York' },
        { lat: 41.8781, lng: -87.6298, name: 'Chicago, Illinois' },
        { lat: 33.4484, lng: -112.0740, name: 'Phoenix, Arizona' },
        { lat: 47.6062, lng: -122.3321, name: 'Seattle, Washington' },
        { lat: 29.7604, lng: -95.3698, name: 'Houston, Texas' },
      ],
      'Textile Manufacturing': [
        { lat: 34.0522, lng: -118.2437, name: 'Los Angeles, California' },
        { lat: 36.7783, lng: -119.4179, name: 'California' },
        { lat: 40.7128, lng: -74.0060, name: 'New York, New York' },
        { lat: 41.8781, lng: -87.6298, name: 'Chicago, Illinois' },
        { lat: 29.7604, lng: -95.3698, name: 'Houston, Texas' },
      ],
      'ETDC (Electrical, Thermal, and Data Construction)': [
        { lat: 40.7128, lng: -74.0060, name: 'New York, New York' },
        { lat: 41.8781, lng: -87.6298, name: 'Chicago, Illinois' },
        { lat: 33.4484, lng: -112.0740, name: 'Phoenix, Arizona' },
        { lat: 36.7783, lng: -119.4179, name: 'California' },
        { lat: 29.7604, lng: -95.3698, name: 'Houston, Texas' },
      ],
    },
  };


  const contractorList = [
    { name: 'XYZ Contractors', contact: '123-456-7890', expertise: 'Cotton Processing' },
    { name: 'ABC Industries', contact: '987-654-3210', expertise: 'Textile Machinery' },
    { name: 'Industrial Solutions', contact: '555-555-5555', expertise: 'Construction' },
    { name: 'Fabricators Co.', contact: '444-444-4444', expertise: 'Cotton Manufacturing' },
    { name: 'Tech Contractors', contact: '333-333-3333', expertise: 'Infrastructure' },
    { name: 'Innovative Builders', contact: '221-345-6789', expertise: 'Steel Manufacturing' },
    { name: 'Green Tech Industries', contact: '876-543-2109', expertise: 'Fireworks Manufacturing' },
    { name: 'Super Construction', contact: '333-444-5555', expertise: 'Textile Manufacturing' },
    { name: 'United Developers', contact: '555-666-7777', expertise: 'ETDC' },
    { name: 'Future Projects', contact: '666-777-8888', expertise: 'Textile Manufacturing' },
    { name: 'Elite Builders', contact: '987-987-9876', expertise: 'Steel Manufacturing' },
    { name: 'Fast Construction', contact: '222-222-2222', expertise: 'Cotton Processing' },
    { name: 'Metro Projects', contact: '333-666-7777', expertise: 'Steel Manufacturing' },
    { name: 'Redstone Contractors', contact: '444-777-8888', expertise: 'Textile Manufacturing' },
    { name: 'Next Gen Builders', contact: '555-888-9999', expertise: 'Cotton Processing' },
    { name: 'Prime Infrastructure', contact: '777-888-9999', expertise: 'Fireworks Manufacturing' },
    { name: 'Summit Construction', contact: '222-555-6666', expertise: 'Steel Manufacturing' },
    { name: 'Skyline Industries', contact: '111-222-3333', expertise: 'ETDC' },
    { name: 'Pioneer Engineers', contact: '333-444-5555', expertise: 'Textile Manufacturing' },
    { name: 'Infinity Builders', contact: '666-777-8888', expertise: 'Cotton Processing' },
    { name: 'Peak Performance', contact: '555-333-4444', expertise: 'Fireworks Manufacturing' },
    { name: 'Urban Construction', contact: '999-555-8888', expertise: 'Steel Manufacturing' },
    { name: 'Future-Tech Industries', contact: '777-444-5555', expertise: 'Textile Manufacturing' },
    { name: 'Titan Projects', contact: '666-888-9999', expertise: 'ETDC' },
    { name: 'Prime Contractors', contact: '111-222-3333', expertise: 'Cotton Processing' },
    { name: 'Global Builders', contact: '333-555-7777', expertise: 'Steel Manufacturing' },
    { name: 'Tech Solutions', contact: '444-555-6666', expertise: 'Fireworks Manufacturing' },
    { name: 'Dynamic Developers', contact: '555-777-8888', expertise: 'Textile Manufacturing' },
    { name: 'Oceanic Contractors', contact: '666-777-4444', expertise: 'ETDC' },
  ];

  useEffect(() => {

    setLocations(bestPlaces[country][industry]);
    setContractors(contractorList);
    setSqftRate('₹1500/sqft'); // 
  }, [country, industry]);

  return (
    <div className="bg-black text-white min-h-screen p-8">
      <h1 className="text-3xl mb-6 text-center">Industrial Project Planner</h1>

      <div className="mb-4 flex justify-between items-center">
        <div>
          <label className="mr-2">Select Country: </label>
          <select
            className="bg-gray-800 text-white p-2"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          >
            <option value="India">India</option>
            <option value="USA">USA</option>
          </select>
        </div>

        <div>
          <label className="mr-2">Select Industry: </label>
          <select
            className="bg-gray-800 text-white p-2"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
          >
            {Object.keys(bestPlaces[country]).map((industry) => (
              <option key={industry} value={industry}>
                {industry}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl mb-2">Best Locations for {industry}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {locations.map((location, index) => (
            <div key={index} className="bg-gray-800 p-4 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold">{location.name}</h3>
              <p className="text-sm">Lat: {location.lat}</p>
              <p className="text-sm">Lng: {location.lng}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl mb-2">Contractors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {contractors.map((contractor, index) => (
            <div key={index} className="bg-gray-800 p-4 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold">{contractor.name}</h3>
              <p className="text-sm">Expertise: {contractor.expertise}</p>
              <p className="text-sm">Contact: {contractor.contact}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl">Price Per Sqft: {sqftRate}</h2>
      </div>
    </div>
  );
};

export default Map;
