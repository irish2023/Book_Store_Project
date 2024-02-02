import React, { useState, useEffect } from 'react'
import axios from 'axios'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import { useNavigate, useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack'



const EditBook = () => {
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('')
  const navigate = useNavigate()
  const {id}= useParams();
  const {enqueueSnackbar}= useSnackbar();
  useEffect(()=>{
    setLoading(true);
    axios.get(`http://localhost:5000/books/${id}`)
    .then((response)=>{
      setAuthor(response.data.data.author);
      setPublishYear(response.data.data.publishYear)
      setTitle(response.data.data.title)
      setLoading(false);
    })
    .catch((error)=>{
      setLoading(false);
      alert('An error has occur:, Please check console')
      console.log(error);
    })
  },[])
  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios.put(`http://localhost:5000/books/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book edited successfully', {variant: 'success'})
        navigate('/')
      })
      .catch((error) => {
        setLoading(false);
        alert('An error has occur, Please check console')
        enqueueSnackbar('Error', {variant: 'error'})
        if(error.response){
          console.error('Response data:', error.response.data)
          console.error('Response status:', error.response.data)
          console.error('Response header:', error.response.data)
        } else if(error.request){
          console.error('Request was made but no response was received')
          console.error('Request:', error.request)
        
        } else{
          console.error('Error setting up the request:', error.message)
        }
        console.error('Error config:', error.conifg)
      })
  }
  return (
    console.log(title),
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'> Edit Book</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-x1 w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'> Title </label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full' />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'> Author </label>
          <input
            type='text'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full' />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'> Publish Year </label>
          <input
            type='number'
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full' />
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handleEditBook}>Save</button>
      </div>
    </div>
  )
}


export default EditBook