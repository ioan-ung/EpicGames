import React from 'react'
import { Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Search from '../svg/search.svg?react'


const SearchBox = () => {

  const navigate = useNavigate()
  const [keyword,setKeyword] = useState("")
  const handleSubmit = async(e) =>{
    e.preventDefault()
    navigate(`/listGame/?keyword=${keyword}&page=1`)
  }

  return (
    <Form onSubmit={handleSubmit} className="navbar-search">
        <Search className="navbar-search-icon" />
        <Form.Control
            type='text'
            onChange={(e) => setKeyword(e.target.value)}
            className="navbar-search-input"
            placeholder='Search..'
        />
        <button type="submit" className="navbar-search-submit" aria-label="Search">
            <Search />
        </button>
    </Form>
  )
}

export default SearchBox
