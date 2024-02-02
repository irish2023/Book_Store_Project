import React from 'react'
import { Link } from 'react-router-dom'
import { PiBookOpenTextLight } from 'react-icons/pi'
import { BiUserCircle } from 'react-icons/bi'
import { AiOutlineEdit } from 'react-icons/ai'
import { BsInfoCircle } from 'react-icons/bs'
import { MdOutlineDelete } from 'react-icons/md'
import BookSingleCard from './BookSingleCard'


const BooksCard = ({ books }) => {
  return (
    <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 '>
      {books.map((item, id) => ( console.log("i am called for edit", item.id),
        <div className='hover:scale-95 transition-all duration-300'>
          < BookSingleCard key={item._id} book={item}/>
        </div>
      ))}
    </div>
  )
}

export default BooksCard