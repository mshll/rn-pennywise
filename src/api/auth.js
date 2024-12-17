import instance from "./api";
import { setToken } from "./storage";

// Utility to handle API requests
const handleRequest = async (method, url, data = null, headers = {}) => {
  try {
    const config = { method, url, headers };
    if (data) config.data = data;
    
    // Add debug logs
    console.log('Making request to:', instance.defaults.baseURL + url);
    console.log('Request config:', config);
    
    const response = await instance(config);
    return response.data;
  } catch (error) {
    // Enhanced error logging
    console.error('Full error details:', {
      url: instance.defaults.baseURL + url,
      method: method.toUpperCase(),
      error: error.message,
      response: error.response,
      request: error.request
    });
    throw error;
  }
};

// Login Function with Role Check
const login = async (userInfo) => {
  try {
    const data = await handleRequest("post", "/auth/login", userInfo);
    console.log("Token received:", data.token);

    // Save token
    setToken(data.token);

    // Check user role
    if (data.role === "PARENT") {
      console.log("Logged in as Parent");
    } else if (data.role === "CHILD") {
      console.log("Logged in as Child");
    } else {
      console.warn("Unknown role:", data.role);
    }

    return data; // Return full data for further processing
  } catch (error) {
    console.error("Login failed:", error.response?.data || error.message);
    throw error;
  }
};

// Signup Function
const signup = async (userInfo) => {
  try {
    const data = await handleRequest("post", "/auth/signup", userInfo);
    console.log("Signup successful:", data);
    return data;
  } catch (error) {
    console.error("Signup failed:", error.response?.data || error.message);
    throw error;
  }
};

export { login, signup };
