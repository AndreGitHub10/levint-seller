export const InputBorderBottom = ({children, onChange, value, type, placeholder, disabled, required}) => {
    return(
        <input 
            placeholder={(placeholder && placeholder)}
            className="border-0 border-b border-orange-300 px-0 pb-2 focus:outline-none focus:border-orange-500"
            onChange={(onChange && onChange)}
            value={(value && value)}
            type={(type && type)}
            disabled={(disabled && disabled)}
            required={(required && required)}
        ></input>
    )
}