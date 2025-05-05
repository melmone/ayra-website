// js/firebase-init.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { 
    getDatabase,
    ref,
    push,
    update 
}    from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyAJkO5HyZPp4D_D3YW_nle-SkcbBfp867c",
    authDomain: "ayra-rings.firebaseapp.com",
    databaseURL: "https://ayra-rings-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "ayra-rings",
    storageBucket: "ayra-rings.appspot.com",
    messagingSenderId: "285508091332",
    appId: "1:285508091332:web:6d272347377b4669cb3891",
};

// 初期化してグローバルに置いておく
const app = initializeApp(firebaseConfig);
window.db = getDatabase(app);

window.db = db;
window.firebaseRef = ref;     // ✅ ref関数もグローバルに保存
window.firebasePush = push;
window.firebaseUpdate = update;