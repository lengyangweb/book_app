import userRoute from './userRoute.js';

const register = (app) => {

    // users
    app.use('/api/user', userRoute);

};

export default register;