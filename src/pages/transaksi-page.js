import { WhiteCard } from "../components/card/white-card"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import CurrencyFormat from 'react-currency-format'
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs'
import { onLoad, onDone } from '../stateSlice/loadingSlice.js';
import 'react-tabs/style/react-tabs.css'
import axios from "axios"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import DataTable from 'react-data-table-component';
import MoreVert from '@mui/icons-material/MoreVert'

const TransaksiPage = () => {
    const dispatch = useDispatch()
    const isLogin = useSelector((state) => state.login.isLogin)
    const [allTransaksi, setAllTransaksi] = useState([])
    const [transaksiBaru, setTransaksiBaru] = useState([])
    const [transaksiKonfirmasi, setTransaksiKonfirmasi] = useState([])
    const [transaksiShip, setTransaksiShip] = useState([])
    const [transaksiDone, setTransaksiDone] = useState([])
    const [transaksiBatal, setTransaksiBatal] = useState([])
    const [pending, setPending] = useState(false)
    const ReactSwal = withReactContent(Swal)

    const openDetail = (e, transaksi) => {
        e.preventDefault()
        ReactSwal.fire({
            title: 'Detail',
            html: <div className=" w-full overflow-y-auto items-start flex flex-col">
                <span>Nama penerima : {transaksi.nama_penerima}</span>
                <span>Alamat lengkap : {transaksi.alamat_lengkap}</span>
                <span>Nomor telepon : {transaksi.nama_penerima}</span>
                <span>Kabupaten: {transaksi.kabupaten.kabupaten}</span>
                <span>Provinsi : {transaksi.provinsi.provinsi}</span>
                <span>Nama penerima : {transaksi.nama_penerima}</span>
                <span>Catatan : {transaksi.catatan}</span>
                <span>Jasa pengiriman : {transaksi.kurir.code}, {transaksi.kurir.service}, <CurrencyFormat value={transaksi.kurir.harga} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} /></span>
            </div>,
            showCloseButton: true,
        })
    }

    const cekResi = (e, resi) => {
        e.preventDefault()
        Swal.fire({
            title: 'Nomor resi',
            text: `Nomor Resi : ${resi}`,
            confirmButtonText: 'Oke',
        })
    }

    const tryInputResi = (e, id_transaksi) => {
        e.preventDefault()
        Swal.fire({
            title: 'Masukkan Nomo Resi',
            html: `<input type="text" id="resi" class="swal2-input" placeholder="masukkan nomor resi">`,
            confirmButtonText: 'simpan',
            focusConfirm: false,
            preConfirm: () => {
                const resi = Swal.getPopup().querySelector('#resi').value
                return { text: resi }
            }
        }).then((result) => {
            if (result.isConfirmed) {
                inputResi(id_transaksi, result.value.text)
            }
        })
    }

    const inputResi = async (id_transaksi, resi) => {
        dispatch(onLoad())
        await axios.post('http://localhost:6001/transaksi/inputResi', {
            withCredentials: true,
            id_transaksi,
            resi
        })
        .then((response) => {
            dispatch(onDone())
            getAllTransaksi()
            Swal.fire({
                icon: 'success',
                title: 'Berhasil!',
                text: response.data.message,
                confirmButtonText: 'Oke',
            })
        })
        .catch((error) => {
            dispatch(onDone())
            Swal.fire({
                icon: 'error',
                title: 'Gagal!',
                text: error.response.data.message,
                confirmButtonText: 'Oke',
            })
        })
    }
    const tryKonfirmasi = (e, id_transaksi) => {
        e.preventDefault()
        Swal.fire({
            title: 'Konfirmasi Transaksi?',
            text: 'Setelah anda menkonfirmasi, anda harus mengirim barang melalui kurir',
            showCancelButton: true,
            confirmButtonText: 'Ya',
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                packageTransaksi(id_transaksi)
            }
        })
    }

    const packageTransaksi = async (id_transaksi) => {
        dispatch(onLoad())
        await axios.post('http://localhost:6001/transaksi/package', {
            withCredentials: true,
            id_transaksi
        })
        .then((response) => {
            dispatch(onDone())
            getAllTransaksi()
            Swal.fire({
                icon: 'success',
                title: 'Berhasil!',
                text: response.data.message,
                confirmButtonText: 'Oke',
            })
        })
        .catch((error) => {
            dispatch(onDone())
            Swal.fire({
                icon: 'error',
                title: 'Gagal!',
                text: error.response.data.message,
                confirmButtonText: 'Oke',
            })
        })
    }

    const trySelesai = (e, id_transaksi) => {
        e.preventDefault()
        Swal.fire({
            title: 'Selamat transaksi berhasil',
            text: 'Jaminan dan uang pembayaran akan di kirim ke akun anda setelah menkonfirmasi',
            showCancelButton: true,
            confirmButtonText: 'Ya',
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                selesaiTransaksi(id_transaksi)
            }
        })
    }
    const selesaiTransaksi = async (id_transaksi) => {
        dispatch(onLoad())
        await axios.post('http://localhost:6001/transaksi/transaksiSelesai', {
            withCredentials: true,
            id_transaksi
        })
        .then((response) => {
            dispatch(onDone())
            getAllTransaksi()
            Swal.fire({
                icon: 'success',
                title: 'Berhasil!',
                text: response.data.message,
                confirmButtonText: 'Oke',
            })
        })
        .catch((error) => {
            dispatch(onDone())
            Swal.fire({
                icon: 'error',
                title: 'Gagal!',
                text: error.response.data.message,
                confirmButtonText: 'Oke',
            })
        })
    }

    const tryBatalkan = (e, id_transaksi) => {
        e.preventDefault()
        Swal.fire({
            title: 'Batalkan Transaksi?',
            text: 'Jaminan tidak akan kembali jika anda membatalkan transaksi',
            showCancelButton: true,
            confirmButtonText: 'Ya',
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                batalkanTransaksi(id_transaksi)
            }
        })
    }
    const batalkanTransaksi = async (id_transaksi) => {
        dispatch(onLoad())
        await axios.post('http://localhost:6001/transaksi/cancelTransaksi', {
            withCredentials: true,
            id_transaksi
        })
        .then((response) => {
            dispatch(onDone())
            getAllTransaksi()
            Swal.fire({
                icon: 'success',
                title: 'Berhasil!',
                text: response.data.message,
                confirmButtonText: 'Oke',
            })
        })
        .catch((error) => {
            dispatch(onDone())
            Swal.fire({
                icon: 'error',
                title: 'Gagal!',
                text: error.response.data.message,
                confirmButtonText: 'Oke',
            })
        })
    }

    const getAllTransaksi = async () => {
        setAllTransaksi([])
        setPending(true)
        dispatch(onLoad())
        await axios.post('http://localhost:6001/transaksi/getTransaksiSeller', {
            withCredentials: true
        })
        .then(async (response) => {
            response.data.allTransaksi.map(async (transaksi) => {
                await axios.get(`http://localhost:6001/item/getItem?itemId=${transaksi.id_item}`)
                    .then((response) => {
                        setTransaksiBaru([])
                        setTransaksiKonfirmasi([])
                        setTransaksiBatal([])
                        setTransaksiShip([])
                        setTransaksiDone([])
                        transaksi.item = response.data.item
                        setAllTransaksi(t => [...t, transaksi])
                    })
            })
            setPending(false)
            dispatch(onDone())
            console.log(response.data.message)
        })
        .catch((error) => {
            setPending(false)
            dispatch(onDone())
            console.log(error.response.data.message)
        })
    }

    useEffect(() => {
        
        if(allTransaksi !== []) {
            allTransaksi.map((transaksi) => {
                switch (transaksi.status) {
                    case "unconfirmed":
                        setTransaksiBaru(t => [...t, transaksi])
                        return
                    case "confirmed":
                        setTransaksiBaru(t => [...t, transaksi])
                        return
                    case "payed":
                        setTransaksiKonfirmasi(t => [...t, transaksi])
                        return
                    case "canceled":
                        setTransaksiBatal(t => [...t, transaksi])
                        return
                    case "packaging":
                        setTransaksiKonfirmasi(t => [...t, transaksi])
                        return
                    case "onshipping":
                        setTransaksiShip(t => [...t, transaksi])
                        return
                    case "delivered":
                        setTransaksiDone(t => [...t, transaksi])
                        return
                    case "done":
                        setTransaksiDone(t => [...t, transaksi])
                        return
                    default:
                        return
                }
            })
        }
    }, [allTransaksi])

    useEffect(() => {
        if (isLogin) {
            getAllTransaksi()
        }
    }, [isLogin])

    const statusColor = (status) => {
        switch (status) {
            case "unconfirmed":
                return 'text-sky-500 border-yellow-500'
            case "confirmed":
                return 'text-yellow-500 border-yellow-500'
            case "payed":
                return 'text-green-500 border-green-500'
            case "canceled":
                return 'text-red-500 border-red-500'
            case "packaging":
                return 'text-sky-500 border-sky-500'
            case "onshipping":
                return 'text-yellow-500 border-yellow-500'
            case "delivered":
                return 'text-green-500 border-green-500'
            case "done":
                return 'text-green-500 border-green-500'
            default:
                return 'text-slate-500 border-slate-500'
        }
    }

    const columnBaru = [
        {
            name: 'Item',
            cell: row => (
                <><div className="flex items-center">
                    <img src={row.item.gambar[0].url} className="h-10 w-10" alt={row.item._id} />
                    <span className="line-clamp-2 w-14">{row.item.nama_item}</span>
                </div></>
            )
        },
        {
            name: 'Harga',
            cell: row => (
                <><span><CurrencyFormat value={row.final_price} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} /></span></>
            )
        },
        {
            name: 'Status',
            cell: row => (
                <><span className={`font-mono rounded-full p-1 border ${statusColor(row.status)}`}>{row.status}</span></>
            )
        },
        {
            name: 'Pembeli Membayar',
            cell: row => (
                <><span>{row.sub_total === null ? "belum dibuat" : <CurrencyFormat value={row.sub_total} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} />}</span></>
            )
        },
        {
            name: 'Aksi',
            cell: row => (
                <button onClick={(e) => tryBatalkan(e, row._id)} className="underline text-sky-500">Batalkan</button>
            )
        }
    ]

    const columnKonfirmasi = [
        {
            name: 'Item',
            cell: row => (
                <><div className="flex items-center">
                    <img src={row.item.gambar[0].url} className="h-10 w-10" alt={row.item._id} />
                    <span className="line-clamp-2 w-14">{row.item.nama_item}</span>
                </div></>
            )
        },
        {
            name: 'Harga',
            cell: row => (
                <><span><CurrencyFormat value={row.final_price} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} /></span></>
            )
        },
        {
            name: 'Status',
            cell: row => (
                <><span className={`font-mono rounded-full p-1 border ${statusColor(row.status)}`}>{row.status}</span></>
            )
        },
        {
            name: 'Pembeli Membayar',
            cell: row => (
                <><span>{row.sub_total === null ? "belum dibuat" : <CurrencyFormat value={row.sub_total} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} />}</span></>
            )
        },
        {
            name: 'Aksi',
            cell: row => (
                <div className="w-full flex gap-1">
                    <button className="dropdown-toggle text-orange-500 hover:bg-orange-300 shadow hover:shadow-lg focus:bg-orange-500 border focus:text-white outline-slate-100 rounded" type="button" id={row._id} data-bs-toggle="dropdown" aria-expanded="false"><MoreVert /></button>
                    <ul className="dropdown-menu hidden absolute bg-white float-left text-left py-2 list-none rounded-lg shadow-lg mt-1 m-0 bg-clip-padding border-none min-w-max" aria-labelledby={row._id}>
                        <li className="dropdown-item">
                            <button className="w-full px-4 text-left hover:bg-orange-300 whitespace-nowrap" onClick={(e) => openDetail(e, row)}>Detail</button>
                        </li>
                        <li className="dropdown-item">
                        {row.status === 'payed' ? 
                            <button onClick={(e) => tryKonfirmasi(e, row._id)} className="w-full px-4 text-left hover:bg-orange-300 whitespace-nowrap">Konfirmasi</button>
                            :
                            <button onClick={(e) => tryInputResi(e, row._id)} className="w-full px-4 text-left hover:bg-orange-300 whitespace-nowrap">Input Resi</button>
                            }
                        </li>
                    </ul>
                </div>
            )
        }
    ]
    const columnShip = [
        {
            name: 'Item',
            cell: row => (
                <><div className="flex items-center">
                    <img src={row.item.gambar[0].url} className="h-10 w-10" alt={row.item._id} />
                    <span className="line-clamp-2 w-14">{row.item.nama_item}</span>
                </div></>
            )
        },
        {
            name: 'Harga',
            cell: row => (
                <><span><CurrencyFormat value={row.final_price} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} /></span></>
            )
        },
        {
            name: 'Status',
            cell: row => (
                <><span className={`font-mono rounded-full p-1 border ${statusColor(row.status)}`}>{row.status}</span></>
            )
        },
        {
            name: 'Pembeli Membayar',
            cell: row => (
                <><span>{row.sub_total === null ? "belum dibuat" : <CurrencyFormat value={row.sub_total} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} />}</span></>
            )
        },
        {
            name: 'Bayar',
            cell: row => (
                <button onClick={(e) => cekResi(e, row.resi)} className="underline text-sky-500">Cek resi</button>
            )
        }
    ]
    const columnDone = [
        {
            name: 'Item',
            cell: row => (
                <><div className="flex items-center">
                    <img src={row.item.gambar[0].url} className="h-10 w-10" alt={row.item._id} />
                    <span className="line-clamp-2 w-14">{row.item.nama_item}</span>
                </div></>
            )
        },
        {
            name: 'Harga',
            cell: row => (
                <><span><CurrencyFormat value={row.final_price} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} /></span></>
            )
        },
        {
            name: 'Status',
            cell: row => (
                <><span className={`font-mono rounded-full p-1 border ${statusColor(row.status)}`}>{row.status}</span></>
            )
        },
        {
            name: 'Pembeli Membayar',
            cell: row => (
                <><span>{row.sub_total === null ? "belum dibuat" : <CurrencyFormat value={row.sub_total} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} />}</span></>
            )
        },
        {
            name: 'Payout',
            cell: row => (
                <button onClick={(e) => trySelesai(e, row._id)} className="underline text-sky-500">Konfirmasi</button>
            )
        }
    ]
    const columnBatal = [
        {
            name: 'Item',
            cell: row => (
                <><div className="flex items-center">
                    <img src={row.item.gambar[0].url} className="h-10 w-10" alt={row.item._id} />
                    <span className="line-clamp-2 w-14">{row.item.nama_item}</span>
                </div></>
            )
        },
        {
            name: 'Harga',
            cell: row => (
                <><span><CurrencyFormat value={row.final_price} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} /></span></>
            )
        },
        {
            name: 'Status',
            cell: row => (
                <><span className={`font-mono rounded-full p-1 border ${statusColor(row.status)}`}>{row.status}</span></>
            )
        },
        {
            name: 'Pembeli Membayar',
            cell: row => (
                <><span>{row.sub_total === null ? "belum dibuat" : <CurrencyFormat value={row.sub_total} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} />}</span></>
            )
        },
        {
            name: 'Dibatalkan oleh',
            cell: row => (
                <span>{row.id_seller === row.canceled_by ? "Anda" : "Pembeli"}</span>
            )
        }
    ]

    return(
        <>
        <WhiteCard>
            <div className="min-h-[500px]">
                <Tabs>
                    <TabList>
                        <Tab>Baru</Tab>
                        <Tab>Konfirmasi</Tab>
                        <Tab>Dalam Pengiriman</Tab>
                        <Tab>Selesai</Tab>
                        <Tab>Dibatalkan</Tab>
                    </TabList>

                    <TabPanel>
                        <DataTable
                            columns={columnBaru}
                            data={transaksiBaru}
                            noDataComponent="Belum ada transaksi"
                            progressPending={pending}
                            // customStyles={customStyles}
                            noHeader={true}
                        />
                    </TabPanel>
                    <TabPanel>
                        <DataTable
                            columns={columnKonfirmasi}
                            data={transaksiKonfirmasi}
                            noDataComponent="Belum ada transaksi"
                            progressPending={pending}
                            // customStyles={customStyles}
                            noHeader={true}
                        />
                    </TabPanel>
                    <TabPanel>
                        <DataTable
                            columns={columnShip}
                            data={transaksiShip}
                            noDataComponent="Belum ada transaksi"
                            progressPending={pending}
                            // customStyles={customStyles}
                            noHeader={true}
                        />
                    </TabPanel>
                    <TabPanel>
                        <DataTable
                            columns={columnDone}
                            data={transaksiDone}
                            noDataComponent="Belum ada transaksi"
                            progressPending={pending}
                            // customStyles={customStyles}
                            noHeader={true}
                        />
                    </TabPanel>
                    <TabPanel>
                        <DataTable
                            columns={columnBatal}
                            data={transaksiBatal}
                            noDataComponent="Belum ada transaksi"
                            progressPending={pending}
                            // customStyles={customStyles}
                            noHeader={true}
                        />
                    </TabPanel>
                </Tabs>
            </div>
        </WhiteCard>
        </>
    )
}

export default TransaksiPage