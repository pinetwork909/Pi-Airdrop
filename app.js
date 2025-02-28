// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to Add Data
async function addData() {
    let input = document.getElementById("dataInput").value;
    if (input.trim() !== "") {
        await addDoc(collection(db, "items"), { name: input });
        document.getElementById("dataInput").value = "";
        fetchData();
    }
}

// Function to Fetch Data
async function fetchData() {
    let list = document.getElementById("dataList");
    list.innerHTML = "";
    const querySnapshot = await getDocs(collection(db, "items"));
    querySnapshot.forEach((doc) => {
        let li = document.createElement("li");
        li.textContent = doc.data().name;
        list.appendChild(li);
    });
}

// Load Data on Start
fetchData();
