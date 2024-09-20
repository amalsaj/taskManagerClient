import React, { useState } from "react";
import { registerUser } from "../utils/api";
import { useNavigate, Link } from "react-router-dom";
import { googleSignup } from "../utils/api";
import { login } from "../utils/auth";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await registerUser({ email, password, name });
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Signup failed");
    }
  };

  const handleGoogleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await googleSignup();
      login(response.data.token);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error during Google Login:", error);
      if (error.code === "ERR_NETWORK") {
        alert("Network error. Please check your internet connection.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Signup</h2>
        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Signup
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm">
            Already have an account?{" "}
            <Link to="/" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </div>
        <div className="mt-4">
          <button
            onClick={handleGoogleSignup}
            className="w-full py-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Sign up with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
