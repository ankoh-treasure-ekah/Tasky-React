import {auth} from "../../config/firebase";
import {signInWithEmailAndPassword, createUserWithEmailAndPassword} from 'firebase/auth'

console.log(auth);


export const signInEmPass = async (userData) => {
    try {
        const user = await createUserWithEmailAndPassword(auth, userData.email, userData.password)
        .then((user) => {return {state: true, user, error: undefined}})
        .catch((err) => {return {state: false, user:undefined, error: err}});

        return user;
    }
    catch(err) {
        console.log(err)
        return {state: false, user: undefined, error: err}
    }

}

export const login = async (userData) => {
    try {
        const user = await signInWithEmailAndPassword(auth, userData.email, userData.password)
        .then((user)=> {return {status: true, user, error: undefined}})
        .catch((err) => {return {status: false, user:undefined, error: err}});

        return user;
    }
    catch(err) {
        console.log(err)
        return {status: false, user: undefined, error: err}
    }
}