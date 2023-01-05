import { useEffect, useRef, useState } from 'react';
import { AddBox, DeleteOutline } from '@mui/icons-material'
import { confirm } from 'react-confirm-box'
import { useDispatch } from 'react-redux'
import { onLoad, onDone } from "../stateSlice/loadingSlice"
import CurrencyInput from 'react-currency-input-field'
import Select from 'react-select'
import axios from 'axios'
import { WhiteCard } from '../components/card/white-card.js'
import { InputBorderBottom } from '../components/input/input-border-bottom.js';
import { TextareaBorderBottom } from '../components/input/textarea-border-bottom.js';
import Swal from 'sweetalert2'
import DefaultButton from '../components/button/defaultButton.js';

const imageTypeRegex = /image\/(png|jpg|jpeg)/i;

const ItemAdd = () => {
    const dispatch = useDispatch()
    const [imageFiles, setImageFiles] = useState([]);
    const [imageFileSend, setImageFileSend] = useState([]);
    const [images, setImages] = useState([]);
    const [nama_item, setNamaItem] = useState('');
    const [deskripsi_item, setDeskripsiItem] = useState('');
    const [jumlah_item, setJumlahItem] = useState('');
    const [item_berbahaya, setItemBerbahaya] = useState(false);
    const [merek, setMerek] = useState('');
    const [tahun, setTahun] = useState('');
    const [panjang_cm, setPanjang] = useState('');
    const [lebar_cm, setLebar] = useState('');
    const [tinggi_cm, setTinggi] = useState('');
    const [berat, setBerat] = useState('');
    const [promo, setPromo] = useState(false)
    const [promoPrice, setPromoPrice] = useState('')
    const [dbKategori, setDbKategori] = useState('');
    const inputFile = useRef()
    const [inputKategori, setInputKategori] = useState([])
    const [ukuranPaket, setUkuranPaket] = useState({
        panjang_cm: '',
        lebar_cm: '',
        tinggi_cm: ''
    })
    const [beratPaket, setBeratPaket] = useState('')
    // const [volumatrik, setVolumatrik] = useState('')
    const [kurirOpsi, setKurirOpsi] = useState([])
    const [provinsi, setProvinsi] = useState({
        id: "",
        provinsi: ""
    })
    const [kabupaten, setKabupaten] = useState({
        id: "",
        kabupaten: ""
    })
    const [kecamatan, setKecamatan] = useState({
        id: "",
        kecamatan: ""
    })
    const [provinsiOpsi, setProvinsiOpsi] = useState([])
    const [kabupatenOpsi, setKabupatenOpsi] = useState([])
    const [kecamatanOpsi, setKecamatanOpsi] = useState([])
    const [kurirList, setKurirList] = useState([])
    const kurirOnChange = (e) => {
        if (e.target.checked) {
            setKurirList(list => [...list, e.target.value])
        } else {
            setKurirList(list => list.filter(v => v !== e.target.value))
        }
        console.log(kurirList)
    }
    const formData = new FormData()

    const addItem = async () => {
        if (kurirList.length < 1) {
            Swal.fire({
                title: 'Gagal untuk menyimpan item!',
                text: "Anda harus memilih minimal 1 kurir",
                icon: 'error',
                confirmButtonText: 'OK',
                confirmButtonColor: 'orange'
            })
        } else if (imageFileSend.length < 1) {
            Swal.fire({
                title: 'Gagal untuk menyimpan item!',
                text: "Anda harus menginputkan minimal 1 gambar",
                icon: 'error',
                confirmButtonText: 'OK',
                confirmButtonColor: 'orange'
            })
        } else if (inputKategori.length < 1) {
            Swal.fire({
                title: 'Gagal untuk menyimpan item!',
                text: "Anda harus menmilih minimal 1 kategori",
                icon: 'error',
                confirmButtonText: 'OK',
                confirmButtonColor: 'orange'
            })
        } else {
            dispatch(onLoad())
            imageFileSend.forEach(img => {
                formData.append('image', img)
            });
            await axios.post('http://localhost:6001/item/image', formData)
                .then(async (response) => {
                    console.log(response.data.urls);
                    const imageUrl = await response.data.urls
                    await axios.post('http://localhost:6001/item/create', {
                        withCredentials: true,
                        nama_item,
                        deskripsi_item,
                        jumlah_item,
                        kategori: inputKategori,
                        item_berbahaya,
                        merek,
                        panjang_cm,
                        lebar_cm,
                        tinggi_cm,
                        provinsi,
                        kabupaten,
                        kecamatan,
                        ukuranPaket,
                        beratPaket,
                        promo,
                        promoPrice,
                        kurirList,
                        berat,
                        tahun,
                        gambar: imageUrl
                    }).then((response) => {
                        dispatch(onDone())
                        Swal.fire({
                            title: 'Item berhasil disimpan!',
                            icon: 'success',
                            confirmButtonText: 'Oke',
                            confirmButtonColor: 'blue',
                        })
                        console.log(response.data.message)
                    }).catch((err) => {
                        dispatch(onDone())
                        Swal.fire({
                            title: 'Gagal untuk menyimpan item!',
                            text: err.response.data.message,
                            icon: 'error',
                            confirmButtonText: 'OK',
                            confirmButtonColor: 'orange'
                        })
                        console.log(err.response.data.message)
                    })
                }).catch((err) => {
                    dispatch(onDone())
                    Swal.fire({
                        title: 'Gagal untuk menyimpan gambar!',
                        icon: 'error',
                        confirmButtonText: 'OK',
                        confirmButtonColor: 'orange'
                    })
                    console.log(err.response.data.message)
                })
        }
    }

    // const kategoriOpsi = [
    //     {
    //         value: '62a8495b86f6dff262959341',
    //         label: 'Jam'
    //     },
    //     {
    //         value: '62a84b3486f6dff262959343',
    //         label: 'Strawbery'
    //     },
    //     {
    //         value: '62a84b5686f6dff262959344',
    //         label: 'Strawbery'
    //     }
    // ]

    // const kategoriOpsi = [
    //     {

    //     }
    // ]

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

    const inputKecamatanChange = (value) => {
        setKecamatan({
            id: value.value,
            kecamatan: value.label
        })
    }

    const inputKategoriChange = (value) => {
        const kategoriOke = []
        console.log(value)
        for (let index = 0; index < value.length; index++) {
            kategoriOke.push({ id: value[index].value })
        }
        setInputKategori(kategoriOke)
    }

    // const inputKurirChange = async (value) => {
    //     const kurirOke = []
    //     for (let index = 0; index < value.length; index++) {
    //         kurirOke.push({id: value[index].value})
    //     }
    //     setInputKurir(kurirOke)
    // }

    // useEffect(() => {
    //     const val = (ukuranPaket.panjang_cm * ukuranPaket.lebar_cm * ukuranPaket.tinggi_cm) / 6
    //     setVolumatrik(parseInt(val))
    // }, [ukuranPaket])

    // const submitAddData = (event) => {
    //     event.preventDefault()

    // }

    const submitAddData = (event) => {
        event.preventDefault()
        Swal.fire({
            title: 'Simpan data item?',
            showCancelButton: true,
            confirmButtonText: 'Save',
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                addItem()
            }
        })
    }

    const itemBerbahayaSet = (e) => {
        console.log(e.target.checked)
        setItemBerbahaya(e.target.checked)
    }

    const deleteConfirmation = {
        closeOnOverlayCick: true,
        labels: {
            confirmable: "Ya, hapus!",
            cancellable: "Batal"
        }
    }

    const deleteAllConfirmation = {
        closeOnOverlayCick: true,
        labels: {
            confirmable: "Ya, hapus Semua!",
            cancellable: "Batal"
        }
    }

    const onClick = async (options, i) => {
        const result = await confirm("Hapus gambar ini?", options);
        if (result) {
            deleteImage(i)
            return;
        }
        console.log("You click No!");
    }

    const confirmDeleteAll = async (options) => {
        const result = await confirm("Hapus SEMUA gambar?", options);
        if (result) {
            deleteAllImage()
            return;
        }
        console.log("You click No!");
    }

    const changeHandler = (e) => {
        const { files } = e.target;
        const validImageFiles = [];
        // for (let i = 0; i < files.length; i++) {
        const file = files[0];
        if (file.type.match(imageTypeRegex)) {
            validImageFiles.push(file);
        }
        // }
        if (validImageFiles.length) {
            setImageFiles(validImageFiles);
            // formData.append('image', e.target.files)
            formData.append('image', validImageFiles[0])
            console.log(formData.getAll('image'))
            imageFileSend.push(e.target.files[0])
            // setImageFileSend(validImageFiles);
            return;
        }
        alert("Selected images are not of valid type!");
    };

    const deleteImage = (i) => {
        setImages(current => {
            const image = current.filter((img, j) => i !== j)
            return image
        })
        setImageFileSend(current => {
            const imageFileSends = current.filter((file, j) => i !== j)
            return imageFileSends
        })
    }

    const deleteAllImage = () => {
        setImages([])
    }

    useEffect(() => {
        const images = [], fileReaders = [];
        let isCancel = false;
        if (imageFiles.length) {
            imageFiles.forEach((file) => {
                const fileReader = new FileReader();
                fileReaders.push(fileReader);
                fileReader.onload = (e) => {
                    const { result } = e.target;
                    if (result) {
                        images.push(result)
                    }
                    if (images.length === imageFiles.length && !isCancel) {
                        setImages(current => [...current, images]);
                    }
                }
                fileReader.readAsDataURL(file);
            })
        };
        return () => {
            isCancel = true;
            fileReaders.forEach(fileReader => {
                if (fileReader.readyState === 1) {
                    fileReader.abort()
                }
            })
        }
    }, [imageFiles]);

    const getKategori = async () => {
        const kats = await axios.get('http://localhost:6001/item/kategori')
        const katopsi = kats.data.dataKategori
        console.log(katopsi);
        const katopsis = katopsi.map((kat) => {
            return {
                value: kat._id,
                label: kat.nama
            }
        })
        setDbKategori(katopsis)
    }

    const getKurir = async () => {
        console.log('ini harusnya jalan')
        await axios.get('http://localhost:6001/item/kurir')
            .then((response) => {
                console.log(response.data)
                setKurirOpsi(response.data)
            })
    }

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

    const getKecamatan = async () => {
        await axios.post('http://localhost:6001/item/getKecamatan', {
            city: kabupaten.id
        })
            .then((response) => {
                // const body = JSON.parse(response.data.body)
                console.log(response.data)
                const kec = []
                response.data.links.map((kecamatan) => {
                    kec.push({
                        value: kecamatan.kode,
                        label: kecamatan.kecamatan
                    })
                })
                setKecamatanOpsi(kec)
            })
    }

    useEffect(() => {
        getKabupaten()
    }, [provinsi])

    useEffect(() => {
        getKecamatan()
    }, [kabupaten])

    useEffect(() => {
        getKategori()
        getKurir()
        getProvinsi()
        console.log('jalan loh')
    }, [])
    return (
        <>
            <form className="flex flex-col" onSubmit={submitAddData}>
                <WhiteCard sectionTitle={"Informasi Item"}>
                    <div className="flex flex-col justify-items-start">
                        <div className='relative'>
                            <label className='w-fit text-start'>Pilih Gambar<span className='text-red-500 pl-1'>*</span> ({images.length}/8)</label>
                            {images.length > 0 ? <span className='absolute right-1 left-auto justify-self-end text-red-300 ml-2 cursor-pointer hover:text-red-500' onClick={() => confirmDeleteAll(deleteAllConfirmation)}> Hapus semua gambar</span> : null}
                        </div>
                        <div className='gap-4 flex flex-wrap p-2 bg-orange-100'>
                            {images.length > 0 ?
                                images.map((image, idx) => {
                                    return (
                                        <div key={idx} className="relative">
                                            <DeleteOutline className="absolute left-auto bottom-0 top-auto right-0 bg-red-600 text-white rounded-full hover:cursor-pointer hover:scale-110 transition-all" onClick={() => onClick(deleteConfirmation, idx)} />
                                            <img src={image} alt="" className='aspect-square h-20 w-20 ' />
                                        </div>
                                    )
                                })
                                :
                                null
                            }
                            <input
                                ref={inputFile}
                                type="file"
                                id='file'
                                accept="image/png, image/jpg, image/jpeg"
                                className="aspect-square h-20 w-20 bg-orange-300 ml-4 hidden"
                                onChange={changeHandler}
                            ></input>
                            {!(images.length >= 8) ?
                                <div onClick={() => inputFile.current.click()} className="flex aspect-square h-20 w-20 bg-white justify-center items-center cursor-pointer">
                                    <AddBox className='text-orange-500' />
                                </div>
                                :
                                <></>
                            }

                        </div>
                    </div>
                    <div className='flex flex-col'>
                        <label className='justify-self-start w-fit'>Nama item<span className='text-red-500 pl-1'>*</span> ({nama_item.length}/70)</label>
                        <input className="border-0 border-b border-orange-300 px-0 pb-2 focus:outline-none focus:border-orange-500" placeholder="Gunakan nama yang sesuai dengan item agar mudah dilihat" onChange={(e) => setNamaItem(e.target.value)} value={nama_item} required={true} min={5} max={70}></input>
                    </div>
                    <div className='flex flex-col'>
                        <label className='justify-self-start w-fit'>Deskripsi<span className='text-red-500 pl-1'>*</span> ({deskripsi_item.length}/3000)</label>
                        <TextareaBorderBottom placeholder="Deskripsikan item dengan detail agar mudah dimengerti" onChange={(e) => setDeskripsiItem(e.target.value)} value={deskripsi_item} required={true}></TextareaBorderBottom>
                    </div>
                    <div className='flex flex-col'>
                        <label className='justify-self-start w-fit'>Kategori<span className='text-red-500 pl-1'>*</span> ({inputKategori.length}/5)</label>
                        <Select placeholder="Anda dapat memilih hingga 5 kategori yang sesuai..." options={(inputKategori.length >= 5 ? [] : dbKategori)} className='basic-multi-select' classNamePrefix="select" isMulti name="Kategori" onChange={inputKategoriChange} />
                    </div>
                </WhiteCard>
                <WhiteCard sectionTitle={"Spesifikasi Item"}>
                    <div className='flex flex-col'>
                        <label className='justify-self-start w-fit'>Merek<span className='text-red-500 pl-1'>*</span></label>
                        <InputBorderBottom placeholder="Merek" onChange={(e) => setMerek(e.target.value)} value={merek} required={true}></InputBorderBottom>
                    </div>
                    <div className='flex flex-col'>
                        <label className='justify-self-start w-fit'>Tahun rilis<span className='text-red-500 pl-1'>*</span></label>
                        <InputBorderBottom placeholder="Tahun" type={"number"} onChange={(e) => setTahun(e.target.value)} value={tahun} required={true}></InputBorderBottom>
                    </div>
                    <div className='flex flex-col'>
                        <label className='justify-self-start w-fit'>Barang berbahaya<span className='text-red-500 pl-1'>*</span></label>
                        <div className='form-check form-switch' style={{ paddingLeft: "0px" }}>
                            <label className={'text-sm ' + (item_berbahaya ? '' : 'text-slate-500')}>mengandung magnet / cairan / bahan mudah terbakar</label>
                            <input type='checkbox' role='switch' className="form-check-input px-0 py-1 appearance-none w-9 -ml-10 rounded-full float-right h-5 align-top bg-no-repeat bg-contain bg-gray-300 focus:outline-none cursor-pointer shadow-sm" onClick={(e) => itemBerbahayaSet(e)}></input>
                        </div>
                    </div>
                    <div className='flex flex-col'>
                        <label className='justify-self-start w-fit'>Kuantitas<span className='text-red-500 pl-1'>*</span></label>
                        <InputBorderBottom type="number" placeholder="Kuantitas dari item yang anda lelang" onChange={(e) => setJumlahItem(e.target.value)} value={jumlah_item} required={true}></InputBorderBottom>
                    </div>
                    <div className='flex flex-col'>
                        <label className='justify-self-start w-fit'>Dimensi Item<span className='text-red-500 pl-1'>*</span></label>
                        <div className="flex flex-wrap gap-x-4">
                            <InputBorderBottom placeholder="Panjang (cm)" onChange={(e) => setPanjang(e.target.value)} value={panjang_cm} required={true}></InputBorderBottom>
                            <InputBorderBottom placeholder="Lebar (cm)" onChange={(e) => setLebar(e.target.value)} value={lebar_cm} required={true}></InputBorderBottom>
                            <InputBorderBottom placeholder="Tinggi (cm)" onChange={(e) => setTinggi(e.target.value)} value={tinggi_cm} required={true}></InputBorderBottom>
                        </div>
                    </div>
                    <div className='flex flex-col'>
                        <label className='justify-self-start w-fit'>Berat<span className='text-red-500 pl-1'>*</span></label>
                        <InputBorderBottom placeholder="Berat (gram)" onChange={(e) => setBerat(e.target.value)} value={berat} required={true}></InputBorderBottom>
                    </div>
                </WhiteCard>
                <WhiteCard sectionTitle={"Pengiriman"}>
                    <div className='flex flex-col'>
                        <label className='relative justify-self-start w-fit'>Ukuran Paket<span className='text-red-500 pl-1'>*</span></label>
                        <div className="flex gap-x-4 flex-wrap">
                            <InputBorderBottom type="number" placeholder="Panjang (cm)" onChange={(e) => setUkuranPaket(u => ({ ...u, panjang_cm: e.target.value }))} value={ukuranPaket.panjang_cm} required={true}></InputBorderBottom>
                            <InputBorderBottom type="number" placeholder="Lebar (cm)" onChange={(e) => setUkuranPaket(u => ({ ...u, lebar_cm: e.target.value }))} value={ukuranPaket.lebar_cm} required={true}></InputBorderBottom>
                            <InputBorderBottom type="number" placeholder="Tinggi (cm)" onChange={(e) => setUkuranPaket(u => ({ ...u, tinggi_cm: e.target.value }))} value={ukuranPaket.tinggi_cm} required={true}></InputBorderBottom>
                            {/* <InputBorderBottom placeholder="Volumatrik (kg)" value={volumatrik} disabled={true}></InputBorderBottom> */}
                        </div>
                    </div>
                    <div className='flex flex-col'>
                        <label className='justify-self-start w-fit'>Berat Paket<span className='text-red-500 pl-1'>*</span></label>
                        <InputBorderBottom placeholder="Berat (gram)" onChange={(e) => setBeratPaket(e.target.value)} value={beratPaket} required={true}></InputBorderBottom>
                    </div>
                    <div className='flex flex-col'>
                        <label className='justify-self-start w-fit'>Alamat pengiriman<span className='text-red-500 pl-1'>*</span></label>
                        <div className='w-full flex flex-row gap-x-2 p-2 bg-orange-100 rounded'>
                            <div className='flex flex-col w-1/3'>
                                <span>Provinsi</span>
                                <Select placeholder="Provinsi" options={provinsiOpsi} className='basic-select' classNamePrefix="select" name="Provinsi" onChange={inputProvinsiChange} />
                            </div>
                            <div className='flex flex-col w-1/3'>
                                <span>Kabupaten / Kota</span>
                                <Select placeholder="Kabupaten" options={kabupatenOpsi} className='basic-select' classNamePrefix="select" name="Kabupaten" onChange={inputKabupatenChange} />
                            </div>
                            <div className='flex flex-col w-1/3'>
                                <span>Kecamatan</span>
                                <Select placeholder="Kecamatan" options={kecamatanOpsi} className='basic-select' classNamePrefix="select" name="Kecamatan" onChange={inputKecamatanChange} />
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col w-full lg:w-1/2'>
                        <table className='border-none border-0'>
                            <thead className='shrink-0'>
                                <tr>
                                    <th>Pilih</th>
                                    <th className='text-left'>Kurir</th>
                                </tr>
                            </thead>
                            <tbody className="shrink">
                                {kurirOpsi.map((kurir) => {
                                    return <tr key={kurir.code}>
                                        <td className='text-center'>
                                            <input type="checkbox" onChange={(e) => kurirOnChange(e)} value={kurir.code} />
                                        </td>
                                        <td>{kurir.description}</td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex flex-col">
                    <div className='flex flex-col'>
                        <div className='form-check form-switch' style={{paddingLeft:"0px"}}>
                            <label className='justify-self-start w-fit'>Promo</label>
                            <input type='checkbox' role='switch' className="form-check-input px-0 py-1 appearance-none w-9 -ml-10 rounded-full float-right h-5 align-top bg-no-repeat bg-contain bg-gray-300 focus:outline-none cursor-pointer shadow-sm" onChange={(e) => setPromo(e.target.checked)} checked={promo}></input>
                        </div>
                        <CurrencyInput 
                            placeholder="Potongan ongkir dalam rupiah" 
                            className={`border-0 border-b px-0 py-1 focus:outline-none ` + (promo ? `border-orange-500` : `border-slate-300`)} 
                            onValueChange={(value) => setPromoPrice(value)}
                            value={!promo ? '' : promoPrice} 
                            disabled={(promo ? false : true)}
                            prefix="Rp "
                            groupSeparator="."
                            decimalSeparator=","
                        />
                        </div>
                    </div>
                </WhiteCard>
                <WhiteCard>
                    <DefaultButton type="submit">Simpan</DefaultButton>
                </WhiteCard>
            </form>
        </>
    )
}

export default ItemAdd