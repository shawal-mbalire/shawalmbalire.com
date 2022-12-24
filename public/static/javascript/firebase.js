
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
apiKey: "AIzaSyDSvTThLR_z8qou7AEyeAeIXvyMCkgLViI",
authDomain: "shawalmbalirecom.firebaseapp.com",
projectId: "shawalmbalirecom",
storageBucket: "shawalmbalirecom.appspot.com",
messagingSenderId: "587154798175",
appId: "1:587154798175:web:d68813fb1713f1f9620dea",
measurementId: "G-H2WS3SXRL3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
