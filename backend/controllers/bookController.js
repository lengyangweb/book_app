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
        const book = await Book.findById(id);

        if (!book) {
            return res.status(400).json({ message: "No book found." });
        }

        return res.status(200).json(book);
        
    } catch (error) {
        console.error(error);

        return res.status(500);
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

    const { id } = req.params;

    try {
        
        // find book and update
        const book = await Book.findByIdAndUpdate(id, req.body);

        // return updated book
        return res.status(200).json({ book });

    } catch (error) {
        console.error(error);

        return res.status(500);
    }

});

// @desc    delete a book
// @route   /api/books/:id
// @access  Private
const deleteBook = asyncHandler(async (req, res) => {

    const { id } = req.params;

    try {
        
        // find book and delete
        const result = await Book.findByIdAndDelete(id);

        return res.status(200).json({ result });
        
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