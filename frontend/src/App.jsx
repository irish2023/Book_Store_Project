import React from "react";
import {Routes, Route} from 'react-router-dom'
import CreateBooks from "./pages/CreateBooks";
import EditBook from "./pages/EditBook";
import Home from "./pages/Home";
import DeleteBooks from "./pages/DeleteBooks";
import ShowBook from "./pages/ShowBook";


const App = () => {
  return(
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/books/create" element={<CreateBooks />} />
      <Route path="/books/details/:id" element={<ShowBook />} />
      <Route path="/books/edit/:id" element={<EditBook />} />
      <Route path="/books/delete/:id" element={<DeleteBooks />} />
    </Routes>
  )
  }

  export default App