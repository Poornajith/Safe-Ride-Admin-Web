import NavBar from "./NavBar";
import {Container} from "react-bootstrap";
import PendingDrivers from "./PendingDrivers";

export default function Home() {
    return(
        <div>
            <NavBar></NavBar>
            <Container>
                <PendingDrivers></PendingDrivers>
            </Container>
        </div>
    )
}