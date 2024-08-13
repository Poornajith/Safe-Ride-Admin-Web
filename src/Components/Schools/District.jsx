import {useState} from "react";
import SchoolBasedOnDistrict from "./SchoolBasedOnDistrict";
import {get, getDatabase, ref} from "firebase/database";
import app from "../../FirebaseConfig";
import {Button, Card} from "react-bootstrap";

export default function District() {
    let [districtList , setDistrictList] = useState([])
    const db = getDatabase(app)
    async function FetchDistrictData(){

        try{
            const districtRef = ref(db,'schoolsBaseOnDistricts/')
            const snapshot = await get(districtRef)

            if(snapshot.exists()){
                const districtIds = snapshot.val()
                const tempDistrictIdArray = Object.keys(districtIds).map(allDistrictIds => {
                    return {
                        ...districtIds[allDistrictIds],
                        districtId: allDistrictIds
                    }
                })
                setDistrictList(tempDistrictIdArray)
                // console.log(tempDistrictIdArray)
            }

        } catch (e) {
            console.error('Error fetching data:', e);
            return null; // Handle errors gracefully
        }
    }
    return(
        <div>
            <div>
                <Button onClick={FetchDistrictData}>Show District List</Button>
                {
                    districtList.map((item, index) =>
                        <div key={index}>
                            <SchoolBasedOnDistrict key={index} district={item}/>
                        </div>
                    )
                }
            </div>
        </div>
    )
}