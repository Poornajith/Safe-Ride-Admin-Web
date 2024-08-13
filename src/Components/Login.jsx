import {Col, Container, Row ,Form, Button} from "react-bootstrap";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {

    let [email, setUserEmail] = useState('')
    let [password, setPassword] = useState('')

    const navigate = useNavigate()

    const LogIn = async () =>{
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                // Signed in
                const user = userCredential.user;
                // const idToken = await user.getIdToken()
                localStorage.setItem('user id', user)
                if(user.uid === 'rr1RVhX10PWIzPywrrfmczdqfh92'){
                    navigate('/home')
                }
                else{
                    alert('unauthorized Account !')
                }


            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode)
                console.log(errorMessage)
            });
    }

    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <Form>
                            <div className="m-3">
                                <Form.Label>User Email </Form.Label>
                                <Form.Control type={'email'} placeholder={'example@email.com'} value={email}
                                              onChange={(e) => setUserEmail(e.target.value)}/>
                            </div>
                            <div className="m-3">
                                <Form.Label>Password </Form.Label>
                                <Form.Control type={'password'} value={password}
                                              onChange={(e) => setPassword(e.target.value)}/>
                            </div>
                            <div className="ms-3">
                                <Button className="btn btn-primary bg-purple"  onClick={LogIn}>Log In</Button>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>

        </div>
    )
}