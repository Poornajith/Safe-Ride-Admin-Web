import {set, push, getDatabase, ref} from "firebase/database";
import app from '../FirebaseConfig'
import {useState} from "react";
import {Button, Container, Form} from "react-bootstrap";
import NavBar from "./NavBar";
export default function AddDriver() {
    const db = getDatabase(app)
    let [inputUserEmail, setInputUserEmail] = useState('')
    let [inputUserFirstName, setInputUserFirstName] = useState('')
    let [inputUserLastName, setInputUserLastName] = useState('')
    let [inputUserNIC, setInputUserNIC] = useState('')
    let [inputUserMobile, setInputUserMobile] = useState()


    const saveDriver = async () => {
        const newDriverRef = ref(db, 'pendingDrivers/')
        const pushRef = push(newDriverRef)
        set(pushRef,{
            email:inputUserEmail,
            firstName:inputUserFirstName,
            lastName:inputUserLastName,
            mobile:inputUserMobile,
            nic:inputUserNIC
        }).then(()=>{
            alert('data added')
        })
    }

    return(
        <div>
            <Container>
                <NavBar></NavBar>
                <Form>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="text" placeholder="enter your email here" value={inputUserEmail}
                                      onChange={(e) => setInputUserEmail(e.target.value)}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" placeholder="enter your first name here" value={inputUserFirstName}
                                      onChange={(e) => setInputUserFirstName(e.target.value)}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" placeholder="enter your last name here" value={inputUserLastName}
                                      onChange={(e) => setInputUserLastName(e.target.value)}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Mobile</Form.Label>
                        <Form.Control type="number" placeholder="enter your mobile here" value={inputUserMobile}
                                      onChange={(e) => setInputUserMobile(Number(e.target.value))}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Nic</Form.Label>
                        <Form.Control type="text" placeholder="enter your nic here" value={inputUserNIC}
                                      onChange={(e) => setInputUserNIC(e.target.value)}/>
                    </Form.Group>
                    <Button className="btn btn-primary" onClick={saveDriver}>SAVE USER</Button>
                </Form>
            </Container>

        </div>
    )
}