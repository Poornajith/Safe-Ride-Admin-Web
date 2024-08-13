import {get, getDatabase, ref} from "firebase/database";
import app from "../FirebaseConfig";

const db = getDatabase(app)
async function fetchBussesData(){
    try{
        const busesRef = ref(db,'busses/')
        const snapshot = await get(busesRef)

        return snapshot.val()

    } catch (e) {
        console.error('Error fetching data:', e);
        return null; // Handle errors gracefully
    }
}

// const bussesData = await fetchBussesData()

export default fetchBussesData