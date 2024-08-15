
import React from 'react'
import Bg from '../components/Bg';
import Movierow from '../components/Movierow';
import endpoints from '../services/MovieServices';

export const Home = () => {
  return (
    <>
    <Bg/>
    <Movierow title = "Upcoming" url ={endpoints.upcoming} />
    <Movierow  title="Trending"  url = {endpoints.trending}/>
    <Movierow  title="TopRated" url={endpoints.topRated}/>
    <Movierow  title="Comedy"  url = {endpoints.comedy}/>
    <Movierow   title = "Popular"  url ={endpoints.popular}/>
    
    </>
  )
}
export default Home;
