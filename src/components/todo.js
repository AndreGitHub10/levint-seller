import axios from "axios"
import { useEffect, useState } from "react"
import TodoCard from "./todoList"

const Todo = () => {
    const [loadTodo, setLoadTodo] = useState(false)
    const [todoList, setTodoList] = useState([
        {
            id: 1,
            nama: "Item belum dijadwal",
            jumlah: 0,
            link: "/item/list"
        },
        {
            id: 2,
            nama: "Dalam pelelang",
            jumlah: 0,
            link: "/item/list"
        },
        {
            id: 3,
            nama: "Transaksi baru",
            jumlah: 0,
            link: "/transaksi"
        },
        {
            id: 4,
            nama: "Transaksi selesai",
            jumlah: 0,
            link: "/transaksi"
        },
        {
            id: 5,
            nama: "Chat",
            jumlah: 0,
            link: "/chat"
        },
        {
            id: 6,
            nama: "Perlu dikirim",
            jumlah: 0,
            link: "/transaksi"
        },
        {
            id: 7,
            nama: "Jadwal Lelang",
            jumlah: 0,
            link: "/lelang/list"
        },
        {
            id: 8,
            nama: "Transaksi gagal",
            jumlah: 0,
            link: "/transaksi"
        }
    ])

    const getTodo = async () => {
        setLoadTodo(true)
        await axios.get('http://localhost:5001/seller/getTodo', {
            withCredentials: true
        })
        .then((response) => {
            setLoadTodo(false)
            setTodoList([
                {
                    id: 1,
                    nama: "Item belum dijadwal",
                    jumlah: response.data.todo[0],
                    link: "/item/list"
                },
                {
                    id: 2,
                    nama: "Dalam pelelang",
                    jumlah: response.data.todo[1],
                    link: "/item/list"
                },
                {
                    id: 3,
                    nama: "Transaksi baru",
                    jumlah: response.data.todo[2],
                    link: "/transaksi"
                },
                {
                    id: 4,
                    nama: "Transaksi selesai",
                    jumlah: response.data.todo[3],
                    link: "/transaksi"
                },
                {
                    id: 5,
                    nama: "Chat",
                    jumlah: response.data.todo[4],
                    link: "/chat"
                },
                {
                    id: 6,
                    nama: "Perlu dikirim",
                    jumlah: response.data.todo[5],
                    link: "/transaksi"
                },
                {
                    id: 7,
                    nama: "Jadwal Lelang",
                    jumlah: response.data.todo[6],
                    link: "/lelang/list"
                },
                {
                    id: 8,
                    nama: "Transaksi gagal",
                    jumlah: response.data.todo[7],
                    link: "/transaksi"
                }
            ])
        })
        .catch((error) => {
            setLoadTodo(false)
            console.log("cannot get todo : ", error.response.data.message)
        })
    }

    useEffect(() => {
        getTodo()
    }, [])

    return(
        <section id="Todo" className="bg-white relative flex flex-col py-4 px-8 text-left rounded">
            <p className="text-2xl">Todo / Task yang belum dikerjakan</p>
            <span className="font-light">Silahkan mengecek keperluan berikut</span>
            {loadTodo ? 
                <div className="flex items-center justify-center">
                    <span>Loading...</span>
                </div>
             :
            <div className="grid grid-cols-3 md:grid-cols-4 gap-4 pt-2">
                {todoList.map(todo => {
                    return(
                        <TodoCard
                            key={todo.id}
                            jumlah={todo.jumlah}
                            link={todo.link}
                            nama={todo.nama}
                        />
                    )
                })}
            </div>
            }
        </section>
    )
}

export default Todo