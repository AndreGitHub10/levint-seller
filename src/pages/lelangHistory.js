import { useEffect, useState } from "react"
import DataTable from "react-data-table-component"
import { WhiteCard } from "../components/card/white-card"
import MoreVert from '@mui/icons-material/MoreVert'
import axios from "axios"
import { RWebShare } from 'react-web-share'
import CurrencyFormat from 'react-currency-format'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
import moment from 'moment'
import {useDispatch} from 'react-redux'
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import { onLoad, onDone } from '../stateSlice/loadingSlice.js';

const LelangHistory = () => {

    const dispatch = useDispatch()
    const [pending, setPending] = useState(false)
    const [allLelang, setAllLelang] = useState([])
    const [lelangSold, setLelangSold] = useState([])
    const [lelangEnded, setLelangEnded] = useState([])
    const [lelangCancel, setLelangCancel] = useState([])
    const ReactSwal = withReactContent(Swal)
    const openBidList = (e, lelangBid) => {
        e.preventDefault()
        ReactSwal.fire({
            title: 'Bid saat ini',
            html: <div className="h-[400px] w-full overflow-y-auto"> {lelangBid.map((bit, index) => {
                    return <div className="flex items-center justify-between">
                        <div className='flex'>
                        <span className='font-bold text-lg'>{index + 1}</span>
                        </div>
                        <span className='font-bold text-red-500'><CurrencyFormat value={bit.price} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} /></span>
                    </div>
                })}
            </div>,
            showCloseButton: true,
        })
    }

    const columns = [
        {
            name: 'Item',
            grow: 1,
            cell: row => (
                <><div className="flex items-center">
                    <img src={row.item.gambar[0].url} className="h-10 w-10" alt={row.item._id} />
                    <span className="line-clamp-2 w-14">{row.item.nama_item}</span>
                </div></>
            )
        },
        {
            name: 'Tanggal berakhir',
            cell: row => (
                <><div>
                    <span>{moment(row.lelang.tanggal_akhir).format('hh:mm, DD/MM/YYYY')}</span>
                </div></>
            )
        },
        {
            name: 'Total Bid',
            cell: row => (
                <><span>{row.lelang.bid.length}<button className='text-slate-500 text-sm' onClick={(e) => openBidList(e, row.lelang.bid)}>&#40;lihat semua&#41;</button></span></>
            )
        },
        {
            name: 'Aksi',
            grow: 1,
            cell: row => (
                <div className="w-full flex gap-1">
                    <button className="dropdown-toggle text-orange-500 hover:bg-orange-300 shadow hover:shadow-lg focus:bg-orange-500 border focus:text-white outline-slate-100 rounded" type="button" id={row.item._id} data-bs-toggle="dropdown" aria-expanded="false"><MoreVert /></button>
                    <ul className="dropdown-menu hidden absolute bg-white float-left text-left py-2 list-none rounded-lg shadow-lg mt-1 m-0 bg-clip-padding border-none min-w-max" aria-labelledby={row.item._id}>
                        <li className="dropdown-item">
                            <button className="w-full px-4 text-left hover:bg-orange-300 whitespace-nowrap" onClick={() => window.open(`http://localhost:3000/item?itemId=${row.item._id}`)} formTarget="_blank">lihat</button>
                        </li>
                    </ul>
                </div>
            )
        }
    ]

    const getLelangRiwayat = async () => {
        setPending(true)
        await axios.get('http://localhost:6001/lelang/getLelangRiwayatBySeller', {
            withCredentials: true
        })
        .then((response) => {
            setPending(false)
            setAllLelang(response.data.lelangs)
        })
        .catch((error) => {
            setPending(false)
            console.log(error.response.data.message)
        })
    }

    useEffect(() => {
        getLelangRiwayat()
    }, [])

    useEffect(() => {
        setLelangSold([])
        setLelangEnded([])
        setLelangCancel([])
        if(allLelang !== []) {
            allLelang.map((item) => {
                switch (item.lelang.status) {
                    case "onTransaction":
                        setLelangSold(t => [...t, item])
                        return
                    case "ended":
                        setLelangEnded(t => [...t, item])
                        return
                    case "canceled":
                        setLelangCancel(t => [...t, item])
                        return
                    default:
                        return
                }
            })
        }
    }, [allLelang])
    return(
        <>
            <WhiteCard>
                <div className="min-h-[500px]">
                    <Tabs>
                        <TabList>
                            <Tab>Terjual</Tab>
                            <Tab>Tidak terjual</Tab>
                            <Tab>Dibatalkan</Tab>
                        </TabList>
                        <TabPanel>
                            <DataTable
                            columns={columns} 
                            data={lelangSold} 
                            noDataComponent="Tidak ada data"
                            progressPending={pending}
                            pagination
                            />
                        </TabPanel>
                        <TabPanel>
                            <DataTable
                            columns={columns} 
                            data={lelangEnded} 
                            noDataComponent="Tidak ada data"
                            progressPending={pending}
                            pagination
                            />
                        </TabPanel>
                        <TabPanel>
                            <DataTable
                            columns={columns} 
                            data={lelangCancel} 
                            noDataComponent="Tidak ada data"
                            progressPending={pending}
                            pagination
                            />
                        </TabPanel>
                     </Tabs>
                </div>
            </WhiteCard>
        </>
    )
}

export default LelangHistory