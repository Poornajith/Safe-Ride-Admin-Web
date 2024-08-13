import {useState} from "react";
import {Button, Card, Container} from "react-bootstrap";
import {get, getDatabase, ref} from "firebase/database";
import app from "../../FirebaseConfig";
import NavBar from "../NavBar";

export default function Children() {

    let [childrenIDArray , setChildrenIdArray] = useState([])

    const db = getDatabase(app)
    async function FetchChildrenData(){

        try{
            const childrenRef = ref(db,'children/')
            const snapshot = await get(childrenRef)

            if(snapshot.exists()){
                const childrenIds = snapshot.val()
                const tempChildrenIdArray = Object.keys(childrenIds).map(allChildrenIds => {
                    return {
                        ...childrenIds[allChildrenIds],
                        childId: allChildrenIds
                    }
                })
                setChildrenIdArray(tempChildrenIdArray)
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
                <h1 className={'my-3'}>Registered Children in the system</h1>
                <Button onClick={FetchChildrenData}>Show Children List</Button>
                <div className="Row">
                    {
                        childrenIDArray.map((item, index) =>
                            <Card key={index} className={'m-2 p-2 bg-glass'}>
                                <Card.Title className={'mt-2'}>Child Name : {item.name}</Card.Title>
                                <hr/>
                                <Card.Text>Parent Id : {item.parentId}</Card.Text>
                                <Card.Text>School Id : {item.schoolId}</Card.Text>
                            </Card>
                        )
                    }
                </div>
            </Container>
        </div>
    )
}