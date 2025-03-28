import { useCallback, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import isTokenValid from "../helpers/isTokenValid.js";
import axios from "axios";
import AuthContext from "./AuthContext.jsx";
import {jwtDecode} from "jwt-decode";


export function AuthContextProvider({children}) {
    const [auth, setAuth] = useState({
        isAuth: false,
        user: null,
        authorities: [],
        status: 'pending',
    });

    const navigate = useNavigate();

    const updateUser = (updatedUser) => {
    setAuth((prevAuth) => ({
        ...prevAuth,
        user: updatedUser,
        authorities: updatedUser.authorities,
    }));
};

    const login = useCallback(async(token) => {
        localStorage.setItem('token', token);
        const decodedToken = jwtDecode(token);
        const username = decodedToken.sub;

        try {
            const response = await axios.get(`http://localhost:8080/users/${username}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                }
            });

            setAuth({
                isAuth: true,
                user: {
                    username: response.data.username,
                    email: response.data.email,
                },
                authorities: response.data.authorities || [],
                status: 'done',
            });
        } catch (error) {
            console.error("Error fetching user data:", error);
            logout();
        }
    }, []);


    const logout = useCallback(() =>  {
        localStorage.removeItem('token');
        setAuth({
            isAuth: false,
            user: null,
            authorities: [],
            status: 'done',
        });

        navigate('/');
    }, [navigate]);


    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token && isTokenValid(token)) {
            void login(token);
        } else {
            setAuth({
                isAuth: false,
                user: null,
                authorities: [],
                status: 'done',
            });
            localStorage.removeItem('token');
        }

        const intervalId = setInterval(() => {
            if (token && !isTokenValid(token)) {
                setAuth({
                    isAuth: false,
                    user: null,
                    authorities: [],
                    status: 'done',
                });
                localStorage.removeItem('token');
                navigate('/authenticate', { replace: true });
            }
        }, 60000);
        return () => clearInterval(intervalId);

    }, [login, navigate]);

    const contextData = {
        isAuth: auth.isAuth,
        username: auth.user ? auth.user?.username : null,
        user: auth.user || {},
        authorities: auth.authorities || [],
        login: login,
        logout: logout,
        updateUser,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {auth.status === 'done' ? children : <p>Loading...</p>}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;