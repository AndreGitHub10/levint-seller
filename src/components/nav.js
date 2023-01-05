import React from "react";
// import { useState, useEffect } from "react"
import axios from "axios"
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "../stateSlice/loginSlice";
import { useNavigate } from "react-router-dom";

const Nav = () => {
    const isLogin = useSelector((state) => state.login.isLogin)
    const user = useSelector((state) => state.login.dataUser)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logoutAction = async () => {
        await axios.post('http://localhost:4001/user/logout',{
            withCredentials: true
        }).then((response) => {
            console.log(response.data.message)
            dispatch(logout())
            navigate('/')
        }).catch((err) => dispatch(logout()))
    }

    // const logoutButtonHandler = (event) => {
    //     event.preventDefault()
    //     logoutAction()
    // }

    // const fetchData = async () => {
    //     const res = await axios.get('http://localhost:4001/user/getUser', {
    //         withCredentials: true
    //     })
    //     .then((respone) => {
    //         // console.log(respone)
    //     })
    //     .catch(err => console.log("err"))
    //     const data = res
    //     return data
    // }
    // useEffect(() => {
    //     console.log(fetchData())
    // }, [])

    return(
        <nav className="fixed top-0 z-50 w-full flex flex-wrap items-center justify-between py-3 bg-gray-100 shadow-lg">
            <div className="container-fluid px-4">
                <a href="google.com" target="_blank" className="text-xl text-black">Levint Seller</a>
            </div>
            <div className="px-4">
                {isLogin ? <span>{user? `${user.username}` : ''}</span> : ''}
                {isLogin ? <span className="px-2">|</span> : ''}
                {isLogin ? 
                    <button onClick={() => logoutAction()} className=" hover:text-orange-300">Logout</button> 
                    : 
                    <button onClick={() => navigate('/')}>Login</button>
                }
            </div>
        </nav>
    )
}

export default Nav