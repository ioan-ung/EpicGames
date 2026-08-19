import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { handleUserGameInteraction } from '../actions/TagsPlacement'
import Coins from '../svg/coins.svg?react'
import Star from '../svg/star.svg?react'
import { useSelector } from 'react-redux'

const Product = ({ product }) => {
  const userDetails = useSelector(store=>store.currentUser.userDetails);
  const isOwned = userDetails?.bought_games?.includes(product?.id);

  return (
    <Card className='store-product-card' onClick={() => handleUserGameInteraction(product.tags)}>
      <Link to={`/gamePage/${product?.id}/`} className="store-product-image-wrap">
        <img src={product?.images?.[0]?.image} alt={product?.name || 'Game cover'} className="store-product-image" />
        <span className="store-product-rating">
          <strong>{product?.rating}</strong>
          <Star />
        </span>
      </Link>

      <Card.Body className="store-product-body">
        <Link to={`/gamePage/${product?.id}/`} className="store-product-title-link">
          <Card.Title as="div" className="store-product-title">{product?.name}</Card.Title>
        </Link>

        <div className="store-product-meta">
          <span>{product?.company}</span>
          <span>{product?.downloads} downloads</span>
        </div>

        <Card.Text as='div' className='store-product-description'>
          {product?.description?.slice(0, 90) + (product?.description?.length > 90 ? '...' : '')}
        </Card.Text>

        {
          !isOwned &&
          <div className="store-product-footer">
            <span className="store-product-price">{product?.price}<Coins /></span>
          </div>
        }
      </Card.Body>
    </Card>
  )
}

export default Product
