import React, { useState } from 'react';

const UserAuth = ( { placeholder, ispass, Icon, setStatefunction }) => {
    const[value , setvalue] = useState("")
    const[showpass,setshowpass] = useState(false)

    const handleTextChange=(e)=>{
         setvalue(e.target.value)
         setStatefunction(e.target.value);  
    }
    
  return (
    <div className='flex flex-col items-start justify-start gap-1'>
      
        <div className={`flex items-center justify-center gap-3 w-full md:w-96 rounded-md px-4 py-1 bg-gray-200 `}>

        <Icon  className='text-text555 text-xl'/>
        <input type={ispass ? "password" : "email"}
         placeholder={placeholder}
        className='flex-1 w-full h-full py-2 outline-none border-none text-text555 text-lg sm:text-sm bg-transparent' 
        value={value}
        onChange={handleTextChange}
        />
        </div>
     </div>
  )
}

export default UserAuth;