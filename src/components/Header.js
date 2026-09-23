import { Container, Nav, Navbar } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
function Header() {
    return (
        <Container className="text-center">
            <div>HEADER</div>
            <Navbar className="d-flex align-items-center justify-content-center">
                <Navbar.Brand href="#home">
                    <FaStar></FaStar>
                    SHOP FASHION
                </Navbar.Brand>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#home">

                        </Nav.Link>
                        <Nav.Link href="#link">Home</Nav.Link>
                        <Nav.Link href="#link">Products</Nav.Link>
                        <Nav.Link href="#link">Men</Nav.Link>
                        <Nav.Link href="#link">Woman</Nav.Link>
                        <Nav.Link href="#link">Contact</Nav.Link>
                        <Nav.Link href="#link">
                            <FaShoppingCart /> Cart (0)
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>


        </Container>
    );
}

export default Header;