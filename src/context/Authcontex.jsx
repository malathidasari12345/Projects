import { createContext, useContext, useState, useEffect } from "react" ;
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateCurrentUser } from 'firebase/auth'
import {auth , db} from '../services/Firebase'
import {doc,setDoc} from 'firebase/firestore'


const AuthContext = createContext();

export function AuthContextProvider({children}){

    const [user, setuser] = useState(null);
     useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (CurrentUser)=>{
            setuser(CurrentUser)
        });
        return ()=>{
            unsubscribe();
        }
     },[])
     
    function SignUp(email,password){
      return  createUserWithEmailAndPassword(auth , email, password);
         setDoc(doc(db,'users', email),{
             favShows: [],
         })
    }

    function login(email,password){
        return signInWithEmailAndPassword(auth,email,password )
    }

    function logout(){
        return signOut(auth)
    }
    return (
        <AuthContext.Provider value={{user,SignUp,login,logout}}>
          {children}
        </AuthContext.Provider>
    )
}

export function UserAuth(){
    return useContext(AuthContext)
}

