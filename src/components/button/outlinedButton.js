const OutlinedButton = ({children, onClick, type}) => {
    return(
        <button className="rounded bg-white text-orange-500 p-1 w-full shadow outline-orange-500 shadow-orange-500" onClick={onClick && onClick} type={type && type} >
            {children ? children : "Property name tidak ada"}
        </button>
    )
}

export default OutlinedButton