import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { handleUserGameInteraction } from '../actions/TagsPlacement'
import {ReactComponent as Coins} from '../svg/coins.svg'
import {ReactComponent as Star} from '../svg/star.svg'

const Product = ({ product }) => {
  return (
      <Card style={{ background:'transparent'}} className='my-3 p-3 rounded' onClick={() => handleUserGameInteraction(product.tags)}>
          <Link to={`/gamePage/${product?.id}/`}>
            <img style={{width:'30rem',height:'15rem',position:"relative"}} src={product?.image} alt = {"cannot be loaded"}/>
            <span style={{position:"absolute",top:"17rem",right:"20%"}}><strong style={{color:"white"}}>{product?.rating}</strong>
            <Star style={{color:"yellow"}}/></span>
          </Link>
          <Card.Body>
              <Link style={{ color: 'white' }} to={'/gamePage'}>
                <Card.Title as="div">
                    <strong>{product?.name}</strong>
                </Card.Title>
                </Link>
            <Card.Text as='div'>
                <div style={{color:'white'}} className='my-3'>
                    {product?.description?.slice(0,70) + "..."}
                </div>
            </Card.Text>
            <Card.Text style={{color:'white'}} as='h3'>
                {product?.price}<Coins/>
            </Card.Text>
          </Card.Body>
      </Card>
  )
}

export default Product
