import {get, getDatabase, ref} from "firebase/database";
import app from "../FirebaseConfig";

const db = getDatabase(app)

async function FetchUserData(){
    try{
        const childrenRef = ref(db,'users/')
        const snapshot = await get(childrenRef)

        return snapshot.val()

    } catch (e) {
        console.error('Error fetching data:', e);
        return null; // Handle errors gracefully
    }
}

const userData = await FetchUserData()

export default userData