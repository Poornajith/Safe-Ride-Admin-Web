import {Button} from "react-bootstrap";
import {getDatabase, remove, ref, set} from "firebase/database";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import app from "../FirebaseConfig";

export default function ApproveDriver({driver, setIsVisible}) {
    const db = getDatabase(app)
    const password = 'qwer1234'
    const auth = getAuth();

    // console.log(driver)
    const Approve = async () => {
        createUserWithEmailAndPassword(auth, driver.email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                const newDriverRef = ref(db, 'users/' + user.uid + '/')
                set(newDriverRef,{
                    email:driver.email,
                    firstName:driver.firstName,
                    lastName:driver.lastName,
                    mobile:driver.mobile,
                    nic:driver.nic,
                    role:'driver'
                })
            }).then(async () => {
                const removeRef = ref(db, `pendingDrivers/${driver.driverId}`)
                await remove(removeRef)
                setIsVisible(false)
            alert('driver approved !')
        })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode + errorMessage)
                // ..
            });
    }

    return(
        <div>
            <Button onClick={Approve}>Approve</Button>
        </div>
    )
}