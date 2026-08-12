import React from 'react'
import { Button, Container } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import { useNavigate } from 'react-router-dom'

const CarouselComponent = ({ topRatedProducts }) => {
    const navigate = useNavigate();

    return (
        <Carousel style={{ justifyContent: 'space-around' }} pause='hover'>
           {topRatedProducts?.map(product =>
               <Carousel.Item key={product.id}>
                   <Container style={{ width: '80rem', display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                       <img style={{ width: '50rem', height: '30rem' }} alt="not found" src={product?.images?.[0]?.image} />
                       <Carousel.Caption className='carousel.caption'>
                        <Button
                            type="button"
                            className='Btn-White-Btnfocus'
                            onClick={() => navigate(`/gamePage/${product?.id}`)}
                            style={{ width: '10rem', background: 'transparent', color: 'white', border: '1px solid rgba(255,255,255,0.5)', fontWeight: 'bold' }}
                        >
                            Play now
                        </Button>
                       </Carousel.Caption>
                   </Container>
               </Carousel.Item>
            )}
        </Carousel>
    );
}

export default CarouselComponent
