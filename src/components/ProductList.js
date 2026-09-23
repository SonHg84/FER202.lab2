import ProductCard from './ProductCard';
import products from '../data/products';
import { Container, Row, Col } from 'react-bootstrap'; 

const ProductList = () => {
  return (
    <Container className="my-4"> 
      <Row>
        {products.map((product) => (
          <Col md={4} key={product.id} className="mb-4">
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductList;