import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { sellerReg, sellerOff } from '../stateSlice/sellerSlice'
import {WhiteCard} from '../components/card/white-card.js'
import { InputBorderBottom } from '../components/input/input-border-bottom'
import {TextareaBorderBottom} from '../components/input/textarea-border-bottom'
import DefaultButton from '../components/button/defaultButton'
import Select from 'react-select'
// import { onLoad } from '../stateSlice/loadingSlice'
// import { login, logout } from '../stateSlice/loginSlice'

const RegisterForm = () => {
    const [nama_toko, setNama_toko] = useState('')
    const [no_telp, setNo_telp] = useState('')
    const [provinsi, setProvinsi] = useState({
        id: "",
        provinsi: ""
    })
    const [kabupaten, setKabupaten] = useState({
        id: "",
        kabupaten: ""
    })
    // const [kecamatan, setKecamatan] = useState({
    //     id: "",
    //     kecamatan: ""
    // })
    const [alamat_lengkap, setAlamat_lengkap] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [provinsiOpsi, setProvinsiOpsi] = useState([])
    const [kabupatenOpsi, setKabupatenOpsi] = useState([])
    // const [kecamatanOpsi, setKecamatanOpsi] = useState([])
    
    const isLogin = useSelector((state) => state.login.isLogin)
    const createSeller = async () => {
        await axios.post('http://localhost:5001/seller/register', {
            withCredentials:true,
            nama_toko,
            no_telp,
            provinsi,
            kabupaten,
            // kecamatan,
            alamat_lengkap
        })
        .then((response) => {
            console.log(`seller : ${response.data.message}`)
            dispatch(sellerReg(response.data))
            navigate('/')
        })
        .catch(err => {
            console.log(`seller : ${err.response.data.message}`)
            dispatch(sellerOff())
        })
    }

    const inputProvinsiChange = (value) => {
        setProvinsi({
            id: value.value,
            provinsi: value.label
        })
    }

    const inputKabupatenChange = (value) => {
        setKabupaten({
            id: value.value,
            kabupaten: value.label
        })
    }

    // const inputKecamatanChange = (value) => {
    //     setKecamatan({
    //         id: value.value,
    //         kecamatan: value.label
    //     })
    // }

    useEffect(() => {
        if(isLogin !== true) {
            navigate('/login')
        }
    }, [])

    const getProvinsi = async () => {
        await axios.post('http://localhost:6001/item/getProvinsi')
            .then((response) => {
                const body = JSON.parse(response.data.body)
                console.log()
                const prov = []
                body.rajaongkir.results.map((provinsi) => {
                    prov.push({
                        value: provinsi.province_id,
                        label: provinsi.province
                    })
                })
                setProvinsiOpsi(prov)
            })
    }

    const getKabupaten = async () => {
        await axios.post('http://localhost:6001/item/getKabupaten', {
            province: provinsi.id
        })
            .then((response) => {
                const body = JSON.parse(response.data.body)
                console.log(body)
                const kab = []
                body.rajaongkir.results.map((kabupaten) => {
                    kab.push({
                        value: kabupaten.city_id,
                        label: kabupaten.city_name
                    })
                })
                setKabupatenOpsi(kab)
            })
    }

    // const getKecamatan = async () => {
    //     await axios.post('http://localhost:6001/item/getKecamatan', {
    //         city: kabupaten.id
    //     })
    //         .then((response) => {
    //             // const body = JSON.parse(response.data.body)
    //             console.log(response.data)
    //             const kec = []
    //             response.data.links.map((kecamatan) => {
    //                 kec.push({
    //                     value: kecamatan.kode,
    //                     label: kecamatan.kecamatan
    //                 })
    //             })
    //             setKecamatanOpsi(kec)
    //         })
    // }

    useEffect(() => {
        getKabupaten()
    }, [provinsi])

    // useEffect(() => {
    //     getKecamatan()
    // }, [kabupaten])

    useEffect(() => {
        getProvinsi()
        console.log('jalan loh')
    }, [])

    return(
        <>
            <form onSubmit={createSeller} className="my-10 mx-auto w-1/3">
                <WhiteCard sectionTitle={"Register Seller"}>
                <InputBorderBottom type="text" value={nama_toko} placeholder="Nama Toko" onChange={(e) => setNama_toko(e.target.value)}></InputBorderBottom>
                <InputBorderBottom type="text" value={no_telp} placeholder="Nomor Telepon" onChange={(e) => setNo_telp(e.target.value)}></InputBorderBottom>
                <span className='text-center'>Lokasi</span>
                <div className='flex flex-col'>
                    <span>Provinsi</span>
                    <Select placeholder="Provinsi" options={provinsiOpsi} className='basic-select' classNamePrefix="select" name="Provinsi" onChange={inputProvinsiChange} />
                </div>
                <div className='flex flex-col'>
                    <span>Kabupaten / Kota</span>
                    <Select placeholder="Kabupaten" options={kabupatenOpsi} className='basic-select' classNamePrefix="select" name="Kabupaten" onChange={inputKabupatenChange} />
                </div>
                {/* <div className='flex flex-col'>
                    <span>Kecamatan</span>
                    <Select placeholder="Kecamatan" options={kecamatanOpsi} className='basic-select' classNamePrefix="select" name="Kecamatan" onChange={inputKecamatanChange} />
                </div> */}
                {/* <InputBorderBottom type="text" value={provinsi} placeholder="Provinsi" onChange={(e) => setProvinsi(e.target.value)}></InputBorderBottom>
                <InputBorderBottom type="text" value={kabupaten} placeholder="Kabupaten" onChange={(e) => setKabupaten(e.target.value)}></InputBorderBottom>
                <InputBorderBottom type="text" value={kecamatan} placeholder="Kecamatan" onChange={(e) => setKecamatan(e.target.value)}></InputBorderBottom> */}
                <TextareaBorderBottom className="resize-none" type="text" value={alamat_lengkap} placeholder="Alamat Lengkap" onChange={(e) => setAlamat_lengkap(e.target.value)}></TextareaBorderBottom>
                <DefaultButton type='submit'>Daftar</DefaultButton>
                </WhiteCard>
            </form>
        </>
    )
}

export default RegisterForm