import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/Authcontex';

const Signup = () => {
  const [rememberlogin , setrememberlogin] = useState(false)
  const [ email, setemail] = useState("")
  const [password, setpassword] = useState("")

  const {user,SignUp,} = UserAuth()
  const navigate = useNavigate()

  const handleFormSubmit = async (e)=>{
    e.preventDefault();
   try{
       await SignUp(email , password)
       navigate('/')
   }
   catch(err){
         console.log(err)
   }
  }
  return (
    <div className="w-full h-screen">
     <img 
     className='hidden sm:block absolute w-full h-full object-cover'
     alt="////"
      src="https://assets.nflxext.com/ffe/siteui/vlv3/a56dc29b-a0ec-4f6f-85fb-50df0680f80f/2f8ae902-8efe-49bb-9a91-51b6fcc8bf46/IN-en-20240617-popsignuptwoweeks-perspective_alpha_website_small.jpg" >
     </img>
     {/* for backdrop */}
       <div className='bg-black/70 fixed top-0 left-0 w-full h-screen'/> 

       <div className='fixed w-full px-4 py-20 z-20'>
        <div className='max-w-[350px] h-[400px] mx-auto bg-black/80 rounded-lg'>
          <div className='max-w-[320px] mx-auto py-6'>
            <h1 className='text-3xl font-nsans-bold'>Sign Up</h1>
            <form
             onSubmit={handleFormSubmit}
            className='w-full flex flex-col py-4 '>
              <input className='p-3 my-2  bg-gray-900 rounded'
               type="email"
                placeholder ="Email"
                 autoComplete='email'
                 value={email}
                 onChange={(e)=>setemail(e.target.value)}
                  />
              <input className='p-3 my-2  bg-gray-900 rounded'
               type="password"
                placeholder ="password"
                autoComplete='current-password'
                value={password}
                onChange={(e)=>setpassword(e.target.value)}
                 />
                 <button className='bg-red-600 rounded py-3 my-6 font-nsans-bold'>Sign Up</button>
                 <div className='flex justify-between items-center text-gray-600'>
                    <p>
                      <input type="checkbox" 
                      className='mr-2' 
                      checked ={rememberlogin}
                      onChange={(e)=>setrememberlogin(!rememberlogin)}
                      
                      />
                      Remember Me
                    </p>
                    <p>Need Help?</p>
                 </div>
                 <p className='my-4'>
                  <span className='text-gray-600 mr-2'>Already Subscribed to Netflix?</span>
                  <Link to ='/login'> Sign In </Link>
                 </p>
            </form>
          </div>
        </div>

       </div>
    </div>
  )
}

export default Signup;