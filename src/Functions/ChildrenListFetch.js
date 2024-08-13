import {get, getDatabase, ref} from "firebase/database";
import app from "../FirebaseConfig";

const db = getDatabase(app)

async function FetchChildrenData(){
    try{
        const childrenRef = ref(db,'children/')
        const snapshot = await get(childrenRef)

        return snapshot.val()

    } catch (e) {
        console.error('Error fetching data:', e);
        return null; // Handle errors gracefully
    }
}

export default FetchChildrenData