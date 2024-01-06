import Group from "../models/Group.js";
import { getAllGroups, getMyGroups } from "../utils/groupHelper.js";

/**
 * Get all groups
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
const getGroups = async (req, res) => {
  const groups = getAllGroups();
  res.status(200).json(groups);
};

/**
 * Get all groups of user
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns {Array<string>}
 */
const getUserGroups = async (req, res) => {
  const { id } = req.params;
  // if id isn't provide
  if (!id) return res.status(400).json({ message: "Missing resource." });
  // get all user groups
  const groups = await getMyGroups(id);
  // if no groups
  if (!groups) return res.status(400).json([]);
  // return all groups of user
  res.status(200).json(groups);
};

export { getGroups, getUserGroups };
