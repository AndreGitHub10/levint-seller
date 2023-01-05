import { useState } from "react"
// import { Link } from "react-router-dom"
const Tab = (prop) => {
    const [tabActive, setTabActive] = useState(false)

    const tabToggle = (prop) => {
        console.log(`tertekan ${prop.id}`)
    }

    return(
        <li>
            <a 
                href={prop.target} 
                id={prop.id}
                onClick={tabToggle(prop)}
                className="border-x-0 border-t-0 border-b-2 border-transparent px-6 py-3 my-2 hover:border-transparent hover:bg-gray-100"
            >
                {prop.nama}
            </a>
        </li>
    )
}

export default Tab