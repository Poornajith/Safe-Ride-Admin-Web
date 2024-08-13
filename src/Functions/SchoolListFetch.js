import {get, getDatabase, ref} from "firebase/database";
import app from "../FirebaseConfig";

const db = getDatabase(app)

async function FetchSchoolData(){
    try{
        const childrenRef = ref(db,'schools/')
        const snapshot = await get(childrenRef)

        return snapshot.val()

    } catch (e) {
        console.error('Error fetching data:', e);
        return null; // Handle errors gracefully
    }
}

const schoolData = await FetchSchoolData()

export default schoolData