import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { login, logout } from '../stateSlice/loginSlice'
import { onLoad, onDone } from '../stateSlice/loadingSlice'
import { useNavigate, useLocation, Navigate } from 'react-router-dom'
import Logo from "../images/logo.js";
import {DangerMsgBox} from '../components/msg-box/danger-msg-box'

const LoginForm = () => {
    const isLogin = useSelector((state) => state.login.isLogin)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const [msg, setMsg] = useState(null)
    // const prevPath = location.state.prevPath

    const backPath = () => {
        if(location.state !== null){
            return location.state.prevPath
        }
        return '/'
    }
    
    const getUser = async () => {
        await axios.get('http://localhost:4001/user/getUser', {
            withCredentials:true
        })
        .then((response) => {
            console.log(response.data.message)
            dispatch(login(response.data.user))
            console.log(backPath())
            navigate(backPath())
        })
        .catch(err => {
            console.log(err)
        })
    }

    const loginAction = async () => {
        dispatch(onLoad())
        setMsg(null)
        await axios.post('http://localhost:4001/user/login', {
            email,
            password
        })
        .then((response) => {
            dispatch(onDone())
            console.log(response.data.message)
            dispatch(login(response.data.user))
            navigate(location.state.prevPath || "/")
            // window.location.reload()
        })
        .catch((err) => {
            dispatch(onDone())
            console.log(err.response.data.message)
            setMsg(err.response.data.message)
        })
    }

    const loginButtonHandler = (event) => {
        event.preventDefault()
        loginAction()
    }

    useEffect(() => {
        if(!isLogin) {
            
            getUser()
        }
    }, [])

    return(
        <div className='min-h-screen md:px-24'>
            <div className="grid md:grid-cols-2 content-center gap-y-4 md:pt-20 pt-6">
                <div className="grid md:justify-items-center grid-rows-2 grid-flow-col md:grid-rows-none md:grid-flow-row w-fit md:w-auto">
                    <h1 className="text-5xl l-font-brown tracking-widest order-2 md:order-1">Levint</h1>
                    <div className="w-auto order-1 row-span-2 md:row-span-1 md:order-2 justify-self-end md:justify-self-auto">
                        <Logo/>
                    </div>
                    <span className="font-bold order-3">Lelang online barang antik dengan mudah</span>
                </div>
                <div className="grid justify-items-center px-2 md:px-6">
                    <form className="l-bg-light-brown grid p-6 gap-y-4 rounded-lg shadow-md shadow-orange-300 w-full l-border-brown h-fit" onSubmit={loginButtonHandler}>
                        <h2 className="justify-self-center font-bold text-xl l-font-brown">Log in</h2>
                        <div className='l-bg-brown w-full mb-2' style={{height:"1px"}}></div>
                        {msg !== null && <DangerMsgBox msg={msg} />}
                        <div className="flex flex-col h-16">
                            {/* <span className="ml-4">Email</span> */}
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="rounded l-border-brown focus:outline-none focus:shadow focus:shadow-orange-700 px-4 py-2"></input>
                        </div>
                        <div className="flex flex-col h-16">
                            {/* <span className="ml-4">Password</span> */}
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="rounded l-border-brown focus:outline-none focus:shadow focus:shadow-orange-700 px-4 py-2"></input>
                        </div>
                        <button type="submit" value="Login" className="rounded l-bg-brown hover:bg-blend-lighten w-full p-1 text-white">LOG IN</button>
                        <div className='flex justify-between text-sm'>
                            <a className=' text-blue-500' href='google.com' target="_blank">Lupa password?</a>
                            <div>
                                <span>Belum punya akun?</span>
                                <a className='text-blue-500' href='http://localhost:3002/register' target="_blank">Daftar</a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginForm