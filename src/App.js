import React from 'react'
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Home from './components/Home';
import { auth, db } from "./config/firebase";
import { collection, doc, onSnapshot, orderBy, query, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { SET_USER } from "./Redux/actions/UserAction";
import Spinner from "./components2/spinner";
import NewProject from "./components/NewProject";
import {SET_PROJECTS} from "./Redux/actions/ProjectActions";

const App = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [initialAuthChecked, setInitialAuthChecked] = useState(false);
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(userCard => {
      if (userCard) {
        // console.log(userCard?.providerData[0]);
        setDoc(doc(db, "users", userCard?.uid), userCard?.providerData[0])
          .then(() => {
            dispatch(SET_USER(userCard?.providerData[0]));
            if (!initialAuthChecked) {
              navigate("/home/projects", { replace: true });
            }
          });
      } else {
        if (!initialAuthChecked) {
          navigate("/home/auth", { replace: true });
        }
      }
      setLoading(false);
      setInitialAuthChecked(true);
    });
    return () => unsubscribe();
  }, [navigate, dispatch, initialAuthChecked]);
  // for project
  useEffect(()=>{
    const projectdata = query(
       collection(db,"projects"),
       orderBy("id", "desc"),
    )
    const unsubscribe = onSnapshot(projectdata, (querySnaps)=>{
       const projectslist = querySnaps.docs.map((doc)=> doc.data());
       dispatch(SET_PROJECTS(projectslist))
    });
    return unsubscribe;
},[])
  
  return (
    <>
      {loading ? (
        <div className="w-screen h-screen flex items-center justify-center overflow-hidden">
          <Spinner/>
        </div>
      ) : (
        <div className="w-screen h-screen flex items-start justify-start overflow-hidden">
          <Routes>
            <Route path="/home/*" element={<Home />} />
            <Route path="/NewProject" element={<NewProject />} />
            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/home" />} />
          </Routes>
        </div>
      )}
    </>
  )
}

export default App;