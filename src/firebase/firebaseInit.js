import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';



const firebaseConfig = {
    apiKey: "AIzaSyDM4TJpK-QbvoS3rqetIcrN6v8WePOMw3A",
    authDomain: "ugbs-dawuro.firebaseapp.com",
    projectId: "ugbs-dawuro",
    storageBucket: "ugbs-dawuro.appspot.com",
    messagingSenderId: "51675061735",
    appId: "1:51675061735:web:71e3bd1e9ff8ff36667142",
    measurementId: "G-4VZ9YSR8MQ"
  };


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
const analytics = getAnalytics(app); 

  export {auth, db, storage};