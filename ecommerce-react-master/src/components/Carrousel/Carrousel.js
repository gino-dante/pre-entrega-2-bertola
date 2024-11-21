import './Carrousel.css';
import Carousel from 'react-bootstrap/Carousel'

const Carrousel = () => {

    return (
        <Carousel fade className='carrousel-main'>
            <Carousel.Item>
                <img
                    className="d-block w-100 img-carrousel item-carrousel-1"
                    src="../assets/images/carrousel/bicicleta-y-paisaje.jpg"
                    alt="First slide"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100 img-carrousel item-carrousel-2"
                    src="../assets/images/carrousel/ciclismo-de-montania.jpg"
                    alt="Second slide"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100 img-carrousel item-carrousel-3"
                    src="../assets/images/carrousel/competicion-ciclismo.jpg"
                    alt="Third slide"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100 img-carrousel item-carrousel-4"
                    src="../assets/images/carrousel/pedaleando-por-montania.jpg"
                    alt="Third slide"
                />
            </Carousel.Item>
        </Carousel>
    )
}

export default Carrousel;