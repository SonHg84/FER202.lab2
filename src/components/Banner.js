import Container from 'react-bootstrap/Container';
import Carousel from 'react-bootstrap/Carousel';


function CarouselBanner() {
    const imageStyle = {
        height: '350px',
        objectFit: 'cover',
    };

    return (
        <Container fluid className='p-0'>
            <p className='text-center'>PROMATION BANNER</p>
            <Carousel>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="./Images/banner1.jpg"
                        alt="Pizza House — banner 1"
                        style={imageStyle}
                    />
                    <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="./Images/banner2.jpg"
                        alt="Pizza House — banner 1"
                        style={imageStyle}
                    />
                    <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>        
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="./Images/banner3.jpg"
                        alt="Pizza House — banner 1"
                        style={imageStyle}
                    />
                    <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </Container>
    );
}

export default CarouselBanner;