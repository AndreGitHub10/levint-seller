import axios from 'axios'
import { useDispatch } from 'react-redux'
import {login, logout} from '../stateSlice/loginSlice'

export const GetUser = async () => {
    const dispatch = useDispatch()
    await axios.get('http://localhost:4001/user/getUser', {
        withCredentials: true
    })
    .then((response) => {
        console.log(response.data.message)
        dispatch(login(response.data.user))
    })
    .catch((err) => {
        console.log(err.response.data.message)
        dispatch(logout())
    })
    // return JSON.stringify(res)
}

export default GetUser