import { setFirestore } from "../store/firestore";
import { getFirestoreData } from "../store/firestore";

export const addTask = async (key, userId, data) => {
    const response = await setFirestore(key, userId, data)
    console.log(response);

    return response;
}

export const getTasks = async (key, userId) => {
    const response = await getFirestoreData(key, userId)
    .then((data)=>{
        console.log(data.data)
        return data
    })
    return response;
}


