import firebase from 'firebase';

const types = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'application/pdf': 'pdf',
}

class Firebase {
  constructor() {
    const firebaseConfig = {
      apiKey: "AIzaSyBSVVb0VNGgUn8YX4UdX_JZPg0l9vOm0LY",
      authDomain: "curriculums-udem.firebaseapp.com",
      databaseURL: "https://curriculums-udem.firebaseio.com",
      projectId: "curriculums-udem",
      storageBucket: "curriculums-udem.appspot.com",
      messagingSenderId: "856183579755",
      appId: "1:856183579755:web:2862a912d8524d67d67d2e"
    };

    firebase.initializeApp(firebaseConfig)
  }

  async uploadFile(file) {
    const rootReference = firebase.storage().ref('curriculums');
    const curriculumReference = rootReference.child(`${Date.now()}.${types[file.type]}`);
    await curriculumReference.put(file);

    return curriculumReference.getDownloadURL();
  }
}

export default new Firebase();