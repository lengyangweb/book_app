
// all user group
const GROUP = {
    ADMIN: ['W_ADMIN'],
    USER: ['W_USER']
}

/**
 * Get all of the admin roles
 * @returns array
 */
const getAdminGroup = async () => {
    return GROUP.ADMIN;
}

/**
 * Get all of the user roles
 * @returns array
 */
const getClientGroup = async () => {
    return GROUP.USER;
}

/**
 * Check if user's admin
 * @param {*} group - group that user hasve
 * @returns boolean
 */
const isAdmin = (group) => {
    // if group contain one of the group in admin group
    // then user is admin
    return group.some(role => GROUP.ADMIN.includes(role));
}

export {  isAdmin, getAdminGroup, getClientGroup };