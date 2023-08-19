import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";

import { getFirestore,doc, setDoc,addDoc,collection,deleteDoc,} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";

// import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
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
 const db = getFirestore(app);
// const auth = getAuth()



 const submit = document.getElementById('submit');
   submit.addEventListener('click', async (e) => {
     e.preventDefault();
     let email = document.getElementById('email').value;
     let password= document.getElementById('password').value;
     let name=document.getElementById('name').value;
     let age= document.getElementById('age').value;





     try{

       await addDoc(collection(db, "users"), {
          name: name,
          age: age,
         email: email,
         password: password,

       });
       alert("Data was submitted and saved to Firebase.");
       window.location.replace("/vendor.html")
      } catch (error) {
        console.log("Error submitting data:", error.messege);
        alert("error.messege");
      }


 }
     )