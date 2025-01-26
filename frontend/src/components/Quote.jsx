import React, { useState } from 'react';

const Quote = () => {
  const [fields, setFields] = useState(Array(5).fill(0));
  const [total, setTotal] = useState(0);

  const [labourSearch, setLabourSearch] = useState('');
  const [materialSearch, setMaterialSearch] = useState('');

  const handleInputChange = (index, value) => {
    const newFields = [...fields];
    newFields[index] = parseFloat(value) || 0;
    setFields(newFields);
    setTotal(
      newFields[0] + newFields[1] + newFields[2] + newFields[3] + newFields[4] * 10000
    );
  };

  const labourProfiles = [
    { name: 'Raj Singh', skill: 'Carpenter', experience: '5 years', wage: '₹800/day' },
    { name: 'Praveen', skill: 'Electrician', experience: '3 years', wage: '₹750/day' },
    { name: 'Ahmed', skill: 'Plumber', experience: '7 years', wage: '₹850/day' },
    { name: 'Alice White', skill: 'Painter', experience: '4 years', wage: '₹700/day' },
    { name: 'Michael Green', skill: 'Mason', experience: '6 years', wage: '₹900/day' },
  ];
  

  const stores = [
    {
      name: 'Hike Store',
      materials: [
        { name: 'Cement', price: '₹500 per bag' },
        { name: 'Steel Rods', price: '₹3000 per ton' },
        { name: 'Bricks', price: '₹5 per brick' },
      ],
    },
    {
      name: 'BuildMax Store',
      materials: [
        { name: 'Sand', price: '₹1500 per truckload' },
        { name: 'Gravel', price: '₹2000 per truckload' },
        { name: 'Tiles', price: '₹20 per piece' },
        { name: 'Paint', price: '₹350 per bucket' },
      ],
    },
    {
      name: 'ConstructoMart',
      materials: [
        { name: 'Wood Planks', price: '₹1000 per bundle' },
        { name: 'Nails', price: '₹50 per box' },
        { name: 'Glass Sheets', price: '₹1200 per sheet' },
      ],
    },
    {
      name: 'Building Supplies Co.',
      materials: [
        { name: 'Concrete', price: '₹2000 per cubic meter' },
        { name: 'Aluminum', price: '₹4000 per ton' },
        { name: 'Paint', price: '₹350 per bucket' },
      ],
    },
    {
      name: 'Mega Materials',
      materials: [
        { name: 'Tiles', price: '₹15 per piece' },
        { name: 'Sand', price: '₹1400 per truckload' },
        { name: 'Bricks', price: '₹6 per brick' },
      ],
    },
    {
      name: 'Material World',
      materials: [
        { name: 'Cement', price: '₹450 per bag' },
        { name: 'Gravel', price: '₹1800 per truckload' },
        { name: 'Steel Rods', price: '₹2800 per ton' },
      ],
    },
  ];
  

  const filteredLabourProfiles = labourProfiles.filter((labour) =>
    labour.name.toLowerCase().includes(labourSearch.toLowerCase()) ||
    labour.skill.toLowerCase().includes(labourSearch.toLowerCase())
  );

  const filteredRawMaterials =stores.filter((material) =>
    material.name.toLowerCase().includes(materialSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black text-white grid grid-cols-3 gap-4 p-4">
      {/* Quotation Generation */}
      <div className="p-4 border rounded-lg border-gray-700">
        <h2 className="text-xl font-bold mb-4">Quotation Generator</h2>
        {['Bricks Price', 'Labour Price', 'Cement Price', 'Sand Price', 'Time Needed (Months)'].map((label, index) => (
          <div key={index} className="mb-2">
            <label className="block text-sm font-medium mb-1">
              {label}:
            </label>
            <input
              type="text"
              value={fields[index]}
              onChange={(e) => handleInputChange(index, e.target.value)}
              className="w-full px-2 py-1 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
        ))}
        <div className="mt-4 text-lg font-semibold">
          Quotation Amount: <span className="text-green-500">₹{total.toFixed(2)}</span>
        </div>
      </div>

      {/* Labour Profiles */}
      <div className="p-4 border rounded-lg border-gray-700">
        <h2 className="text-xl font-bold mb-4">Labour Profiles</h2>
        <input
          type="text"
          placeholder="Search by name or skill"
          value={labourSearch}
          onChange={(e) => setLabourSearch(e.target.value)}
          className="w-full px-2 py-1 mb-4 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:ring focus:ring-blue-500"
        />
       <div className="space-y-4">
  {filteredLabourProfiles.map((labour, index) => (
    <div key={index} className="bg-gray-800 p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold">{labour.name}</h3>
      <p>Skill: {labour.skill}</p>
      <p>Experience: {labour.experience}</p>
      <p>Wage: {labour.wage}</p>
      <button className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white py-1 px-2 rounded">
        Hire
      </button>
    </div>
  ))}
</div>

      </div>

      {/* Raw Materials Listing */}
      <div className="p-4 border rounded-lg border-gray-700">
  <h2 className="text-xl font-bold mb-4">Raw Materials</h2>
  <input
    type="text"
    placeholder="Search by material name"
    value={materialSearch}
    onChange={(e) => setMaterialSearch(e.target.value)}
    className="w-full px-2 py-1 mb-4 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:ring focus:ring-blue-500"
  />
  {stores.map((store, index) => (
    <div key={index} className="mb-6">
      <h3 className="text-lg font-semibold mb-2">{store.name}</h3>
      <ul className="space-y-2">
        {store.materials
          .filter((material) =>
            material.name.toLowerCase().includes(materialSearch.toLowerCase())
          )
          .map((material, idx) => (
            <li
              key={idx}
              className="bg-gray-800 p-3 rounded flex justify-between items-center"
            >
              <span>{material.name}</span>
              <span className="text-green-500">{material.price}</span>
            </li>
          ))}
      </ul>
    </div>
  ))}
</div>

    </div>
  );
};

export default Quote;
