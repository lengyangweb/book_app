import gravatar from 'gravatar-api';

/**
 * Generate an avatar picture
 * @param {*} email 
 * @returns avatar string
 */
export const generateGravatar = (email) => {
  try {
    // get an avatar from gravatar api
    const avatar = gravatar.imageUrl({ email });
    return avatar; // return avatar hash
  } catch (error) {
    console.error(`Fail trying to generate a gravatar`, error);
  }
}