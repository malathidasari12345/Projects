// import React from 'react'
// import  { useState, useEffect } from 'react';
// import axios from 'axios';

// const Table = () => {
//     const [users, setUsers] = useState([]);

//     useEffect(() => {
//       fetchData();
//     }, []);
  
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('https://jsonplaceholder.typicode.com/users');
//         // console.log(response)
//         setUsers(response.data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };
//   return (
//        <table>
//          <tr>
//             <th>Id</th>
//             <th>Name</th>
//             <th>userName</th>
//          </tr>
//          {
//       users.map((user) => (
//         <tr>
//             <td>{user.id}</td> 
//             <td>{user.name}</td>
//             <td>{user.username}</td> 
           
//          </tr>
//       ))
//     }
      

//        </table>
      
        
//     )
// }


// export default Table