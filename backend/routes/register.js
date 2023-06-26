import userRoute from './userRoute.js';

const register = (app) => {

    // users
    app.use('/api/users', userRoute);

};

export default register;