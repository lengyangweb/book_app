import Group from "../models/Group.js";

// all user group
const GROUP = {
  ADMIN: ["W_ADMIN"],
  USER: ["W_USER"],
  ROLES: ["W_UPLOAD", "W_LOOKUP", "W_REPORT"],
};

/**
 * Get all groups
 * @returns {Array<string>}
 */
const getAllGroups = () => {
  const groups = [...GROUP.ADMIN, ...GROUP.USER, ...GROUP.ROLES].map(
    (group) => ({ label: group, value: group })
  );
  return groups;
};

/**
 * Get all of the admin roles
 * @returns array
 */
const getAdminGroup = async () => {
  return GROUP.ADMIN;
};

/**
 * Get all of the user roles
 * @returns array
 */
const getClientGroup = async () => {
  return GROUP.USER;
};

/**
 * Check if user's admin
 * @param {string} group - group that user hasve
 * @returns {boolean}
 */
const isAdmin = (group) => {
  // if group contain one of the group in admin group
  // then user is admin
  return group.some((role) => GROUP.ADMIN.includes(role));
};

/**
 * Get all group of userId
 * @param {import("mongoose").ObjectId} userId
 */
const getMyGroups = async (userId) => {
  // query user groups
  let groups = await Group.find({ userId });
  if (!groups || !groups.length) return [];

  groups = groups.map(({ group }) => group);
  return groups;
};

export { isAdmin, getAdminGroup, getClientGroup, getAllGroups, getMyGroups };
