import React from 'react'
import { Button, Container } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import { useNavigate } from 'react-router-dom'

const CarouselComponent = ({ topRatedProducts }) => {
    const navigate = useNavigate();

    return (
        <Carousel className='home-carousel' pause='hover'>
           {topRatedProducts?.map(product =>
               <Carousel.Item key={product.id}>
                   <Container fluid className='carousel-item-inner'>
                       <img className='carousel-item-img' alt="not found" src={product?.images?.[0]?.image} />
                       <Carousel.Caption className='carousel-caption' style={{ zIndex: 5 }}>
                        <Button
                            type="button"
                            className='Btn-White-Btnfocus'
                            onClick={() => navigate(`/gamePage/${product?.id}`)}
                            style={{ position: 'relative', zIndex: 5, width: '10rem', background: 'transparent', color: 'white', border: '1px solid rgba(255,255,255,0.5)', fontWeight: 'bold' }}
                        >
                            Shop now
                        </Button>
                       </Carousel.Caption>
                   </Container>
               </Carousel.Item>
            )}
        </Carousel>
    );
}

export default CarouselComponent
