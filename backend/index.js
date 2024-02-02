import express from 'express';
import { PORT,mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import { Book } from './Models/bookModels.js';
import bookRouter from './routes/booksRoute.js'
import cors from 'cors'


const app = express()

app.use(express.json())
app.use(cors())
//app.use(cors({
  //  origin: 'http://localhost:3000',
    //methods: ['GET','POST','DELETE','PUT'],
    //allowedHeaders: ['Content-Type'],
//}))

app.get('/', (request,response) => {
    console.log(request)
    return response.status(900).send('welcome to MERN Stack Tutorial')
});


app.use('/books', bookRouter)

mongoose.connect(mongoDBURL)
    .then(()=>{
        console.log('App is connected to Database');
        app.listen(PORT, ()=>{
            console.log(`App is listening to port:${PORT}`)
        })
    })
    .catch((err)=>{
        console.log(err)
    })