import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getStorage, ref ,uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";
import{getFirestore,getDocs,addDoc,collection,deleteDoc,updateDoc,doc} from"https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js"
const firebaseConfig = {
  apiKey: "AIzaSyBHG6-Hj5JiX3LX1PUHHzrWPbTIAAd7IWM",
  authDomain: "data-base-f6ac2.firebaseapp.com",
  projectId: "data-base-f6ac2",
  storageBucket: "data-base-f6ac2.appspot.com",
  messagingSenderId: "605107890798",
  appId: "1:605107890798:web:92c109078716967cda147f"
};

const app = initializeApp(firebaseConfig);
console.log(app)
const db=getFirestore()
 
  const storage = getStorage();
  let upload=document.getElementById("upload")
  const uploadFile = (file)=>{
    return new Promise((resolve,reject)=>{
      const mountainsRef = ref(storage, `images/${file.name}`);
   const uploadTask = uploadBytesResumable(mountainsRef, file);

    uploadTask.on('state_changed', 
      (snapshot) => {
  
       const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
       console.log('Upload is ' + progress + '% done');
       switch (snapshot.state) {
         case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
       }
   }, 
   (error) => {
     reject(error)
   }, 
     () => {   
       getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
         resolve(downloadURL);
       });
     }
   );
   })
 }
 upload.addEventListener('click',async()=>{

 try{
   let file=document.getElementById('file')
   const res= await  uploadFile(file.files[0])
   console.log("res",res)
    const img=document.getElementById('img')
    img.src=res;
  }
  catch(err){
    console.log(err)
  }

   let file=document.getElementById('file')
   uploadFile(file.files[0])
   .then((res) => console.log("res",res)

   )
   .catch((err=>("err",err)))
   const mountainsRef = ref(storage, `images/${file.files[0].name}`);
   const uploadTask = uploadBytesResumable(mountainsRef, file.files[0]);

  
   uploadTask.on('state_changed', 
     (snapshot) => {
    
     const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
     console.log('Upload is ' + progress + '% done');
   switch (snapshot.state) {
       case 'paused':
         console.log('Upload is paused');
         break;
       case 'running':
         console.log('Upload is running');
         break;
     }
   }, 
   (error) => {
     console.log('error',error);
    }, 
      () => {
      
       getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
         console.log('File available at', downloadURL);
       });
   }
  );

  }) 
  var item=document.querySelector("#item")
  var ul=document.querySelector("ul")

  let addTodo=document.getElementById("addTodo")
  addTodo.addEventListener("click",addTodoAll)
  async function addTodoAll(){
    console.log("add")
    try {
         let itemObj = {
            todo: item.value
        }
        const docRef = await addDoc(collection(db, "todos"), itemObj);
        alert("your data save in firebase")
    } catch (error) {
        console.log("ERROR", error.message)
   }
   item.value=""
   window.location.reload()

 }
let arr=[]
  window.addEventListener("load", async () => {

    try {
        let ul = document.getElementById("ul")
        const querySnapshot = await getDocs(collection(db, "todos"));
        querySnapshot.forEach((doc) => {
          arr.push(doc.id)
            let data = doc.data();

            ul.innerHTML += `<li id="${doc.id}">
  ${data.todo}
  <button class="btn1" onclick = "delButton(event)">Delete</button>
  <button class="btn2"  onclick = "editButton(event)">Edit</button>
  </li>`

      });
  } catch (error) {
      console.log("error", error.message)
  }

})
window.delButton=async function delButton(event){
console.log("hi")
try{
  let li=event.target.parentNode
  event.target.parentNode.remove()
  const deleteItem=await deleteDoc(doc(db,"todos",li.id))
  alert("delete")
}
catch(error){
  console.log(error)
  alert(error.messege)
}}
window.editButton=async function editButton(event){
  try{
  let li=event.target.parentNode
  let oldVal=li.firstChild.textContent
  let editValue=prompt("Edit todo",oldVal)
  const updateDoc=await updateDoc(doc(db,"todos",li.id),{
    todo:editValue
  });
  li.firstChild.nodeValue=editValue
}catch(error){
  console.log(error)
  alert(error.messege)
}
window.location.reload()
}
let deleteAllTodo =document.getElementById("deleteAllTodo")
deleteAllTodo.addEventListener("click",deleteAll)
  async function deleteAll(){
    try{
      ul.innerHTML=""
      for(let item of arr){
        const deleteItem=await deleteDoc(doc(db,"todos",item));

      }
        }
        catch(error){
          console.log(error)
          alert(error.messege)
        }
  }


//   e.preventDefault();
//   var todo_item = document.getElementById('todo-item').value;

//   // Add the new todo item to the Firebase Realtime Database
//   database.ref('todos').push().set({
//     text: todo_item
//   });

//   // Clear the input field
//   document.getElementById('todo-item').value = '';
// }

// // Load initial todos from Firebase on page load
// database.ref('todos').on('child_added', function(snapshot) {
//   var todo = snapshot.val();
//   var li = document.createElement('li');
//   var liTxt = document.createTextNode(todo.text);
//   li.appendChild(liTxt);
//   list.appendChild(li);

//   var delBtn = document.createElement('button');
//   var delTxt = document.createTextNode('DELETE');
//   delBtn.setAttribute('class', 'btn');
//   delBtn.setAttribute('onclick', 'delItem(this)');
//   delBtn.appendChild(delTxt);
//   li.appendChild(delBtn);

//   var editBtn = document.createElement('button');
//   var editTxt = document.createTextNode('edit');
//   editBtn.setAttribute('onclick', 'editItem(this)');
//   editBtn.appendChild(editTxt);
//   li.appendChild(editBtn);
// });

// function deleteAll() {
  // list.innerHTML = '';
// }
// 
// function delItem(e) {
  // e.parentNode.remove();
// }
// 
// function editItem(e) {
  // var val = prompt('Edit the value', e.parentNode.firstChild.nodeValue);
  // e.parentNode.firstChild.nodeValue = val;
 //}