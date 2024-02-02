import React, { useEffect, useState } from 'react';
import axios from "axios";
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md'
import BooksCard from '../components/home/BooksCard';
import BooksTable from '../components/home/BooksTable';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false)
  const [showType, setShowType] = useState('table')

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:5000/books')
      .then((response) => {
        setBooks(response.data.data)
        setLoading(false);
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }, [])
  return (
    <div className='p-4'>
      <div className='flex justify-center items-center gap-x-4'>
        <button className='border-2 border-gray-500 hover:bg-sky-300 px-4 py-1 rounded-full ' onClick={() => setShowType('table')}>
          Table
        </button>
        <button className='border-2 border-gray-500 hover:bg-sky-300 px-4 py-1 rounded-full' onClick={() => setShowType('card')}>
          Card
        </button>
       </div>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8'>Books List</h1>
        <Link to='/books/create'>
          <MdOutlineAddBox className='text-sky-800 text-4xl' />
        </Link>
      </div>
      {loading ? <Spinner /> : showType === 'table' ? (<BooksTable books={books} />) : (<BooksCard books={books} />)}
    </div>
  )
}

export default Home