import module from '@react-native-firebase/app';
class FirebaseSvc {
    constructor() {

        if (!module.apps.length) { //avoid re-initializing

            module.initializeApp({
                apiKey: 'AIzaSyA0TAb3MZgypd3huAIIYWZV7Hy9nUANXSE',
                authDomain: 'nativeapp-lic.firebaseapp.com',
                databaseURL: 'https://nativeapp-lic-default-rtdb.firebaseio.com',
                projectId: 'nativeapp-lic',
                storageBucket: 'nativeapp-lic.appspot.com',
                messagingSenderId: '475039549517',
                appId: '1:475039549517:web:476c5a859d7662c4313404',
                measurementId: 'G-4WVQS8ZP90'
            });

        }

    } login = async (user, success_callback, failed_callback) => {

        await module.auth()

            .signInWithEmailAndPassword(user.email, user.password)

            .then(success_callback, failed_callback);

    }

} const firebaseSvc = new FirebaseSvc();

export default firebaseSvc;