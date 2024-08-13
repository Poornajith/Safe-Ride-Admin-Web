import NavBar from "../NavBar";
import {Container} from "react-bootstrap";
import District from "./District";

export default function Schools(){
    return (
        <div>
            <NavBar></NavBar>
            <Container>
                <h1>Schools that Busses Already Available</h1>
                <District></District>
            </Container>
        </div>
    )
}