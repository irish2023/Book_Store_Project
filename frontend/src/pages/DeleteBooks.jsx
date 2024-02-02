import React, { useState } from 'react'
import Spinner from '../components/Spinner'
import axios from 'axios'
import { useNavigate,useParams } from 'react-router-dom'
import BackButton from '../components/BackButton'
import { useSnackbar } from 'notistack'


const DeleteBooks = () => {
  const [loading, setLoading] = useState(false);
  const { id }= useParams();
  const navigate = useNavigate();
  const{enqueueSnackbar}=useSnackbar();

  
  const handleDeleteBook = () =>{
    setLoading(true)
    axios.delete(`http://localhost:5000/books/${id}`)
    .then(()=>{
      setLoading(false);
      enqueueSnackbar('Book deleted successfully', {variant:'success'})
      navigate('/')
    })
    .catch((error) =>{
      setLoading(false)
      alert('An error has occur, Please check the console')
      enqueueSnackbar('error',{variant:'error'})
      console.log(error)
    })
  }


  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3x1 my-4'> Delete Book</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-x` w-[600px] p-8 mx-auto'>
        <h3 className='text-2x1'> Are You Sure You Want To Delete This Book?</h3>
        <button className='p-4 bg-red-600 text-white m-8 w-full' onClick={handleDeleteBook}> Yes, Delete it</button>
        </div>
      </div>
  )
}

export default DeleteBooks
