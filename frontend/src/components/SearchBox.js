import React from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'


const SearchBox = () => {

  const navigate = useNavigate()
  const [keyword,setKeyword] = useState("")
  const handleSubmit = async(e) =>{
    e.preventDefault()
    navigate(`/listGame/?keyword=${keyword}&page=1`)
  }

  return (
    <Form onSubmit={handleSubmit}>
        <Row>
            <Col>
                <Form.Control type='text' onChange = {(e)=>setKeyword(e.target.value)} style = {
                    {   
                        backgroundColor:"transparent",
                        borderRadius:"100px",
                        color:"white",
                        paddingLeft:"1em"
                    }} placeholder='Search..'/>
                
            </Col>

            <Col>
                <Button type = "submit" className='p-2 Btn-White-Btnfocus'>Submit</Button>
            </Col>
        </Row>
    </Form>
  )
}

export default SearchBox
