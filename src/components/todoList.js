import { Link } from "react-router-dom"

const TodoCard = (prop) => {
    return(
        <Link className="relative content-center text-center hover:bg-slate-100" to={prop.link} key={prop.id}>
            <div className="border flex flex-col py-4">
                <span className="text-xl text-blue-500">{prop.jumlah}</span>
                <span className="text-base">{prop.nama}</span>
            </div>
        </Link>
    )
}

export default TodoCard