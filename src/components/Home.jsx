import React, { useState } from 'react';
import { HiChevronDoubleLeft } from "react-icons/hi";
import { Link, Route, Routes } from 'react-router-dom';
import {logo} from "../assets/img"
import { FaSearch } from "react-icons/fa";
import Projects from './Projects';
import SignUp from './Signup';
import { useDispatch, useSelector } from 'react-redux';
import UserProfile from '../components2/UserProfile';
import { SET_SEARCH_TERM } from '../Redux/actions/Searchaction';

const Home = () => {
    const [sidemenu, setsidemenu] = useState(false);
    const searchTerm = useSelector(state => state.searchTerm?.searchTerm ? state.searchTerm?.searchTerm : "")
    const user = useSelector(state => state.user?.user)
    const dispatch = useDispatch()
  return (
        <>
            <div className={`min-h-screen max-h-screen relative bg-secondary px-3 py-6 flex flex-col items-center justify-start gap-4 transition-all duration-200 ease-in-out ${sidemenu ? "w-2" : "flex-[.2] xl:flex-[.2]"}`}>
                {/* anchor section */}
                <div 
                    onClick={() => setsidemenu(!sidemenu)}
                    className='w-5 h-5 bg-secondary rounded-tr-lg rounded-br-lg absolute -right-5 flex items-center justify-center cursor-pointer'>
                    <HiChevronDoubleLeft className='text-white text-xl' />
                </div>
                <div className='overflow-hidden w-full flex flex-col gap-4'>
                 {/* logo */}
                 <Link to='/home'>
                   <img src={logo} alt="Logo" className='object-contain h-auto w-72'/>
                 </Link>
                {/* start coding */}
                   <Link to={"/NewProject"}>
                        <div className="px-6 py-3 md:px-4 md:py-2 sm:px-2 sm:py-1 flex items-center justify-center rounded-xl border border-gray-400 cursor-pointer group hover:border-gray-200">
                            <p className='text-gray-400 group-hover:text-gray-200 capitalize'>Start Coding</p>
                        </div>
                    </Link>
                {/* home logo nav */}
                {
                    user&&(
                         <Link to={"/home/projects"}
                         className='flex items-center justify-center gap-4'>
                            <p className='text-lg text-primaryText'>Projects</p>
                         </Link>
                    )
                }
                </div>
            </div>
            
{/* for right section..... */}
            <div 
            className='flex-1 min-h-screen overflow-y-hidden w-full
                       h-full flex-col items-start justify-start px-4 md:px-12 py-4 md:py-12 '>
                        {/* top section */}
                        <div className='w-full flex items-center justify-center gap-4'>
                     {/* search */}
                     <div className='bg-secondary w-full px-4 py-3 rounded-md flex items-center justify-center  '>
                     <FaSearch className='text-2xl text-primaryText gap-3'/>
                     <input type="text"
                      value = {searchTerm}
                      onChange={(e)=>dispatch(SET_SEARCH_TERM(e.target.value))}
                      className='flex-1 text px-4 py-1 text-xl w-full
                     bg-transparent outline-none border-none text-primaryText placeholder:text-gray-600'
                     placeholder="..."/>
                     </div>
                        {/* profile */}
                        {!user&&(
                            <div 
                             className='flex items-center justify center gap-3'>
                                <Link to={"/home/auth"} 
                                className='bg-emerald-500 px-4 py-1 rounded-md cursor-pointer text-white text-lg hover:bg-emerald-700'>
                                      SignUp
                                </Link>
                            </div>

                        )}
                        {user&&(
                          <UserProfile/>
                        )}
                        </div>

                        
                       {/* bottom section  */}
                       <div className='w-full '>
                        <Routes>
                            <Route path="/*" element={<Projects/>}/>
                            <Route path="/auth" element={<SignUp/>}/>
                        </Routes>

                       </div>

                       </div>
        </>
    );
}

export default Home;
