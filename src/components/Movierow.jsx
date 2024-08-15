import React, { useEffect, useState } from 'react'
import axios from 'axios';
import MovieItem from './MovieItem';


const Movierow = ({ title, url }) => {
    const [movies, setmovies]=useState([])

    useEffect(() => {
        try {
            axios.get(url).then((response) => {
                setmovies(response.data.results);
            });
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }, [url]);
    
// console.log(movies)
  return (
    <>
    <h1 className='font-nsans-bold md:text-xl p-2 capitalize'>{title}</h1>
    <div className='relative flex items-center'>
        <div
        id={`slider`}
        className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide'>
            {
                movies.map((movie)=>(
                    <MovieItem  key={movie.id} movie={movie}/>
                ))
            }
        </div>
    </div>
    </>
  )
}

export default Movierow;