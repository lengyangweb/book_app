
const validatePassword = (password) => {
    const passwordChars = password.split('');
    const specialChars = ['!','@','#','$','%','^','&','*','(',')','_','-','+','='];
    
    if (passwordChars.length < 8) {
        return 'Password must be at least 8 characters long.';
    }
    
    if (!passwordChars.some((char) => specialChars.includes(char))) {
        return 'Password must contain at least 1 or more special characters.';
    }

    return '';
}

export { validatePassword };