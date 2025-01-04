import React, { useState } from "react";

const Checkout = () => {
  const [projectDetails, setProjectDetails] = useState({
    name: "",
    description: "",
    site: "",
    creator: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]);
  const [items] = useState([
    { code: "T001", name: "Welding Machine", category: "Tools/Equipment" },
    { code: "C001", name: "Cutting Discs", category: "Consumables" },
    { code: "V001", name: "Forklift", category: "Vehicles" },
  ]);

  const handleAddToCart = (item) => {
    setCart([...cart, item]);
  };

  const handleCheckout = () => {
    alert("Checkout successful!");
    setCart([]);
  };

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      {/* Project Details Form */}
      <div className="bg-white p-4 rounded-lg shadow-md space-y-3">
        <h2 className="text-lg font-bold">Project Details</h2>
        <input
          type="text"
          placeholder="Project Name"
          value={projectDetails.name}
          onChange={(e) =>
            setProjectDetails({ ...projectDetails, name: e.target.value })
          }
          className="border p-2 w-full rounded-lg"
        />
        <input
          type="text"
          placeholder="Project Description"
          value={projectDetails.description}
          onChange={(e) =>
            setProjectDetails({
              ...projectDetails,
              description: e.target.value,
            })
          }
          className="border p-2 w-full rounded-lg"
        />
        <input
          type="text"
          placeholder="Project Site"
          value={projectDetails.site}
          onChange={(e) =>
            setProjectDetails({ ...projectDetails, site: e.target.value })
          }
          className="border p-2 w-full rounded-lg"
        />
        <input
          type="text"
          placeholder="Creator Name"
          value={projectDetails.creator}
          onChange={(e) =>
            setProjectDetails({ ...projectDetails, creator: e.target.value })
          }
          className="border p-2 w-full rounded-lg"
        />
      </div>

      {/* Item List */}
      <div className="mt-4 bg-white p-4 rounded-lg shadow-md space-y-3">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border p-2 w-full rounded-lg"
          />
          <button className="bg-gray-200 p-2 rounded-lg">📷 Scan QR</button>
        </div>
        <div className="max-h-48 overflow-y-auto">
          {items
            .filter(
              (item) =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.code.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-2 border-b"
              >
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">Code: {item.code}</p>
                  <p className="text-sm text-gray-500">
                    Category: {item.category}
                  </p>
                </div>
                <button
                  onClick={() => handleAddToCart(item)}
                  className="bg-blue-500 text-white px-3 py-1 rounded-lg text-xs"
                >
                  Add
                </button>
              </div>
            ))}
        </div>
      </div>

      {/* Checkout Cart */}
      <div className="mt-4 bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-bold">Cart</h2>
        {cart.length === 0 ? (
          <p className="text-gray-500">No items added.</p>
        ) : (
          cart.map((item, index) => (
            <div key={index} className="flex justify-between items-center p-2">
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">Code: {item.code}</p>
              </div>
              <button
                onClick={() => setCart(cart.filter((_, idx) => idx !== index))}
                className="text-red-500 text-xs"
              >
                Remove
              </button>
            </div>
          ))
        )}
        {cart.length > 0 && (
          <button
            onClick={handleCheckout}
            className="bg-green-500 text-white w-full py-2 rounded-lg mt-4"
          >
            Confirm Checkout
          </button>
        )}
      </div>
    </div>
  );
};

export default Checkout;
