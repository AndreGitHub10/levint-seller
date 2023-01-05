import React, { useEffect, useState, useRef } from "react"
import Select from 'react-select'
import moment, { now } from 'moment'
import ms from "ms"
import 'moment/locale/id'
import { id } from 'date-fns/locale'
import CurrencyInput from 'react-currency-input-field'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { Calendar } from 'react-date-range'
import DefaultButton from "../button/defaultButton"
import { WhiteCard } from "../card/white-card"
import { InputBorderBottom } from "../input/input-border-bottom"
import { max } from "date-fns"

const LelangForm = () => {
    const [lelangDetail, setLelangDetail] = useState(
        {
            id_item: "",
            harga_awal: '5000',
            tanggal_mulai: new Date(),
            tanggal_akhir: moment().add(1, 'days').format('dddd, DD-MMMM-yyyy'),
            status: "",
            bid_increase: "1000",
            auto_sell_at: "",
        }
    )
    
    const nowDate = new Date()
    const maxDate = () => {
        const max = new Date(nowDate)
        max.setDate(nowDate.getDate() + 14)
        return max
    }

    const [selectionRange, setSelectionRange] = useState({
        startDate: new Date(),
        endDate: new Date(),
    })


    const [startEdit, setStartEdit] = useState()
    const [endEdit, setEndEdit] = useState(null)

    const [autoSell, setAutoSell] = useState(false)
    const [modalShow, setModalShow] = useState(false)

    const startDateRef = useRef()

    useEffect(() => {
        if(!autoSell) {
            setLelangDetail({...lelangDetail, auto_sell_at: ''})
        }
    }, [autoSell])

    const openModal = (e) => {
        e.preventDefault()
        setModalShow(true)
    }
    const closeModal = (e) => {
        e.preventDefault()
        setModalShow(false)
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
            value: '100000',
            label: '1.000.000'
        },
        {
            value: '500000',
            label: '5.000.000'
        },
        {
            value: '10000000',
            label: '10.000.000'
        }
    ]

    const setBidIncrement = (value) => {
        setLelangDetail({...lelangDetail, bid_increase: value.value})
    }

    useEffect(() => {
        console.log(lelangDetail)
    }, [lelangDetail])

    useEffect(() => {
        const minSec = ms('7d')
        const max_date = new Date(+new Date(startEdit) + minSec)
        setEndEdit(moment(max_date).format('YYYY-MM-DD'))
    }, [startEdit])
    return(
        <form className="flex flex-col">
            <div className="md:w-1/3">
                <WhiteCard sectionTitle={"Item yang akan dilelang"}>
                    <DefaultButton onClick={(e) => (modalShow ? closeModal(e) : openModal(e))}>{item === null ? 'Pilih' : 'Ganti'}</DefaultButton>
                    {!(item === null) &&
                        <div className="flex rounded shadow outline-dashed outline-orange-300 p-4">
                            <img src={item.gambar[0].url} alt="#" className=" aspect-square h-20 w-20"/>
                            <span className="pl-2">{item.nama_item}</span>
                        </div>
                    }
                </WhiteCard>
                <WhiteCard sectionTitle={"Atur jadwal lelang"}>
                    <p>aaa</p>
                </WhiteCard>
            </div>
            <div className=" md:w-2/3">
                <WhiteCard>
                    <div className='flex flex-col'>
                        <label className='justify-self-start w-fit'>Harga awal<span className='text-red-500 pl-1'>*</span></label>
                        {/* <input type="text" placeholder="Harga awal (rupiah)" className="border-0 border-b border-orange-500 px-0 py-1 focus:outline-none" onChange={(e) => setLelangDetail({...lelangDetail, harga_awal: e.target.value})} value={lelangDetail.harga_awal}></input> */}
                        <CurrencyInput 
                            id="example"
                            name="example"
                            placeholder="Harga awal (rupiah)"
                            onValueChange={(value) => setLelangDetail({...lelangDetail, harga_awal: value})}
                            value={lelangDetail.harga_awal}
                            prefix="Rp "
                            groupSeparator="."
                            decimalSeparator=","
                            className="border-0 border-b border-orange-300 px-0 py-1 focus:outline-none focus:border-orange-500"
                        />
                    </div>
                    <div className='flex flex-col'>
                        <div className='form-check form-switch' style={{paddingLeft:"0px"}}>
                            <label className='justify-self-start w-fit'>Otomatis terjual pada harga</label>
                            <input type='checkbox' role='switch' className="form-check-input px-0 py-1 appearance-none w-9 -ml-10 rounded-full float-right h-5 align-top bg-no-repeat bg-contain bg-gray-300 focus:outline-none cursor-pointer shadow-sm" onClick={(e) => setAutoSell(e.target.checked)}></input>
                        </div>
                        <input placeholder="Auto sell (rupiah)" className={`border-0 border-b px-0 py-1 focus:outline-none ` + (autoSell ? `border-orange-500` : `border-slate-300`)} onChange={(e) => setLelangDetail({...lelangDetail, auto_sell_at: e.target.value})} value={lelangDetail.auto_sell_at} disabled={(autoSell ? false : true)}></input>
                    </div>
                    <div className='flex flex-col'>
                        <label className='justify-self-start w-fit'>Kelipatan kenaikan tawaran / BID<span className='text-red-500 pl-1'>*</span></label>
                        {/* <input placeholder="Increment BID" className="border-0 border-b border-orange-500 px-0 py-1 focus:outline-none" onChange={(e) => setMerek(e.target.value)} value={merek}></input> */}
                        <Select options={bidIncrement} className='basic-single' classNamePrefix="select" name="bidIncrement" defaultValue={lelangDetail.bid_increase ? bidIncrement.find(x => x.value === lelangDetail.bid_increase) : bidIncrement[0]} onChange={setBidIncrement}/>
                    </div>
                    <div className='flex flex-col'>
                        <label className='justify-self-start w-fit'>Waktu mulai<span className='text-red-500 pl-1'>*</span></label>
                        <span>Tanggal : {moment(lelangDetail.tanggal_mulai).format('dddd, DD-MMMM-yyyy')} {lelangDetail.tanggal_akhir}</span>
                        <Calendar
                        locale={id}
                        date={lelangDetail.tanggal_mulai}
                        minDate={nowDate}
                        maxDate={maxDate()}
                        onChange={(e) => setLelangDetail({...lelangDetail, tanggal_mulai: e})}
                        />
                        {/* <InputBorderBottom type="date" className="border-0 border-b border-orange-500 px-0 py-1 focus:outline-none" onChange={(e) => setLelangDetail({...lelangDetail, tanggal_mulai: moment(e.target.value).format()})} value={moment(lelangDetail.tanggal_mulai).format('yyyy-MM-DD')}></InputBorderBottom>
                        <InputBorderBottom type="text" className="border-0 border-b border-orange-500 px-0 py-1 focus:outline-none" onClick={() => startDateRef.current.onClick}></InputBorderBottom> */}
                        {/* <button onClick={(e) => (modalShow ? closeModal(e) : openModal(e))} className="p-2 bg-green-300 rounded hover:scale-110 transition">Atur</button> */}
                    </div>
                    <div className='flex flex-col'>
                        <label className='justify-self-start w-fit'>Waktu berakhir<span className='text-red-500 pl-1'>*</span></label>
                        {/* <button onClick={(e) => (modalShow ? closeModal(e) : openModal(e))} className="p-2 bg-green-300 rounded hover:scale-110 transition">Atur</button> */}
                    </div>
                    <DefaultButton type="submit" name="Simpan"/>
                </WhiteCard>
            </div>
        </form>
    )
}

export default LelangForm