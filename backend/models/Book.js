import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
    title: { type: String },
    author: { type: String },
    description: { type: String}
},
{
    timestamps: true
}
);

const model = mongoose.model('book', bookSchema);

export default model;