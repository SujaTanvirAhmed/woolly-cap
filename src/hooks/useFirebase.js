import useLocal from './useLocal';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import initializeFirebaseApp from "../firebase/firebase.init";
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut
} from "firebase/auth";

initializeFirebaseApp();

const googleProvider = new GoogleAuthProvider();
const auth = getAuth();

export default function useFirebase() {

    const [user, setUser] = useState({});
    const [logging, setLogging] = useState(true);

    function setLoggingStatus(loggingBool) {
        setLogging(loggingBool);
    }

    function getLoggingStatus() {
        return logging;
    }

    function setTheUser(theUser) {
        setUser(theUser);
    }

    useEffect(
        () => {
            onAuthStateChanged(auth, theUser => {
                if (theUser) {
                    setUser(theUser);
                } else {
                    setUser({});
                }
            }
            );
        }, []
    );

    function signInUsingGoogle() {
        return signInWithPopup(auth, googleProvider);
    }

    function signUpUsingPassword(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    function signInUsingPassword(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    function updateUserName(name) {
        updateProfile(
            getAuth().currentUser, { displayName: name }
        )
            .then(() => {
                console.log('Successfully updated username');
            })
            .catch(() => {
                console.log('Error updating username');
            });
    }

    function getCurrentUserData() {
        return getAuth().currentUser;
    }

    const { setLoggedOut, setRole } = useLocal();
    const navigate = useNavigate();

    function signOutFirebase() {
        return signOut(auth)
            .then(() => {
                setLoggedOut();
                setRole("none");
                navigate("/");
            }).catch(error => {
                console.log(error.message);
            });
    }

    return {
        user,
        setTheUser,
        setLoggingStatus,
        getLoggingStatus,
        signInUsingGoogle,
        signUpUsingPassword,
        signInUsingPassword,
        updateUserName,
        getCurrentUserData,
        signOutFirebase
    };
}