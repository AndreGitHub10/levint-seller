import {Tab, Tabs, TabList, TabPanel} from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import axios from "axios"
import Swal from 'sweetalert2'
import DataTable from 'react-data-table-component';
import { WhiteCard } from "../components/card/white-card"
import { useEffect, useState, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import MoreVert from '@mui/icons-material/MoreVert'
// import CurrencyFormat from 'react-currency-format'
import { onLoad, onDone } from '../stateSlice/loadingSlice.js';

const ItemShow = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const seller = useSelector((state) => state.seller.dataSeller)
    const [pending, setPending] = useState(true)
    const [allItem, setAllItem] = useState([])
    const [itemTersimpan, setItemTersimpan] = useState([])
    const [itemLelang, setItemLelang] = useState([])
    const [itemTerjual, setItemTerjual] = useState([])

    useEffect(() => {
        setItemLelang([])
        setItemTersimpan([])
        setItemTerjual([])
        if(allItem !== []) {
            allItem.map((item) => {
                switch (item.status) {
                    case "new":
                        setItemTersimpan(t => [...t, item])
                        return
                    case "onLelang":
                        setItemLelang(t => [...t, item])
                        return
                    case "endLelang":
                        setItemTerjual(t => [...t, item])
                        return
                    default:
                        return
                }
            })
        }
    }, [allItem])
    // const [filterText, setFilterText] = useState('');
	// const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
	// const filteredItems = allItem.filter(
	// 	item => item.nama_item && item.nama_item.toLowerCase().includes(filterText.toLowerCase()),
	// );

	// const subHeaderComponentMemo = useMemo(() => {
	// 	const handleClear = () => {
	// 		if (filterText) {
	// 			setResetPaginationToggle(!resetPaginationToggle);
	// 			setFilterText('');
	// 		}
	// 	};

    //     return (
    //         <div className="flex flex-row justify-start ml-0 mr-auto">
    //         <input type='text' className="border border-r-0 border-orange-300 rounded-tl rounded-bl px-2" placeholder="Cari" onChange={(e) => setFilterText(e.target.value)} value={filterText}/>
    //         <button className=" rounded-tr rounded-br border border-l-0 border-orange-300 px-2" onClick={handleClear}>x</button>
    //         </div>
	// 	);
	// }, [filterText, resetPaginationToggle]);

    const itemDeleteConfirm = (e, id_item) => {
        e.preventDefault()
        Swal.fire({
            title: 'Hapus data item?',
            showCancelButton: true,
            confirmButtonText: 'Ya, Hapus!',
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                deleteOneItem(id_item)
            }
        })
    }

    const deleteOneItem = async (id_item) => {
        dispatch(onLoad())
        await axios.get(`http://localhost:6001/item/delete/${id_item}`, {
            withCredentials: true
        })
        .then((response) => {
            dispatch(onDone())
            setAllItem(response.data.dataItem)
            Swal.fire({
                title: 'Berhasil',
                icon: 'success',
                text: 'item berhasil dihapus',
                confirmButtonText: 'Ok'
            })
        })
        .catch((err) => {
            dispatch(onDone())
            console.log(err)
            Swal.fire({
                title: 'Gagal',
                icon: 'error',
                text: 'item gagal dihapus',
                confirmButtonText: 'Ok'
            })
        })
    }

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
            name: 'Status',
            cell: row => (<span>tersimpan</span>)
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
                            <button className="w-full px-4 text-left hover:bg-orange-300 whitespace-nowrap" onClick={(e) => itemDeleteConfirm(e, row._id)}>hapus</button>
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

    useEffect(() => {
        const getItem = async () => {
            dispatch(onLoad())
            await axios.get(`http://localhost:6001/item/getItemBySeller?sellerId=${seller._id}`, {
                withCredentials: true
            })
            .then((response) => {
                dispatch(onDone())
                setAllItem(response.data.dataItem)
                setPending(false)
            })
            .catch((err) => {
                dispatch(onDone())
                setPending(false)
                console.log(err)
            })
        }
        getItem()
    }, [dispatch, seller])

    return(
        <>
        <WhiteCard>
            <div className="min-h-[500px]">
                <Tabs>
                    <TabList>
                        <Tab>Tersimpan</Tab>
                        <Tab>Dalam Pelelangan</Tab>
                        <Tab>Selesai dilelang</Tab>
                    </TabList>

                    <TabPanel>
                        <DataTable 
                            columns={columns} 
                            data={itemTersimpan} 
                            noDataComponent="Tidak ada data"
                            progressPending={pending}
                            pagination
                            // subHeader
                            // subHeaderComponent={subHeaderComponentMemo}
                            customStyles={customStyles}
                        />
                        {/* <DataTable
                            columns={columnBaru}
                            data={itemBaru}
                            noDataComponent="Belum ada item"
                            progressPending={pending}
                            // customStyles={customStyles}
                            noHeader={true}
                        /> */}
                    </TabPanel>
                    <TabPanel>
                        <DataTable 
                            columns={columns} 
                            data={itemLelang} 
                            noDataComponent="Tidak ada data"
                            progressPending={pending}
                            pagination
                            // subHeader
                            // subHeaderComponent={subHeaderComponentMemo}
                            customStyles={customStyles}
                        />
                    </TabPanel>
                    <TabPanel>
                        <DataTable 
                            columns={columns} 
                            data={itemTerjual} 
                            noDataComponent="Tidak ada data"
                            progressPending={pending}
                            pagination
                            // subHeader
                            // subHeaderComponent={subHeaderComponentMemo}
                            customStyles={customStyles}
                        />
                    </TabPanel>
                </Tabs>
            </div>
        </WhiteCard>
        </>
    )
}

export default ItemShow