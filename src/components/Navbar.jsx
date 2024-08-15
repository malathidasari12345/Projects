
import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/Authcontex';

const Navbar = () => {
   const { user, logout} = UserAuth()
   const navigate = useNavigate()

   const handleLogout = async ()=>{
      try{
        await logout()
        navigate('/')
      }catch(err){
        console.log(err)
      }
   }


  return (
    <div className="absolute w-full p-4 flex items-center justify-between z-50">
       <Link to='/'>
           <h1 className='uppercase text-red-600 font-nsans-bold cursor-pointer text-5xl'>Netflix</h1>
       </Link>
       {
        user?.email 
        ?
        (
          <div className='mr-4' >
        <Link to="/profile">
         <button className='capitalize bg-red-600 px-4 py-2 rounded' style={{ marginRight: '18px' }}>profile</button>      
        </Link>
         <button onClick={handleLogout} className='capitalize bg-red-600 px-4 py-2 rounded '>Logout</button>
      </div>

        )
         :
         (
          <div className='mr-4' >
        <Link to="/login">
         <button className='capitalize bg-red-600 px-4 py-2 rounded' style={{ marginRight: '18px' }}>Login</button>      
        </Link>
        <Link to="/signup">
         <button className='capitalize bg-red-600 px-4 py-2 rounded '>Signup</button>
        </Link>
      </div>
         )
       }
    </div>
  )
}

export default Navbar;