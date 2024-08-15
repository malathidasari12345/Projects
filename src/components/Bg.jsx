import axios from 'axios'
import React, { useEffect, useState } from 'react'
import endpoints, { CreateImageUrl } from "../services/MovieServices";
const Bg = () => {
  const [movie,setmovie]= useState({})
  useEffect(() => {
    try {
        axios.get(endpoints.popular).then((response) => {
            // console.log(response.data);
            const movies = response.data.results;
            const randomMovie = movies[Math.floor(Math.random() * movies.length)];
            // console.log(randomMovie.title);
            setmovie(randomMovie);
        });
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}, []);

  const truncate=( str, length)=>{
    if(!str){
      return "";
    }
    return str.length > length ? str.slice(0,length) + "......" : str;

  }
  if(!movie){
    return(
      <center>
        <h1>Fetching Movie.....</h1>
      </center>
    )
  };
  const {title,backdrop_path, release_date,overview} = movie;
  return (
     <div className='w-full h-[350px] lg:h-[350px]'>
       <div className='w-full h-full'>
        <div className='absolute w-full h-[350px] lg:h-[350px] bg-gradient-to-r from-black '/>
           <img 
           className='w-full h-full object-cover object-top'  
           src={CreateImageUrl(backdrop_path, "original")} alt={title}
            /> 
         <div className='absolute w-full top-[15%] lg:top-[15%] p-4 md:p-8 '>
          <h1 className='text-3xl md:text-4xl font-nsans-bold '>{title}</h1>
          <div className='mt-8 mb-4'>
            <button className='capitalize border bg-gray-300 text-black  py-2 px-5'>Play</button>
            <button className='capitalize border border-gray-300  py-2 px-5 ml-4'>Watch later</button>
          </div>
          <p className='text-gray-400 text-sm'>{release_date}</p>
          <p className='w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200'>{truncate(overview,165)}</p>
         </div>

       </div>
     </div>
  )
}

export default Bg;