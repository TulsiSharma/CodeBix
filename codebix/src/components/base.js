import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDCDQqMnJ0_Q3h-fUogKHZ8Ijq7Ttw8EBE",
    authDomain: "codebix-81c0d.firebaseapp.com",
    databaseURL: "https://codebix-81c0d.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());
export {firebaseApp};
export default base;





