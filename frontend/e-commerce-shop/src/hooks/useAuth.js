import {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'

export const useAuth = () => {
    const {user} = useSelector((state) => state.auth);

    const [auth, setAuth] = useState(false)
    const [loading, setLoading] = useState(true)

    //is activated each time the user changes - the state changes in the redux
    useEffect(() => {
        // console.log(user)
        if(user) {
            setAuth(true)
        }else{
            setAuth(false)
        }

        setLoading(false)

    }, [user])

    return {auth, loading};
}