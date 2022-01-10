import Firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyCe5IxK9yr5ZTfCRXqKiuBWNDPnhyULTkI',
  databaseURL: 'https://findcrewapp-default-rtdb.firebaseio.com/',
  appId: '1:413524627530:android:37c934748b831a590c56b3',
  projectId: 'findcrewapp',
}

export default Firebase.initializeApp(firebaseConfig);