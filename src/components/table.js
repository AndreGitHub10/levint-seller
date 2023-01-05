import axios from "axios"
import React, {useEffect, useState, useMemo} from 'react'
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../stateSlice/loginSlice";
import { useNavigate } from "react-router-dom";
import MoreVert from '@mui/icons-material/MoreVert'

const Table = () => {
    const navigate = useNavigate()
    const [dataItem, setDataItem] = useState([]);
    const seller = useSelector((state) => state.seller.dataSeller)
    const [pending, setPending] = useState(true)
    const dispatch = useDispatch()
    const [filterText, setFilterText] = useState('');
	const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
	const filteredItems = dataItem.filter(
		item => item.nama_item && item.nama_item.toLowerCase().includes(filterText.toLowerCase()),
	);

	const subHeaderComponentMemo = useMemo(() => {
		const handleClear = () => {
			if (filterText) {
				setResetPaginationToggle(!resetPaginationToggle);
				setFilterText('');
			}
		};

		return (
            <div className="flex flex-row justify-start ml-0 mr-auto">
            <input type='text' className="border border-r-0 border-orange-300 rounded-tl rounded-bl px-2" placeholder="Cari" onChange={(e) => setFilterText(e.target.value)} value={filterText}/>
            <button className=" rounded-tr rounded-br border border-l-0 border-orange-300 px-2" onClick={handleClear}>x</button>
            </div>
		);
	}, [filterText, resetPaginationToggle]);

    const deleteOneItem = async (id_item) => {
        await axios.get(`http://localhost:6001/item/delete/${id_item}`, {
            withCredentials: true
        })
        .then((response) => {
            setDataItem(response.data.dataItem)
        })
        .catch((err) => {
            if(err.response.status === 401){
                dispatch(logout())
            }
            console.log(err)
        })
    }

    useEffect(() => {
        const getItem = async () => {
            await axios.get(`http://localhost:6001/item/getItemBySeller?sellerId=${seller._id}`, {
                withCredentials: true
            })
            .then((response) => {
                setDataItem(response.data.dataItem)
                setPending(false)
            })
            .catch((err) => {
                setPending(false)
                if(err.response.status === 401){
                    dispatch(logout())
                }
                console.log(err)
            })
        }
        getItem()
    }, [dispatch, seller])

    const columns = [
        {
            name: 'Item',
            cell: row => (
                <div className="">
                    {row.gambar.length > 0 &&
                    <img src={row.gambar[0].url} className="w-10 h-10" alt={row._id}/>
                    }
                </div>
            ),
            sortable: true
        },
        {
            name: 'Nama Item',
            selector: row => row.nama_item,
            sortable: true,
            maxWidth: '600px'
        },
        {
            name: 'Kategori',
            selector: row => row.berat,
            sortable: true
        },
        {
            name: 'Action',
            grow: 1,
            cell: row => (
                <div className="w-full flex gap-1">
                    <button className="dropdown-toggle text-orange-500 hover:bg-orange-300 shadow hover:shadow-lg focus:bg-orange-500 border focus:text-white outline-slate-100 rounded" type="button" id={row._id} data-bs-toggle="dropdown" aria-expanded="false"><MoreVert /></button>
                    <ul className="dropdown-menu hidden absolute bg-white float-left text-left py-2 list-none rounded-lg shadow-lg mt-1 m-0 bg-clip-padding border-none min-w-max" aria-labelledby={row._id}>
                        <li className="dropdown-item">
                            <button className="w-full px-4 text-left hover:bg-orange-300 whitespace-nowrap" onClick={() => window.open(`http://localhost:3000/item?itemId=${row._id}`)} formTarget="_blank">lihat</button>
                        </li>
                        <li className="dropdown-item">
                            <button className="w-full px-4 text-left hover:bg-orange-300 whitespace-nowrap" onClick={() => navigate(`/itemEdit?itemId=${row._id}`)}>edit</button>
                        </li>
                        <li className="dropdown-item">
                            <button className="w-full px-4 text-left hover:bg-orange-300 whitespace-nowrap" onClick={() => deleteOneItem(row._id)}>hapus</button>
                        </li>
                    </ul>
                </div>
            )
        }
    ]

    const customStyles = {
        rows: {
            style: {
                paddingTop: '0.5rem',
                paddingBottom: '0.5rem'
            }
        }
    }
    return(
        <div className="p-4">
            <DataTable 
                columns={columns} 
                data={filteredItems} 
                noDataComponent="Kosong???"
                progressPending={pending}
                selectableRows
                pagination
                subHeader
                subHeaderComponent={subHeaderComponentMemo}
                customStyles={customStyles}
            />
        </div>
    )
}

export default Table