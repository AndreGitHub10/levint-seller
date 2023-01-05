import React, { useEffect, useState } from "react"
import Modal from "../components/modal/modal"
import axios from "axios"
import Select from 'react-select'
import moment from 'moment'
import 'moment/locale/id'
import { id } from 'date-fns/locale'
import CurrencyInput from 'react-currency-input-field'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { Calendar } from 'react-date-range'
import DefaultButton from "../components/button/defaultButton";
import { WhiteCard } from "../components/card/white-card"
import { useDispatch, useSelector } from "react-redux"
import DataTable from "react-data-table-component"
import { parseISO } from "date-fns"
import Add from "@mui/icons-material/Add"
import Remove from "@mui/icons-material/Remove"
import RoundedButton from "../components/button/roundedButton"
import { onLoad, onDone } from "../stateSlice/loadingSlice"
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom"

const LelangAdd = () => {
    const dispatch = useDispatch()
    const [items, setItems] = useState([])
    const seller = useSelector((state) => state.seller.dataSeller)
    const [item, setItem] = useState(null)
    const [errorFields, setErrorFields] = useState([{param: 'ok', msg: 'ko'}])
    const navigate = useNavigate()
    const [lelangDetail, setLelangDetail] = useState(
        {
            id_item: "",
            harga_dasar: 0,
            tanggal_mulai: parseISO(moment(new Date()).set('hours', (new Date().getHours() + 1)).set('minutes', 0).format()),
            bid_increase: 1000,
            auto_sell: false,
            auto_sell_price: 0,
            sell_limit: false,
            sell_limit_price: 0,
            open_bidding: true,
            estLelang_hari: 0,
            estLelang_jam: 1
        }
    )
    
    const nowDate = new Date()
    const maxDate = () => {
        const max = new Date(nowDate)
        max.setDate(nowDate.getDate() + 14)
        return max
    }
    const [modalShow, setModalShow] = useState(false)
    const [dateModalShow, setDateModalShow] = useState(false)

    const [autoSell, setAutoSell] = useState(false)
    const [sellLimit, setSellLimit] = useState(false)
    useEffect(() => {
        if(!autoSell) {
            setLelangDetail(l => ({...l, auto_sell: false, auto_sell_price: 0}))
        }
    }, [autoSell])
    
    useEffect(() => {
        if(!sellLimit) {
            setLelangDetail(l => ({...l, sell_limit: false, sell_limit_price: 0}))
        }
    }, [sellLimit])

    useEffect(() => {
        if(lelangDetail.tanggal_mulai.toDateString() === new Date().toDateString()) {
            if(lelangDetail.tanggal_mulai.getHours() <= new Date().getHours())
                setLelangDetail({...lelangDetail, tanggal_mulai: parseISO(moment(lelangDetail.tanggal_mulai).set('hour', (new Date().getHours() + 1)).format())})
        }
        if(lelangDetail.estLelang_hari === 0){
            if(lelangDetail.estLelang_jam === 0){
                setLelangDetail({...lelangDetail, estLelang_jam: 1})
            }
        }
        if(lelangDetail.estLelang_hari === 7){
            if(lelangDetail.estLelang_jam > 0){
                setLelangDetail({...lelangDetail, estLelang_jam: 0})
            }
        }
        console.log(lelangDetail)
    }, [lelangDetail])

    const openModal = (e) => {
        e.preventDefault()
        setModalShow(true)
    }
    const closeModal = (e) => {
        e.preventDefault()
        setModalShow(false)
    }

    const openDateModal = (e) => {
        e.preventDefault()
        setDateModalShow(true)
    }
    const closeDateModal = (e) => {
        e.preventDefault()
        setDateModalShow(false)
    }

    const hourSelect = [
        {
            value: '0',
            label: '00:00'
        },
        {
            value: '1',
            label: '01:00'
        },{
            value: '2',
            label: '02:00'
        },{
            value: '3',
            label: '03:00'
        },{
            value: '4',
            label: '04:00'
        },{
            value: '5',
            label: '05:00'
        },{
            value: '6',
            label: '06:00'
        },{
            value: '7',
            label: '07:00'
        },{
            value: '8',
            label: '08:00'
        },{
            value: '9',
            label: '09:00'
        },{
            value: '10',
            label: '10:00'
        },{
            value: '11',
            label: '11:00'
        },{
            value: '12',
            label: '12:00'
        },{
            value: '13',
            label: '13:00'
        },{
            value: '14',
            label: '14:00'
        },{
            value: '15',
            label: '15:00'
        },{
            value: '16',
            label: '16:00'
        },{
            value: '17',
            label: '17:00'
        },{
            value: '18',
            label: '18:00'
        },{
            value: '19',
            label: '19:00'
        },{
            value: '20',
            label: '20:00'
        },{
            value: '21',
            label: '21:00'
        },{
            value: '22',
            label: '22:00'
        },{
            value: '23',
            label: '23:00'
        }
    ]

    const setStartHour = (value) => {
        setLelangDetail({...lelangDetail, tanggal_mulai: parseISO(moment(lelangDetail.tanggal_mulai).set('hour', value.value).format())})
    }

    const setOpenBidding = ({e, value}) => {
        e.preventDefault()
        setLelangDetail({...lelangDetail, open_bidding: value})
    }

    const bidIncrement = [
        {
            value: '1000',
            label: '1.000'
        },
        {
            value: '5000',
            label: '5.000'
        },
        {
            value: '10000',
            label: '10.000'
        },
        {
            value: '50000',
            label: '50.000'
        },
        {
            value: '100000',
            label: '100.000'
        },
        {
            value: '500000',
            label: '500.000'
        },
        {
            value: '1000000',
            label: '1.000.000'
        }
    ]

    const setBidIncrement = (value) => {
        setLelangDetail({...lelangDetail, bid_increase: parseInt(value.value)})
    }

    const increaseHari = (e) => {
        e.preventDefault()
        if(lelangDetail.estLelang_hari < 7){
            setLelangDetail({...lelangDetail, estLelang_hari: lelangDetail.estLelang_hari + 1})
        }
    }

    const decreaseHari = (e) => {
        e.preventDefault()
        if(lelangDetail.estLelang_hari > 0){
            setLelangDetail({...lelangDetail, estLelang_hari: lelangDetail.estLelang_hari - 1})
        }
    }

    const increaseJam = (e) => {
        e.preventDefault()
        if(lelangDetail.estLelang_jam < 23){
            setLelangDetail({...lelangDetail, estLelang_jam: lelangDetail.estLelang_jam + 1})
        }
    }

    const decreaseJam = (e) => {
        e.preventDefault()
        if(lelangDetail.estLelang_jam > 0){
            setLelangDetail({...lelangDetail, estLelang_jam: lelangDetail.estLelang_jam - 1})
        }
    }

    const columns = [
        {
            name: 'Item',
            cell: row => (
                <div className="">
                    <img src={row.gambar[0].url} className="w-10 h-10" alt={row._id}/>
                </div>
            ),
            sortable: true
        },
        {
            name: 'Nama Item',
            selector: row => row.nama_item,
            sortable: true
        },
        {
            name: 'Action',
            grow: 1,
            cell: row => (
                <div className="w-full flex gap-1">
                    <DefaultButton
                    onClick={(e) => {
                        setItem(row)
                        closeModal(e)
                        setLelangDetail({...lelangDetail, id_item: row._id})
                    }}
                    >Pilih</DefaultButton>
                </div>
            )
        }
    ]

    const confirmStore = (event) => {
        event.preventDefault()
        Swal.fire({
            title: 'Simpan jadwal lelang?',
            showCancelButton: true,
            confirmButtonText: 'Save',
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              storeLelang()
            }
          })
    }

    const storeLelang = async () => {
        let api
        if(lelangDetail.open_bidding) {
            api = 'create'
        } else {
            api = 'createClosed'
        }
        dispatch(onLoad())
        await axios.post(`http://localhost:6001/lelang/${api}`, {
            withCredentials: true,
            id_item: lelangDetail.id_item,
            harga_dasar: lelangDetail.harga_dasar,
            tanggal_mulai: lelangDetail.tanggal_mulai,
            bid_increase: lelangDetail.bid_increase, 
            auto_sell_price: lelangDetail.auto_sell_price, 
            auto_sell: lelangDetail.auto_sell, 
            sell_limit: lelangDetail.sell_limit, 
            sell_limit_price: lelangDetail.sell_limit_price, 
            open_bidding: lelangDetail.open_bidding, 
            estLelang_hari: lelangDetail.estLelang_hari, 
            estLelang_jam: lelangDetail.estLelang_jam
        })
        .then(response => {
            dispatch(onDone())
            Swal.fire({
                title: 'Jadwal lelang berhasil disimpan!',
                icon: 'success',
                confirmButtonText: 'Lihat',
                confirmButtonColor: 'blue',
                showDenyButton: true,
                denyButtonText: 'Ok',
                denyButtonColor: 'orange'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/lelangShow')
                } else if (result.isDenied) {
                    setLelangDetail({
                        id_item: "",
                        harga_dasar: 0,
                        tanggal_mulai: parseISO(moment(new Date()).set('hours', (new Date().getHours() + 1)).set('minutes', 0).format()),
                        bid_increase: 1000,
                        auto_sell: false,
                        auto_sell_price: 0,
                        sell_limit: false,
                        sell_limit_price: 0,
                        open_bidding: true,
                        estLelang_hari: 0,
                        estLelang_jam: 1
                    })
                    setItem(null)
                    setSellLimit(false)
                    setAutoSell(false)
                }
            })
            console.log(response.data.message)
        })
        .catch(err => {
            dispatch(onDone())
            if(err.response.data.errors !== undefined){
                setErrorFields(err.response.data.errors)
            }
            console.log(err.response.data.message)
            Swal.fire({
                title: 'Gagal untuk menyimpan!',
                text: err.response.data.message,
                icon: 'error',
                confirmButtonText: 'OK',
                confirmButtonColor: 'orange'
            })
        })
    }

    // const deleteAll = async (e) => {
    //     e.preventDefault()
    //     await axios.delete('http://localhost:6001/lelang/deleteAll', {
    //         withCredentials: true
    //     })
    //     .then(response => console.log(response.data.message))
    // }

    useEffect(() => {
        const getItem = async () => {
            await axios.get(`http://localhost:6001/item/getNewItemBySeller?sellerId=${seller._id}`)
            .then((response) => {
                console.log(response.data.message)
                setItems(response.data.dataItem)
            })
            .catch((err) => {console.log(err)})
        }

        getItem()
    }, [seller])

    return(
        // <form className="relative gap-x-4 lg:grid lg:grid-rows-2 lg:grid-cols-3 lg:grid-flow-col h-fit">
        <form className="relative gap-x-4 lg:flex" onSubmit={confirmStore}>
                <div className="lg:w-1/3 lg:flex gap-x-4 lg:row-span-2 lg:col-span-1">
                    <WhiteCard sectionTitle={"Item yang akan dilelang"}>
                    <DefaultButton onClick={(e) => (modalShow ? closeModal(e) : openModal(e))}>{item === null ? 'Pilih' : 'Ganti'}</DefaultButton>
                        {!(item === null) ?
                            <div className="flex rounded shadow outline-dashed outline-orange-300 p-4">
                                <img src={item.gambar[0].url} alt="#" className=" aspect-square h-20 w-20"/>
                                <span className="pl-2">{item.nama_item}</span>
                            </div>
                            :
                            <div className="flex rounded shadow outline-dashed outline-orange-300 p-4">
                            <span className="pl-2 text-orange-500">Anda belum memilih item</span>
                            </div>
                        }
                        {/* <DefaultButton onClick={(e) => deleteAll(e)}>Delete All</DefaultButton> */}
                    </WhiteCard>
                </div>
                {/* <div className="w-auto lg:flex lg:flex-row gap-x-4 lg:col-span-2"> */}
                <div className="lg:w-2/3 lg:flex lg:flex-col gap-x-4">
                    <div className="flex lg:flex-row flex-col gap-x-4">
                        <WhiteCard sectionTitle={"Atur jadwal lelang"}>
                            <div className='flex flex-col'>
                                <label className='justify-self-start w-fit mt-4'>Tanggal mulai<span className='text-red-500 pl-1'>*</span></label>
                                <div className="flex justify-between">
                                <span className="text-orange-500 shrink">{moment(lelangDetail.tanggal_mulai).format('dddd, DD-MMMM-yyyy')}</span>
                                <div className=" shrink-0"><DefaultButton onClick={(e) => (dateModalShow ? closeDateModal(e) : openDateModal(e))}>Atur</DefaultButton></div></div>
                                <label className='justify-self-start w-fit mt-4'>Pukul<span className='text-red-500 pl-1'>*</span></label>
                                <Select 
                                    options={(new Date().toDateString() === lelangDetail.tanggal_mulai.toDateString()) ? hourSelect.filter(x => x.value > new Date().getHours()) : hourSelect} 
                                    className='basic-single text-orange-500' 
                                    classNamePrefix="select" 
                                    name="bidIncrement" 
                                    isSearchable={false}
                                    defaultValue={(new Date().toDateString() === lelangDetail.tanggal_mulai.toDateString()) ? 
                                        ((new Date().getHours() > lelangDetail.tanggal_mulai.getHours()) ? hourSelect.find(x => x.value === '1') : hourSelect.find(x => x.value === lelangDetail.tanggal_mulai.getHours().toString()) )
                                        : 
                                        hourSelect.find(x => x.value === moment(lelangDetail.tanggal_mulai).hours().toString())} 
                                    onChange={setStartHour} 
                                    value={(new Date().toDateString() === lelangDetail.tanggal_mulai.toDateString()) ? 
                                        ((new Date().getHours() > lelangDetail.tanggal_mulai.getHours()) ? hourSelect.find(x => x.value === (new Date().getHours() + 1).toString()) : hourSelect.find(x => x.value === lelangDetail.tanggal_mulai.getHours().toString()) )
                                        : 
                                        hourSelect.find(x => x.value === lelangDetail.tanggal_mulai.getHours().toString())}
                                />
                            </div>
                            <div className="flex flex-col mt-4">
                                <label className='justify-self-start w-fit'>Estimasi waktu lelang<span className='text-red-500 pl-1'>*</span></label>
                                <div className="flex w-full gap-x-4">
                                    <div className="flex flex-1 border border-orange-500 rounded-full justify-between">
                                        <RoundedButton onClick={(e) => decreaseHari(e)} disabled={lelangDetail.estLelang_hari === 0 ? true : false}><Remove /></RoundedButton>
                                        <span className=" text-orange-500">{lelangDetail.estLelang_hari} Hari</span>
                                        <RoundedButton onClick={(e) => increaseHari(e)} disabled={lelangDetail.estLelang_hari === 7 ? true : false}><Add /></RoundedButton>
                                    </div>
                                    <div className="flex flex-1 border-orange-500 rounded-full justify-between border">
                                        <RoundedButton onClick={(e) => decreaseJam(e)} disabled={lelangDetail.estLelang_jam === 0 ? true : false}><Remove /></RoundedButton>
                                        <span className=" text-orange-500">{lelangDetail.estLelang_jam} Jam</span>
                                        <RoundedButton onClick={(e) => increaseJam(e)} disabled={lelangDetail.estLelang_jam === 23 || lelangDetail.estLelang_hari === 7 ? true : false}><Add /></RoundedButton>
                                    </div>
                                </div>
                                <label className='justify-self-start w-fit'></label>
                            </div>
                        </WhiteCard>
                        <WhiteCard sectionTitle={"Mode Lelang"}>
                            <div className="flex lg:grid h-48 content-center gap-2">
                                <button className={`shrink w-full shadow rounded ` + (lelangDetail.open_bidding ? `bg-orange-500 text-white shadow-orange-500` : 'bg-transparent text-orange-500')} onClick={(e) => setOpenBidding({e, value: true})}>Open Bidding</button>
                                <span className="mx-auto shrink-0">atau</span>
                                <button className={`shrink w-full shadow rounded ` + (!lelangDetail.open_bidding ? `bg-orange-500 text-white shadow-orange-500` : 'bg-transparent text-orange-500')} onClick={(e) => setOpenBidding({e, value: false})}>Closed Bidding</button>
                            </div>
                        </WhiteCard>
                    </div>
                    <div className="w-full">
                    <WhiteCard sectionTitle={"Detail pelelangan"}>
                        <div className='flex flex-col'>
                            <label className='justify-self-start w-fit'>Harga dasar<span className='text-red-500 pl-1'>* {errorFields.find(({param}) => param === "harga_dasar") ? errorFields.find(({param}) => param === "harga_dasar").msg : ''}</span></label>
                            <CurrencyInput 
                                id="example"
                                name="example"
                                placeholder="Harga awal (rupiah)"
                                onValueChange={(value) => setLelangDetail({...lelangDetail, harga_dasar: parseInt(value)})}
                                value={lelangDetail.harga_dasar.toString()}
                                prefix="Rp "
                                groupSeparator="."
                                decimalSeparator=","
                                className="border-0 border-b border-orange-300 px-0 py-1 focus:outline-none focus:border-orange-500"
                            />
                        </div>
                        {lelangDetail.open_bidding ? 
                        <>
                        <div className='flex flex-col'>
                            <div className='form-check form-switch' style={{paddingLeft:"0px"}}>
                                <label className='justify-self-start w-fit'>Auto sell</label>
                                <input type='checkbox' role='switch' className="form-check-input px-0 py-1 appearance-none w-9 -ml-10 rounded-full float-right h-5 align-top bg-no-repeat bg-contain bg-gray-300 focus:outline-none cursor-pointer shadow-sm" onChange={(e) => setAutoSell(e.target.checked)} checked={autoSell}></input>
                            </div>
                            <CurrencyInput 
                                placeholder="Otomatis terjual pada harga (rupiah)" 
                                className={`border-0 border-b px-0 py-1 focus:outline-none ` + (autoSell ? `border-orange-500` : `border-slate-300`)} 
                                onValueChange={(value) => setLelangDetail({...lelangDetail, auto_sell_price: value, auto_sell: true})} 
                                value={!autoSell ? '' : lelangDetail.auto_sell_price} 
                                disabled={(autoSell ? false : true)}
                                prefix="Rp "
                                groupSeparator="."
                                decimalSeparator=","
                            />
                        </div>
                        <div className='flex flex-col'>
                            <div className='form-check form-switch' style={{paddingLeft:"0px"}}>
                                <label className='justify-self-start w-fit'>Sell limit</label>
                                <input type='checkbox' role='switch' className="form-check-input px-0 py-1 appearance-none w-9 -ml-10 rounded-full float-right h-5 align-top bg-no-repeat bg-contain bg-gray-300 focus:outline-none cursor-pointer shadow-sm" onChange={(e) => setSellLimit(e.target.checked)} checked={sellLimit}></input>
                            </div>
                            <CurrencyInput 
                                placeholder="Batas minimum tawaran (rupiah)" 
                                className={`border-0 border-b px-0 py-1 focus:outline-none ` + (sellLimit ? `border-orange-500` : `border-slate-300`)} 
                                onValueChange={(value) => setLelangDetail({...lelangDetail, sell_limit_price: value, sell_limit: true})} 
                                value={!sellLimit ? '' : lelangDetail.sell_limit_price} 
                                disabled={(sellLimit ? false : true)}
                                prefix="Rp "
                                groupSeparator="."
                                decimalSeparator=","
                            />
                        </div>
                        </>
                        :
                        <></>
                        }
                        <div className='flex flex-col'>
                            <label className='justify-self-start w-fit'>Kelipatan kenaikan tawaran / BID Increment<span className='text-red-500 pl-1'>*</span></label>
                            <Select options={bidIncrement} isSearchable={false} className='basic-single' classNamePrefix="select" name="bidIncrement" defaultValue={lelangDetail.bid_increase ? bidIncrement.find(x => x.value === lelangDetail.bid_increase.toString()) : bidIncrement[0]} onChange={setBidIncrement}/>
                        </div>
                        <DefaultButton type="submit">Simpan jadwal lelang</DefaultButton>
                    </WhiteCard>
                    </div>
                </div>
                {/* <div className="w-auto lg:col-span-2">
                    <WhiteCard>
                        <div className='flex flex-col'>
                            <label className='justify-self-start w-fit'>Harga dasar<span className='text-red-500 pl-1'>*</span></label>
                            <CurrencyInput 
                                id="example"
                                name="example"
                                placeholder="Harga awal (rupiah)"
                                onValueChange={(value) => setLelangDetail({...lelangDetail, harga_dasar: value})}
                                value={lelangDetail.harga_dasar}
                                prefix="Rp "
                                groupSeparator="."
                                decimalSeparator=","
                                className="border-0 border-b border-orange-300 px-0 py-1 focus:outline-none focus:border-orange-500"
                            />
                        </div>
                        <div className='flex flex-col'>
                            <div className='form-check form-switch' style={{paddingLeft:"0px"}}>
                                <label className='justify-self-start w-fit'>Auto sell</label>
                                <input type='checkbox' role='switch' className="form-check-input px-0 py-1 appearance-none w-9 -ml-10 rounded-full float-right h-5 align-top bg-no-repeat bg-contain bg-gray-300 focus:outline-none cursor-pointer shadow-sm" onClick={(e) => setAutoSell(e.target.checked)}></input>
                            </div>
                            <CurrencyInput 
                                placeholder="Otomatis terjual pada harga (rupiah)" 
                                className={`border-0 border-b px-0 py-1 focus:outline-none ` + (autoSell ? `border-orange-500` : `border-slate-300`)} 
                                onValueChange={(value) => setLelangDetail({...lelangDetail, auto_sell: value})} 
                                value={lelangDetail.auto_sell} 
                                disabled={(autoSell ? false : true)}
                                prefix="Rp "
                                groupSeparator="."
                                decimalSeparator=","
                            />
                        </div>
                        <div className='flex flex-col'>
                            <div className='form-check form-switch' style={{paddingLeft:"0px"}}>
                                <label className='justify-self-start w-fit'>Sell limit</label>
                                <input type='checkbox' role='switch' className="form-check-input px-0 py-1 appearance-none w-9 -ml-10 rounded-full float-right h-5 align-top bg-no-repeat bg-contain bg-gray-300 focus:outline-none cursor-pointer shadow-sm" onClick={(e) => setSellLimit(e.target.checked)}></input>
                            </div>
                            <CurrencyInput 
                                placeholder="Batas minimum tawaran (rupiah)" 
                                className={`border-0 border-b px-0 py-1 focus:outline-none ` + (sellLimit ? `border-orange-500` : `border-slate-300`)} 
                                onValueChange={(value) => setLelangDetail({...lelangDetail, sell_limit: value})} 
                                value={lelangDetail.sell_limit} 
                                disabled={(sellLimit ? false : true)}
                                prefix="Rp "
                                groupSeparator="."
                                decimalSeparator=","
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label className='justify-self-start w-fit'>Kelipatan kenaikan tawaran / BID Increment<span className='text-red-500 pl-1'>*</span></label>
                            <Select options={bidIncrement} className='basic-single' classNamePrefix="select" name="bidIncrement" defaultValue={lelangDetail.bid_increase ? bidIncrement.find(x => x.value === lelangDetail.bid_increase) : bidIncrement[0]} onChange={setBidIncrement}/>
                        </div>
                        <DefaultButton type="submit">Simpan jadwal lelang</DefaultButton>
                    </WhiteCard>
                </div> */}
            {modalShow && <Modal handleClose={closeModal}>
                <div className="overflow-scroll w-full">
                    <DataTable data={items} columns={columns}/>
                </div>
            </Modal>}
            {dateModalShow && <Modal handleClose={closeDateModal}>
                <div className="overflow-scroll w-full justify-center flex">
                        <Calendar
                        locale={id}
                        date={lelangDetail.tanggal_mulai}
                        minDate={nowDate}
                        maxDate={maxDate()}
                        onChange={(e) => setLelangDetail({...lelangDetail, tanggal_mulai: parseISO(moment(e).set('hour', moment(lelangDetail.tanggal_mulai).hours()).format())})}
                        />
                </div>
            </Modal>}
        </form>
    )
}

export default LelangAdd