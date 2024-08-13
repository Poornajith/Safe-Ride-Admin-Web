// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAm7ELR9yb9bfz08yoC-tVe126M6WIwOIE",
    authDomain: "active-cirrus-418019.firebaseapp.com",
    databaseURL: "https://active-cirrus-418019-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "active-cirrus-418019",
    storageBucket: "active-cirrus-418019.appspot.com",
    messagingSenderId: "190544830023",
    appId: "1:190544830023:web:74d11e99f5df08854a9b62"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app