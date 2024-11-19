// import {useEffect, useState} from "react";
// import axios from "axios";
//
//
// function UseUser(username) {
//     const [userData, setUserData] = useState(null);
//     const [error, setError] = useState(false);
//     const [loading, setLoading] = useState(false);
//     // const { user } = useContext(AuthContextProvider);
//
//     useEffect(() => {
//         const controller = new AbortController();
//
//         async function fetchUser() {
//             const token = localStorage.getItem('token');
//             setLoading(true);
//
//             try {
//                 const {data} = await axios.get(`http://localhost:8080/users/${username}`, {
//                     headers: {
//                         "Content-Type": "application/json",
//                         Authorization: `Bearer ${token}`,
//                     },
//                     signal: controller.signal,
//                 });
//                 console.log("User Data:", data);
//                 setUserData(data);
//
//             } catch (error) {
//                 if (axios.isCancel(error)) {
//                     console.error('Request is cancelled');
//                 } else {
//                     console.error(error);
//                     setError(true);
//                 }
//             } finally {
//                 setLoading(false);
//             }
//         }
//
//         fetchUser();
//
//         return function cleanup() {
//             controller.abort();
//         }
//
//     }, [username]);
//
//     return {userData, setUserData, loading, error};
// }
//
// export default UseUser;