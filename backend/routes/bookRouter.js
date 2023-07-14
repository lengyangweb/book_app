import express from 'express';
import { addBook, deleteBook, getBook, getBooks, updateBook } from '../controllers/bookController.js';

const router = express.Router();

router.route('/').get(getBooks).post(addBook);
router.route('/:id').get(getBook).put(updateBook).delete(deleteBook);

export default router;