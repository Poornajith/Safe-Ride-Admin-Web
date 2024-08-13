import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import logo from '../assets/logo.svg'
import '../App.css'
export default function NavBar() {
    const navigate = useNavigate()
    return (
        <div>
            <Navbar expand="lg" className="bg-glass mb-4">
                <Container>
                    <Navbar.Brand onClick={() => navigate(`/`)}>
                        <img src={logo} alt="logo" className={'w-20'}/>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link onClick={() => navigate(`/home`)}>Home</Nav.Link>
                            <Nav.Link onClick={() => navigate(`/children`)}>Children</Nav.Link>
                            <Nav.Link onClick={() => navigate(`/users`)}>Users</Nav.Link>
                            <Nav.Link onClick={() => navigate(`/schools`)}>Schools</Nav.Link>
                            <Nav.Link onClick={() => navigate(`/buses`)}>Buses</Nav.Link>
                            <Nav.Link className={'add-driver'} onClick={() => navigate(`/add-driver`)}>Add Driver</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}