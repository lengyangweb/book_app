import userRoute from './userRoute.js';
import bookRoute from './bookRouter.js';

const register = (app) => {

    // users
    app.use('/api/users', userRoute);

    // book
    app.use('/api/books', bookRoute);

};

export default register;