export const DangerMsgBox = ({msg}) => {
    return(
        <div className="py-2 px-3 border border-red-500 bg-red-100 w-full rounded">
            <span className="text-red-500">
                {msg}
            </span>
        </div>
    )
}