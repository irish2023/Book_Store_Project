import express from "express";
import { Book } from "../Models/bookModels.js";
const router = express.Router();


// Route for Save a new book
router.post('/', async(request,res) => {
    try {
        if(
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ){
            return res.status(400).json({
                message: 'send all required fields:title, author, publishYear'
            })
        }
        const newBook = {
            title:request.body.title,
            author:request.body.author,
            publishYear:request.body.publishYear
        }
        const book = await Book.create(newBook);
        return res.status(201).json(book)
    } catch (err) {
        console.log(err.message);
        res.status(500).json({message:err.message})
    }
})

// route for getting all books
router.get('/', async (request,res) => {
    try {
        const books = await Book.find({});
        res.status(200).json({
            counts: books.length,
            data: books
        })
    } catch (err) {
        console.log(err.message);
        res.status(500).json({message:err.message})
    }
})

// route for getting specific books from database from id
router.get('/:id', async(request,res) => {
    const{ id }= request.params
    try {
        const book = await Book.findById(id)
        res.status(200).json({
            counts: book.length,
            data: book
        })

    } catch (error) {
        console.log(error.messge)
        res.status(500).json({message: error.message})
    }
})

// route for update a book
router.put('/:id', async(request,res) => {
    try {
        if(
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ){
            return res.status(400).json({
                message: 'Send all required fields: title,author,publishYear'
            })
        }
        const { id }= request.params;
        const book = await Book.findByIdAndUpdate(id, request.body);
        if(!book){
            return res.status(404).json({message: 'Book not found'})
        }
        return res.status(200).json({message: 'Book updated sucessfully', Updatedbook:book })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
})

// route for deleting a book
router.delete('/:id', async (request,res) => {
    try {
        const { id } = request.params;
        const result = await Book.findByIdAndDelete(id)
        if(!result){
            res.status(404).json({message: 'Book not found'})
        }
        return res.status(200).json({message: 'Book deleted successfully'})
        
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message
        })
    }
})

export default router;