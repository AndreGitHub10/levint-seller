import React from 'react'
import ReactLoading from 'react-loading'
import { useSelector } from 'react-redux'
const Loading = () => {
    const isLoading = useSelector((state) => state.loading.isLoading)
    return(
        <>
        {isLoading && 
            <div className='bg-slate-200 fixed w-screen h-screen z-index-loading' style={{opacity:"0.6"}}>
                
                <ReactLoading type='cylon' color='#f97316' className='absolute w-100 h-100 right-auto left-1/2 bottom-auto top-1/3 '/>
            </div>
        }
        </>
        
    )
}

export default Loading