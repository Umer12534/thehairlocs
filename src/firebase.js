import {initializeApp} from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyC_nW6MlGeU4oAXovIhxSxnoNcihb7QnO4",
    authDomain: "thehearlocs.firebaseapp.com",
    projectId: "thehearlocs",
    storageBucket: "thehearlocs.firebasestorage.app",
    messagingSenderId: "7141909410",
    appId: "1:7141909410:web:aec3b4d83500e5748208fb",
    measurementId: "G-QZ0KTBSC7M",
    databaseURL: "https://thehearlocs-default-rtdb.firebaseio.com"};
export const app = initializeApp(firebaseConfig);