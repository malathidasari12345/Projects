import React, { useState } from 'react'
import { CreateImageUrl } from '../services/MovieServices';
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { arrayUnion, doc, updateDoc} from  'firebase/firestore'
import {db} from '../services/Firebase'
import { UserAuth } from '../context/Authcontex';

const MovieItem = ({movie}) => {
   const[like,setlike]=useState(false);
   const { user} = UserAuth()
    const { title,backdrop_path, poster_path} = movie;
    const markfavShow = async()=>{
       const userEmail = user?.email ;
       if(userEmail){
        const userDoc = doc(db, 'users', userEmail);
          setlike(!like)
          await updateDoc(userDoc,{
            favShows : arrayUnion({...movie})
          })
       }
       else{
         alert('Login to save a Movie')
       }
    }
  return (
    <div className='relative w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block rounded-lg overflow-hidden cursor-pointer m-2 '>
        <img
        className='w-full h-[150px] block object-cover object-top'
         src={CreateImageUrl(backdrop_path ?? poster_path,"w500")} alt={title}/>
         <div className='absolute top-0 left-0 w-full h-40 bg-black/80 opacity-0 hover:opacity-100' >
              <p className='whitespace-normal text-xs md:text-sm flex justify-center items-center h-full font-nsans-bold'>{title}</p>
              <p onClick={markfavShow}  className="cursor-pointer">
                {
                 like
                 ? 
                 (<FaHeart 
                  size={20}
                  className='absolute top-2 left-2 text-gray-300'
                  />)
                 :
                 ( <FaRegHeart 
                  size={20}
                     className='absolute top-2 left-2 text-gray-300'
                  />)
               }
              </p>
         </div>
    </div>
  )
}

export default MovieItem;