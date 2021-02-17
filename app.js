import firebase from 'firebase/app'
import 'firebase/storage'
import {upload} from './upload.js'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDePgMUW4OEovNP8VEhy8zMzjlmicfvnIQ",
    authDomain: "fe-upload-74b56.firebaseapp.com",
    projectId: "fe-upload-74b56",
    storageBucket: "fe-upload-74b56.appspot.com",
    messagingSenderId: "24448036258",
    appId: "1:24448036258:web:3b6e526ae6ee3faf3896fb"
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)


const storage = firebase.storage()

console.log(storage)

upload('#file', {
    multi: true,
    accept: ['.png', '.jpg', '.jpeg', '.gif'],
    onUpload(files) {
        console.log('files', files)
    }
})