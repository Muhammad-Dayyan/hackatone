import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import{ collection, getDocs, doc, updateDoc,getFirestore} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js"

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
window.addEventListener("load", getAllIUser)


const tableBody = document.getElementById("tbody1")
console.log("tableBody", tableBody)

async function getAllIUser() {
console.log("getAllIUser")


const docsRef = await getDocs(collection(db, "users"))
docsRef.forEach(function (doc) {
    const user = doc.data()
    if (user.type !== "vendor") {
        console.log("docs", doc.id, user)
        const rowUi = `<tr>
        <td onclick={getuser()} >${user.name}</td>
        <td>${user.age}</td>
        <td>${user.email}</td>
        <td>${user.password}</td>
        <td>${user.accountActivate ? `<div class="form-check form-switch">
        <input class="form-check-input" onchange={handleAccountActivation(this)} type="checkbox" id="flexSwitchCheckChecked" checked>
      </div>` : `<div class="form-check form-switch">
      <input class="form-check-input"  onchange={handleAccountActivation(this)} type="checkbox" id="flexSwitchCheckChecked" >
    </div>`
            }</td>
         </tr>`

        tableBody.innerHTML += rowUi
    }
})


}
function getuser() {
console.log("getuser()")
}


async function handleAccountActivation(e) {
console.log("handleAccountActivation", e.checked)
}
window.handleAccountActivation = handleAccountActivation
