import React, { useState, useEffect } from "react";
import { Search, Camera, Trash, ShoppingBag } from "lucide-react";
import axios from "axios";

const Project = () => {
  const [projectDetails, setProjectDetails] = useState({
    name: "",
    description: "",
    site: "",
    creator: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch items from backend
  useEffect(() => {
    const fetchItems = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/api/inventory");
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching inventory:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchItems();
  }, []);

  const handleAddToCart = (item) => setCart([...cart, item]);
  const handleCheckout = async () => {
    // Prepare the project data
    const projectData = {
      title: projectDetails.name,
      manager: projectDetails.creator, // Assuming the 'manager' is the creator for now
      creator: projectDetails.creator,
      startDate: projectDetails.startDate, // You should add a startDate input in your form
      endDate: projectDetails.endDate, // You should add an endDate input in your form
      tools: cart.map((item) => item.name), // Get the names of the tools in the cart
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/projects",
        projectData
      );
      if (response.status === 200) {
        alert("Project checkout successful!");
        setCart([]); // Clear the cart after successful checkout
        setProjectDetails({ name: "", description: "", site: "", creator: "" }); // Clear the project details
      }
    } catch (error) {
      console.error("Error saving project:", error);
      alert("An error occurred while saving the project.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-blue-600 text-white py-4 px-6">
        <h1 className="text-xl font-bold">Project Management</h1>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 space-y-4">
        {/* Project Details */}
        <div className="bg-white p-4 rounded-lg shadow space-y-3">
          <h2 className="text-lg font-bold">Project Details</h2>
          {["name", "description", "site", "creator"].map((field, index) => (
            <input
              key={index}
              type="text"
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={projectDetails[field]}
              onChange={(e) =>
                setProjectDetails({
                  ...projectDetails,
                  [field]: e.target.value,
                })
              }
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ))}
        </div>

        {/* Search Items */}
        <div className="bg-white p-4 rounded-lg shadow space-y-4">
          <div className="flex items-center space-x-2">
            <Search className="w-5 h-5 text-gray-600" />
            <input
              type="text"
              placeholder="Search items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {isLoading ? (
            <div className="text-center">Loading...</div>
          ) : (
            <div className="space-y-3 max-h-40 overflow-y-auto">
              {items
                .filter(
                  (item) =>
                    item.name
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    item.code.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-3 border-b"
                  >
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">Code: {item.code}</p>
                    </div>
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="p-2 bg-blue-500 text-white rounded-lg"
                    >
                      Add
                    </button>
                  </div>
                ))}
            </div>
          )}
        </div>

        {/* Cart */}
        <div className="bg-white p-4 rounded-lg shadow space-y-2">
          <h2 className="text-lg font-bold">Cart</h2>
          {cart.length === 0 ? (
            <p className="text-gray-500">No items in the cart.</p>
          ) : (
            cart.map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <div>
                  <p>{item.name}</p>
                  <p className="text-sm text-gray-500">{item.code}</p>
                </div>
                <button
                  onClick={() =>
                    setCart(cart.filter((_, idx) => idx !== index))
                  }
                  className="p-2 text-red-500"
                >
                  <Trash />
                </button>
              </div>
            ))
          )}
          {cart.length > 0 && (
            <button
              onClick={handleCheckout}
              className="w-full py-2 bg-green-500 text-white rounded-lg"
            >
              Confirm Checkout
            </button>
          )}
        </div>
      </div>

      {/* Camera Button */}
      <button className="fixed bottom-4 right-4 p-4 bg-blue-500 text-white rounded-full shadow-lg">
        <Camera className="w-6 h-6" />
      </button>
    </div>
  );
};

export default Project;
