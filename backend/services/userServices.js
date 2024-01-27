import axios from "axios";
import User from "../models/User.js";

const TEST_URL = "https://jsonplaceholder.typicode.com/users";

/**
 * Get all users from database
 * @returns {Array}
 */
const getUsers = async () => {
  // const response = await axios.get(TEST_URL);
  // const users = response.data;
  const users = await User.find().select("-password");
  return users;
};

const userService = { getUsers };

export default userService;
