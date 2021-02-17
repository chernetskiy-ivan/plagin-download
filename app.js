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


upload('#file', {
    multi: true,
    accept: ['.png', '.jpg', '.jpeg', '.gif'],
    onUpload(files, blocks) {
        files.forEach((file, index) => {
            const ref = storage.ref(`images/${file.name}`)
            const task = ref.put(file)

            task.on('state_changed', snapshot => {
                const percentage = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0) + '%'
                const block = blocks[index].querySelector('.preview-info-progress')
                block.textContent = percentage
                block.style.width = percentage
            }, error => {
                console.log(error)
            }, () => {
                console.log('Complete')
            })
        })

    }
})