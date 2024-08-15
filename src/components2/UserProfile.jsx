import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { FaChevronDown } from "react-icons/fa";
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import { auth } from '../config/firebase';

const Menus=[
    {id : uuidv4(), name:"Projects", uri : "/home/projects"},
]
const UserProfile = () => {
    const user = useSelector(state => state.user?.user)
    const [menu,setmenu] = useState(false)

    const signOutAction = async()=>{
      console.log("signout button clicked")
        await auth.signOut().then(()=>{
            window.location.reload()
        })
    }
  return (
    <div className='flex items-center justify-center gap-4 relative '>
       {/* for display userdetails */}
       <div className='w-10 h-10 flex items-center 
       justify-center rounded-xl overflow-hidden
        cursor-pointer bg-emerald-500'>
            {
                user?.photoURL
                 ? 
                 <>
               <img 
               className='w-full h-full object-cover'
                 src={user?.photoURL} alt ={user?.displayName}
                 referrerPolicy='no-referrer'/>
                 </>
                 : (
                 <p className='text-sm text-white font-semibold  '>
                    {user?.email[0].toUpperCase()}
                 </p>
                 )}
       </div>
       {/* for display options */}
       <div 
       onClick={()=>setmenu(!menu)}
       className='px-4 py-4 rounded-md flex items-center justify-center bg-secondary cursor-pointer'
       >
          <FaChevronDown  className='text-primaryText'/>
       </div>
  
        { menu && (
             <div className='bg-secondary absolute top-16 px-4 py-3 rounded-xl
             min-width-[225p] shadow-md- z-50 flex flex-col items-start justify-start'>
          {
             Menus && Menus.map((menu)=>(
              <Link to = {menu.uri} key={menu.id} 
              className='text-primaryText text-lg hover:bg-[rgba(256,256,256,0.05)] px-2 py-1 w-full rounded-md cursor-pointer'
              >{menu.name}
              </Link>
             )) 
          }
          <p 
            onClick={signOutAction}
           className='text-primaryText text-lg  hover:bg-[rgba(256,256,256,0.05)] px-2 py-1 w-full rounded-md cursor-pointer'>
             Logout
          </p>
 </div>
        )}
    </div>
  )
}

export default UserProfile;