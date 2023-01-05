import ContentWarper from "./contentWarper"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate, useLocation, Navigate, Outlet } from "react-router-dom"
import { useEffect } from "react"
import axios from 'axios'
import { login, logout } from "../stateSlice/loginSlice"
import { onLoad, onDone } from "../stateSlice/loadingSlice"
import { sellerReg, sellerOff } from '../stateSlice/sellerSlice'

const PrivateTemplate = () => {
    const isLogin = useSelector((state) => state.login.isLogin)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()

    const getUser = async () => {
        dispatch(onLoad())
        await axios.get('http://localhost:4001/user/getUser', {
            withCredentials: true
        })
        .then((response) => {
            dispatch(onDone())
            console.log(response.data.message)
            dispatch(login(response.data.user))
            getSeller()
        })
        .catch((err) => {
            dispatch(onDone())
            console.log(err.response.data.message)
            dispatch(logout())
        })
    }

    const getSeller = async () => {
        dispatch(onLoad())
        await axios.get('http://localhost:5001/seller/getSeller', {
            withCredentials:true
        }).then((response) => {
            dispatch(onDone())
            console.log(response.data.message)
            dispatch(sellerReg(response.data.seller))
            // console.log(location())
            // Navigate()
        }).catch(err => {
            dispatch(onDone())
            // console.log(err.response.data.message)
            dispatch(sellerOff())
            navigate('/buatToko')
        })
    }

    useEffect(() => {
        getUser()
    }, [isLogin])
    return(
        isLogin === null ?
        <></>
        :
        isLogin ?
        <ContentWarper ><Outlet /></ContentWarper>
        :
        // <p>ok</p>
        <Navigate to={{pathname: "/login"}} state={{prevPath : location.pathname}}/>
        
    )

}

export default PrivateTemplate