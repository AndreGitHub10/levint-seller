const DefaultButton = ({children, onClick, type}) => {
    return(
        <button className="rounded bg-orange-500 text-white p-1 w-full shadow shadow-orange-500" onClick={onClick && onClick} type={type && type} >
            {children ? children : "Property name tidak ada"}
        </button>
    )
}

export default DefaultButton