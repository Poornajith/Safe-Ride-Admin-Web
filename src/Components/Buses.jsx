import NavBar from "./NavBar";
import {Button, Card, Container} from "react-bootstrap";
import {useState} from "react";
import {get, getDatabase, ref} from "firebase/database";
import app from "../FirebaseConfig";

export default function Buses(){

    let [busList , setBusList] = useState([])
    const db = getDatabase(app)

    async function FetchBusData(){

        try{
            const busesRef = ref(db,'busses/')
            const snapshot = await get(busesRef)

            if(snapshot.exists()){
                const busIds = snapshot.val()
                const temBusArray = Object.keys(busIds).map(allBusIds => {
                    return {
                        ...busIds[allBusIds],
                        schoolId: allBusIds
                    }
                })
                setBusList(temBusArray)
            }

        } catch (e) {
            console.error('Error fetching data:', e);
            return null; // Handle errors gracefully
        }
    }

    return (
        <div>
            <NavBar></NavBar>
            <Container>
                <h1>Busses Already Available</h1>
                <Button onClick={FetchBusData}>Show Bus List</Button>
                <div className="Row">
                    {
                        busList.map((item, index) =>
                            <Card key={index} className={'m-2 p-2 bg-glass'}>
                                <Card.Title className={'mt-2'}>Bus Number : {item.busNumber}</Card.Title>
                                <hr/>
                                <Card.Text>Bus Capacity : {item.busCapacity}</Card.Text>
                                <Card.Text>Schools District : {item.district}</Card.Text>
                                <Card.Text>Driver Id : {item.driverId}</Card.Text>
                            </Card>
                        )
                    }
                </div>
            </Container>
        </div>
    )
}