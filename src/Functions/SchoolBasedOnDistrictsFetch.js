import {get, getDatabase, ref} from "firebase/database";
import app from "../FirebaseConfig";

const db = getDatabase(app)

async function FetchSchoolBasedOnDistricts(){
    try{
        const childrenRef = ref(db,'schoolsBaseOnDistricts/')
        const snapshot = await get(childrenRef)

        return snapshot.val()

    } catch (e) {
        console.error('Error fetching data:', e);
        return null; // Handle errors gracefully
    }
}

const schoolDataBasedOnDistrict = await FetchSchoolBasedOnDistricts()

export default schoolDataBasedOnDistrict