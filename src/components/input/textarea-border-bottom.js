export const TextareaBorderBottom = ({placeholder, onChange, value, required}) => {
    return(
        <textarea 
            className="border-b border-orange-300 px-0 py-1 focus:outline-none focus:border-orange-500 grow"
            onChange={onChange && onChange}
            placeholder={placeholder && placeholder}
            value={value && value}
            required={(required && required)}
        ></textarea>
    )
}