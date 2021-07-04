import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";

export const initializedApp = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
};

export const googleSignIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      const { email, displayName } = result.user;
      const newUserInfo = {
        signedInUser: true,
        name: displayName,
        email: email,
        error: "",
      };
      return newUserInfo;
    })
    .catch((error) => {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      return newUserInfo;
    });
};
export const signOutUser = () => {
  firebase
    .auth()
    .signOut()
    .then((res) => {
      console.log("Logout successfull");
    })
    .catch((error) => {
      console.log(error.message);
    });
};
export const createUserEmalAndPassword = (name, email, password) => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((res) => {
      const newUserInfo = {
        signedInUser: true,
        name: name,
        email: email,
        error: "",
      };
      updateUserName(name);
      return newUserInfo;
    })
    .catch((error) => {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.signedInUser = false;
      return newUserInfo;
    });
};
export const signInWithEmailPassword = (email, password) => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((res) => {
      const { displayName, email } = res.user;
      const newUserInfo = {};
      newUserInfo.name = displayName;
      newUserInfo.email = email;
      newUserInfo.signedInUser = true;

      return newUserInfo;
    })
    .catch((error) => {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.signedInUser = false;
      return newUserInfo;
    });
};

const updateUserName = (name) => {
  const user = firebase.auth().currentUser;
  user
    .updateProfile({
      displayName: name,
    })
    .then(() => {
      console.log("user profle update successfully");
    })
    .catch((err) => {
      console.log(err);
    });
};
