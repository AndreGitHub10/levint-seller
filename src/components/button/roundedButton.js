const RoundedButton = ({children, disabled, onClick, type}) => {
    return(
        <button className={`rounded-full shadow text-white aspect-square h-auto shrink-0 ` + (disabled ? `bg-slate-300 shadow-slate-300` : `bg-orange-500 shadow-orange-500`)} disabled={disabled} onClick={onClick && onClick} type={type && type}>
            {children ? children : "0"}
        </button>
    )
}

export default RoundedButton