import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { CircleUserRound } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();

  // State for login form
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // State for registration form (Modal)
  const [modalOpen, setModalOpen] = useState(false);
  const [regUsername, setRegUsername] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [error, setError] = useState("");

  // Function to handle login
  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.status === 200) {
        // Store both JWT token and username in localStorage
        const user = {
          token: data.token,
          username: data.username,
          email: data.email,
        };
        localStorage.setItem("user", JSON.stringify(user));

        navigate("/app/dashboard"); // Redirect after login
      } else {
        setError(data.message); // Show error message if any
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  // Function to handle registration
  const handleRegister = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: regUsername,
          email: regEmail,
          password: regPassword,
        }),
      });

      const data = await response.json();

      if (response.status === 201) {
        setModalOpen(false); // Close modal after successful registration
        alert("Registration successful! You can now log in.");
      } else {
        setError(data.message); // Show error message if any
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div
      className="relative flex min-h-screen bg-cover bg-center justify-center"
      style={{ backgroundImage: "url('/src/assets/images/login-bg.jpg')" }}
    >
      <div className="absolute inset-0 bg-black opacity-80"></div>
      <div className="relative flex flex-col items-center justify-center w-1/3 p-8 text-white m-8">
        <h1 className="text-5xl font-bold mb-1" style={{ color: "#17A2B8" }}>
          Yardrainage
        </h1>
        <h2 className="text-3xl mb-2 font-light" style={{ color: "#17A2B8" }}>
          Maintenance and Services
        </h2>
        <h3 className="text-xl text-white">Inventory Management System</h3>
      </div>
      <div className="relative flex flex-col items-center justify-center p-8 bg-white w-1/4 shadow-lg m-28 rounded-3xl">
        <form className="w-full max-w-sm">
          <div className="mb-4">
            <div
              className="flex justify-center items-center"
              style={{ color: "#17A2B8" }}
            >
              <CircleUserRound className="w-12 h-12" />
            </div>
            <label
              htmlFor="email"
              className="block text-xs font-medium text-gray-600 mb-1"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email..."
              className="w-full px-4 py-2 border text-xs border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-xs font-medium text-gray-600 mb-1"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password..."
              className="w-full px-4 py-2 border text-xs  border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            />
          </div>

          <div className="flex items-center justify-between mb-6">
            <a href="#" className="text-xs text-blue-600 hover:underline">
              Forgot password?
            </a>
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="text-xs text-blue-600 hover:underline"
            >
              Create an account
            </button>
          </div>

          {error && <p className="text-red-500 text-xs">{error}</p>}

          <button
            type="button"
            onClick={handleLogin}
            className="w-full px-4 py-2 text-xs text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Sign In
          </button>
        </form>
      </div>

      {/* Registration Modal */}
      {modalOpen && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl w-1/3">
            <h2 className="text-2xl mb-4">Create an Account</h2>

            <div className="mb-4">
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Username:
              </label>
              <input
                type="text"
                value={regUsername}
                onChange={(e) => setRegUsername(e.target.value)}
                placeholder="Enter your username..."
                className="w-full px-4 py-2 border text-xs border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              />
            </div>

            <div className="mb-4">
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Email:
              </label>
              <input
                type="email"
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                placeholder="Enter your email..."
                className="w-full px-4 py-2 border text-xs border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              />
            </div>

            <div className="mb-6">
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Password:
              </label>
              <input
                type="password"
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                placeholder="Enter your password..."
                className="w-full px-4 py-2 border text-xs border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              />
            </div>

            {error && <p className="text-red-500 text-xs">{error}</p>}

            <div className="flex justify-between">
              <button
                onClick={() => setModalOpen(false)}
                className="text-xs text-blue-600 hover:underline"
              >
                Cancel
              </button>
              <button
                onClick={handleRegister}
                className="px-4 py-2 text-xs text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
