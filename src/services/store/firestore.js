import { auth } from "../../config/firebase";
import {getDoc, getFirestore, collection, doc, setDoc, addDoc} from 'firebase/firestore'

const db = getFirestore();


// cloud firestore functions

export const setFirestore = async (key, userId, data) => {
    const collectionRef = collection(db, key)
    let pastData = null;
    const tasksGotten = await getDoc(doc(collectionRef, userId))
    .then((docData) => {
        console.log(docData.exists(), docData.data())
        if(docData.exists()) {
            pastData = docData.data();
        }
        data['id'] = Object.keys(pastData).length + 1;
    })
    .catch((err) => {
        console.log(err)
    })

    const taskKey = data.name
    const response = await setDoc(doc(collectionRef, userId), {[taskKey]: data, ...pastData})
    .then((succ) => {
        console.log(succ)
        return {status: true, data: succ}
    })
    .catch((err) => {
        console.log(err)
        return {status: false, data: err}
    })

    return response;

}

export const getFirestoreData =  async (key, userId) => {
    const collectionKey = collection(db, key)
    const tasks = await getDoc(doc(collectionKey, userId))
    .then((docData) => {return {status: true, data: docData.data()}})
    .catch((err) => {return {status: false, data: err}});

    return tasks;
}