import {Button, Card, Container} from "react-bootstrap";
import {useEffect, useState} from "react";
import {get, getDatabase, ref} from "firebase/database";
import app from "../FirebaseConfig";
import ApproveDriver from "./ApproveDriver";

export default function PendingDrivers() {
    let [pendingDriverList, setPendingDriverList] = useState([])
    let [isVisible , setIsVisible] = useState(true)
    const db = getDatabase(app)
    
    async function FetchPendingDriverData() {
        setIsVisible(true)
        try{
            const pendingDriverRef = ref(db,'pendingDrivers/')
            const snapshot = await get(pendingDriverRef)

            if(snapshot.exists()){
                const driverIds = snapshot.val()
                const temPendingDriverArray = Object.keys(driverIds).map(allDriverIds => {
                    return {
                        ...driverIds[allDriverIds],
                        driverId: allDriverIds
                    }
                })
                setPendingDriverList(temPendingDriverArray)
            }

        } catch (e) {
            console.error('Error fetching data:', e);
            return null; // Handle errors gracefully
        }
    }

    return (
        <div>
            <Container>
                <h3>Pending Driver requests</h3>
                <Button onClick={FetchPendingDriverData}>Show Pending List</Button>
                <div className="Row">
                    {isVisible && (
                        pendingDriverList.map((item, index) =>
                            <Card key={index} className={'m-2 p-2 bg-glass'}>
                                <Card.Title className={'mt-2'}>{item.firstName} {item.lastName}</Card.Title>
                                <hr/>
                                <Card.Text>Email : {item.email}</Card.Text>
                                <Card.Text>Mobile : {item.mobile}</Card.Text>
                                <Card.Text>NIC : {item.nic}</Card.Text>
                                <ApproveDriver driver={item} setIsVisible={setIsVisible}></ApproveDriver>
                            </Card>
                        )
                    )
                    }
                </div>
            </Container>
        </div>
    )
}