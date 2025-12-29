import React from 'react'
import { Button, Container } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom'

const CarouselComponent = ({ topRatedProducts }) => {
    return (
        <Carousel  style={{justifyContent:'space-around'}} pause='hover'>
           {topRatedProducts?.map(product=>
               <Carousel.Item key={product.id}>
                   <Container style={{ width: '80rem', display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                       <img style={{ width: '50rem',height:'30rem' }} alt = "not found" src={product?.image} />
                       <Carousel.Caption className='carousel.caption'>
                        <Button className='Btn-White-Btnfocus' style={{ width: '10rem', background: 'transparent', color: 'white', border: 'none', fontWeight: 'bold' }}>
                                <Link style = {{color:"gray"}}to = {`/gamePage/${product?.id}`}>Play now</Link>
                        </Button>
                       </Carousel.Caption>
                   </Container>
               </Carousel.Item>
            )}
        
        </Carousel>
    );
}

export default CarouselComponent
