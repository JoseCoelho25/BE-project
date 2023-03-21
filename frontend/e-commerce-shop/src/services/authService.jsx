import { api, requestConfig } from "../utils/config";
import Cookies from "js-cookie";


// Register a user
const register = async (data) => {
const config = requestConfig("POST", data);

try {
    const res = await fetch(api + '/auth/register', config);
    const json = await res.json(); // parse JSON response
        Cookies.set('token', json.token);
        Cookies.set('user', JSON.stringify(json.userData)); // set user data in cookie

        return json;
    } catch (error) {
    console.log(error);
    }
};

//Logout an user
const logout = () => {
    Cookies.remove("token");
    Cookies.remove('user');
};


//Sign in a user
const login = async(data) => {
    const config = requestConfig('POST', data)

    try {
        const res = await fetch(api + '/auth/login', config);
        const json = await res.json(); // parse JSON response
            Cookies.set('token', json.token);
            Cookies.set('user', JSON.stringify(json.userData)); // set user data in cookie

            return json;
        } catch (error) {
        console.log(error);
        }

}


const authService = {
    register,
    logout,
    login,
}

export default authService;