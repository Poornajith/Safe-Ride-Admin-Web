import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import { useState } from "react";
import { get, getDatabase, ref, update } from "firebase/database";
import app from "../FirebaseConfig";
import { Link } from "react-router-dom";

export default function PendingDrivers() {
  const [pendingDriverList, setPendingDriverList] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const db = getDatabase(app);

  const approve = async (driverId) => {
    const driverRef = ref(db, `/users/${driverId}`);
    try {
      await update(driverRef, {
        status: "approved",
      });
      console.log(`Driver with ID ${driverId} approved.`);
      FetchPendingDriverData();
    } catch (error) {
      console.error("Error updating driver status:", error);
    }
  };

  async function FetchPendingDriverData() {
    setIsVisible(true);
    try {
      const pendingDriverRef = ref(db, "/users");
      const snapshot = await get(pendingDriverRef);

      if (snapshot.exists()) {
        const pendingDrivers = [];
        snapshot.forEach((childSnapshot) => {
          const userData = childSnapshot.val();
          const userId = childSnapshot.key;

          if (userData.role === "driver" && userData.status === "pending") {
            pendingDrivers.push({ id: userId, ...userData });
          }
        });
        setPendingDriverList(pendingDrivers);
      } else {
        console.log("No users found.");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  return (
    <div>
      <Container>
        <h3>Pending Driver Requests</h3>
        <Button onClick={FetchPendingDriverData}>Show Pending List</Button>
        {isVisible && (
          <div className="Row">
            {pendingDriverList.map((item, index) => (
              <Card key={index} className={"m-2 p-5 bg-glass"}>
                <Card.Title className={"mt-2"}>
                  {item.firstName} {item.lastName}
                </Card.Title>
                <hr />
                <Row>
                  <Col xs={6}>
                    <Card.Text>Email: {item.email}</Card.Text>
                    <Card.Text>Mobile: {item.mobile}</Card.Text>
                    <Card.Text>NIC: {item.nic}</Card.Text>
                  </Col>
                  <Col xs={6} className="d-flex">
                    <Card.Body>
                      <Card.Text>Driving License</Card.Text>
                      <Image
                        height={"100px"}
                        width={"100px"}
                        src={
                          item.drivingLicenseUrl
                            ? `${item.drivingLicenseUrl}.jpg`
                            : ""
                        }
                        alt="Driving license"
                      ></Image>
                      <Link to={item.drivingLicenseUrl}>
                        <Button variant="success" className="mt-2">
                          Download
                        </Button>
                      </Link>
                    </Card.Body>
                    <Card.Body>
                      <Card.Text>NIC Number</Card.Text>
                      <Image
                        height={"100px"}
                        width={"100px"}
                        src={item.nicFileUrl ? `${item.nicFileUrl}.jpg` : ""}
                        alt="NIC"
                      ></Image>
                      <Link to={item.nicFileUrl}>
                        <Button variant="success" className="mt-2">
                          Download
                        </Button>
                      </Link>
                    </Card.Body>
                    <Card.Body>
                      <Card.Text>Vehicle License</Card.Text>
                      <Image
                        height={"100px"}
                        width={"100px"}
                        src={
                          item.vehicleRegistrationUrl
                            ? `${item.vehicleRegistrationUrl}.jpg`
                            : ""
                        }
                        alt="Vehicle license"
                      ></Image>
                      <Link to={item.vehicleRegistrationUrl}>
                        <Button variant="success" className="mt-2">
                          Download
                        </Button>
                      </Link>
                    </Card.Body>
                  </Col>
                </Row>
                <Button onClick={() => approve(item.id)}>Approve</Button>
              </Card>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
