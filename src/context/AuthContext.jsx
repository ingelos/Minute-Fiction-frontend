import {createContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import isTokenValid from "../helpers/isTokenValid.js";
import {jwtDecode} from "jwt-decode";
import axios from "axios";

export const AuthContext = createContext({});

function AuthContextProvider({children}) {
    const [auth, setAuth] = useState({
        isAuth: false,
        user: null,
        status: 'pending',
    });
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token && isTokenValid(token)) {
            void login(token);
        } else {
            setAuth({
                isAuth: false,
                user: null,
                status: 'done',
            });
        }
    }, []);

    async function login(token) {
        localStorage.setItem('token', token);
        const decodedToken = jwtDecode(token);
        const username = decodedToken.sub;
        console.log("Decoded username", username);

        try {
            const response = await axios.get(`http://localhost:8080/users/${username}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
            console.log(response.data);

            setAuth({
                isAuth: true,
                user: {
                    username: response.data.username,
                    email: response.data.email,
                },
                status: 'done',
            });
            console.log('user is authenticated!');
        } catch (error) {
            console.error("Error fetching user data:", error);
            logout();
        }
    }

    function logout() {
        localStorage.removeItem("token");
        setAuth({
            isAuth: false,
            user: null,
            status: 'done',
        });
        console.log('User has been logged out');
        navigate('/');
    }

    const contextData = {
        isAuth: auth.isAuth,
        user: auth.user,
        login: login,
        logout: logout,
    };

    return (
        <AuthContextProvider value={contextData}>
            {auth.status === 'done' ? children : <p>Loading...</p>}
        </AuthContextProvider>
    )
}

export default AuthContextProvider;