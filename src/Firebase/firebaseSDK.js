// import Firebase from 'firebase';

// const firebaseConfig = {
//   apiKey: 'AIzaSyBUeHvxSYorJXnbsHE9W7dRsCrZBgsRVG4',
//   databaseURL: 'https://motormechanic-51f75-default-rtdb.asia-southeast1.firebasedatabase.app/',
//   appId: '1:842702512121:android:2287123a8cfe860b4b6728',
//   projectId: 'motormechanic-51f75',
// }



// export default Firebase;

import firebase from 'firebase';
const config={
    apiKey: 'AIzaSyBUeHvxSYorJXnbsHE9W7dRsCrZBgsRVG4',
    databaseURL: 'https://motormechanic-51f75-default-rtdb.asia-southeast1.firebasedatabase.app/',
    appId: '1:842702512121:android:2287123a8cfe860b4b6728',
    projectId: 'motormechanic-51f75',
}
const Firebase = firebase.initializeApp(config);
export default Firebase;