
// import {useNavigate} from "react-router-dom";

import axios from "axios";


export const useAxiosInterceptor = () => {
    // const {logout} = useContext(AuthContext);
    // const navigate = useNavigate;

    axios.interceptors.response.use(
        response => response,
        error => {
            if(error.response && error.response.status === 401) {
                console.error('Token expired or invalid');
                // logout();

                // navigate('/authenticate');
                alert('Your session has expired. Please log in again.')
            }
            return Promise.reject(error);
        }
    );
};