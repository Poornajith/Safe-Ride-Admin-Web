import NavBar from "../NavBar";
import {Button, Card, Container} from "react-bootstrap";
import {useEffect, useState} from "react";
import {get, getDatabase, ref} from "firebase/database";
import app from "../../FirebaseConfig";
export default function Users(){

    let[userArray, setUserArray] = useState([])
    const db = getDatabase(app)

    async function FetchUserData(){

        try{
            const userRef = ref(db,'users/')
            const snapshot = await get(userRef)

            if(snapshot.exists()){
                const userIDs = snapshot.val()
                const tempUserIdArray = Object.keys(userIDs).map(allUserIDs => {
                    return {
                        ...userIDs[allUserIDs],
                        userId: allUserIDs
                    }
                })
                setUserArray(tempUserIdArray)
            }

        } catch (e) {
            console.error('Error fetching data:', e);
            return null; // Handle errors gracefully
        }
    }

    return (
        <div>
            <NavBar></NavBar>
            <Container className={'my-3'}>
                <h1 className={'my-3'}>Registered Users in the system</h1>
                <Button onClick={FetchUserData}>Show User List</Button>
                <div className="Row">
                    {
                        userArray.map((item, index) =>
                            <Card key={index} className={'m-2 p-2 bg-glass'}>
                                <Card.Title className={'mt-2'}>User Name : {item.firstName} {item.lastName}</Card.Title>
                                <hr/>
                                <Card.Text>email : {item.email}</Card.Text>
                                <Card.Text>Mobile : {item.mobile}</Card.Text>
                                <Card.Text>NIC : {item.nic}</Card.Text>
                                <Card.Text>Role : {item.role}</Card.Text>
                            </Card>
                        )
                    }
                </div>
            </Container>
        </div>
    )
}