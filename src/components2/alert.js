import React from 'react';


const Alert = ( { status,alertMsg }) => {
  return (
    <div>
       {
        status ==="success" &&
        (
            <div 
            className='px-2 py-1 rounded-md bg-emerald-400 shadow-md'
            >
             <p className='text-lg text-primary'>
                {alertMsg}</p>
            </div>
        )
       }

    </div>
  )
}

export default Alert;