import asyncHandler from 'express-async-handler';
import Book from '../models/Book.js';

// @desc    get all books
// @route    /api/books
// @access  Private
const getBooks = asyncHandler(async (req, res) => {

    try {

        // request all books
        const books = await Book.find();

        res.status(200).json(books);
        
    } catch (error) {
        console.error(error);

        return;
    }

});

// @desc    Get a book
// @router  /api/books/:id
// @access  Private
const getBook = asyncHandler(async (req, res) => {

    const { id } = req.params;
    
    try {

        // request a book
        const book = await Book.findOne({ _id: id });

        if (!book) {
            res.status(401);
            throw new Error("No book found.");
        }

     res.status(200).json(book);
        
    } catch (error) {
        console.error(error);

        return;
    }

});

// @desc    add book
// @route   /api/users
// @access  Private
const addBook = asyncHandler(async (req, res) => {

    const { title } = req.body

    const bookExist = await Book.findOne({ title });

    if (bookExist) {
        res.status(400);
        throw new Error('Book already exist.');
    }

    const book = await Book.create({
        title: req.body.title,
        description: req.body.description,
        author: req.body.author,
    });

    res.status(200).json(book);

});

// @desc    Update a book
// @route   /api/users
// @access  Private
const updateBook = asyncHandler(async (req, res) => {

    const { title } = req.body;

    try {
        
        let book = await Book.findOne({  title });

        book = {
            title: req.body.title,
            description: req.body.description,
            author: req.body.author
        };

        book.save();

        return book;

    } catch (error) {
        console.error(error);

        return;
    }

});

// @desc    delete a book
// @route   /api/books/:id
// @access  Private
const deleteBook = asyncHandler(async (req, res) => {

    const { _id } = req.body._id;

    try {

        const bookExist = await Book.findOne({ _id })

        if (!bookExist) {
            res.status(400);
            throw new Error('Book not found.');
        }
        
        const result = await Book.findOneAndDelete({ _id });

        return result;
        
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }

})

export { 
    getBooks, 
    getBook,
    addBook,
    updateBook,
    deleteBook
};