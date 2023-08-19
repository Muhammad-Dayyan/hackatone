import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
 import { getFirestore,doc, setDoc,addDoc,collection,deleteDoc} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import{ getAuth,createUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js"
 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 // Your web app's Firebase configuration
 const firebaseConfig = {
   apiKey: "AIzaSyBHG6-Hj5JiX3LX1PUHHzrWPbTIAAd7IWM",
   authDomain: "data-base-f6ac2.firebaseapp.com",
   projectId: "data-base-f6ac2",
   storageBucket: "data-base-f6ac2.appspot.com",
   messagingSenderId: "605107890798",
   appId: "1:605107890798:web:92c109078716967cda147f"
 };

 // Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);
console.log(app)
const signupBtn = document.querySelector("#signupBtn")
signupBtn.addEventListener("click", signUp)

async function signUp(e) {
    try {
        const fullName = document.getElementById("fullName").value
        const phoneNumber = document.getElementById("age").value
        const email = document.getElementById("email").value
        const password = document.getElementById("password").value
        if (!fullName || !phoneNumber || !email || !password) {
            alert("required field are missing")
            return
        }
       



        const userAuth = await createUserWithEmailAndPassword(auth, email, password)
        console.log(userAuth.user.uid)
        const uid = userAuth.user.uid
        const userObj = {
            fullName,
            phoneNumber,
            email,
            accountActivate: true,
            uid
        }
        console.log("userObj", userObj)
        const userRef = doc(db, "users", uid);
        const userDB = await setDoc(userRef, userObj)
        console.log("userDB", userDB)

        window.location.replace("/index.html")




    } catch (error) {
        console.log("error", error.message)
        alert(error.message)
    }


}