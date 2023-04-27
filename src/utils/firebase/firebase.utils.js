// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { 
    getFirestore, 
    doc, 
    getDoc, 
    setDoc, 
    Firestore} from 'firebase/firestore'
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDE-1FtHz5oo54uVeeBPWUAa9T-Bg4A4bQ",
  authDomain: "eshop-clothing-db-2f542.firebaseapp.com",
  projectId: "eshop-clothing-db-2f542",
  storageBucket: "eshop-clothing-db-2f542.appspot.com",
  messagingSenderId: "895287407363",
  appId: "1:895287407363:web:6fb1a557d16f2fda442f36"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot.exists());

    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName, email, createAt
            });
        }catch(error){
            console.log('error creating the user ', error.message);
        }
    }

    return userDocRef;
}