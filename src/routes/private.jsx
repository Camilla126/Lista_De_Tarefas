import { useState, useEffect } from "react";

import { auth } from '../firebaseConnection'
import { onAuthStateChanged } from "firebase/auth";

export default function Private ({ children }){
const [loading, setLoading] = useState(true)
const [signed, setSigned] = useState(false)

useEffect(() => {
async function checkLogin() {
    const unsub = onAuthStateChanged(auth, (user) => {
if(user){
const userData = {
    uid: user.uid,
    email: user.email,
}
localStorage.setItem('@detailUser', JSON.stringify(userData))

setLoading(false);
setSigned(true);

} else{
    setLoading(false)
    setSigned(false)
}
    })
    
}

}, [])

    return children;
}