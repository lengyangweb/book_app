const ADMIN_GROUP = ['W_ADMIN'];
const USER_GROUP = ['W_USER'];

const getAdminGroup = async () => {
    return ADMIN_GROUP;
}

const getClientGroup = async () => {
    return USER_GROUP;
}

const isAdmin = (group) => {
    // if group contain one of the group in admin group
    // then user is admin
    return group.forEach(role => ADMIN_GROUP.includes( role));
}