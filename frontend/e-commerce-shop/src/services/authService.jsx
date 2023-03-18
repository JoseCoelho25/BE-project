import { api, requestConfig } from "../utils/config";
import Cookies from "js-cookie";


// Register a user
const register = async (data) => {
const config = requestConfig("POST", data);

try {
    const res = await fetch(api + "/auth/register", config)
    .then((res) => res.json())
    .then((res) => Cookies.set("token", res.token))
    .catch((err) => err);

    

    return res;
} catch (error) {
    console.log(error);
}
};

//Logout an user
const logout = () => {
    Cookies.remove("token");
};


//Sign in a user
const login = async(data) => {
    const config = requestConfig('POST', data)

    try {
        const res = await fetch(api + '/auth/login', config)
                    .then((res) => res.json())
                    .then((res) => Cookies.set("token", res.token))
                    .catch((err) => err)

       

        return res
    } catch (error) {
        console.log(error)
    }

}


const authService = {
    register,
    logout,
    login,
}

export default authService;