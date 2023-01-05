import { useEffect, useRef, useState } from 'react';
import { AddBox, DeleteOutline } from '@mui/icons-material'
import { confirm } from 'react-confirm-box'
import Select from 'react-select'
import axios from 'axios'
import { WhiteCard } from '../components/card/white-card.js'
import { InputBorderBottom } from '../components/input/input-border-bottom.js';
import { TextareaBorderBottom } from '../components/input/textarea-border-bottom.js';
import DefaultButton from '../components/button/defaultButton.js';
import { useSearchParams, useNavigate } from 'react-router-dom';

const imageTypeRegex = /image\/(png|jpg|jpeg)/i;

const ItemEdit = () => {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const [imageFiles, setImageFiles] = useState([]);
    const [imageFileSend, setImageFileSend] = useState([]);
    const [images, setImages] = useState([]);
    const [nama_item, setNamaItem] = useState('');
    const [deskripsi_item, setDeskripsiItem] = useState('');
    const [jumlah_item, setJumlahItem] = useState('');
    const [item_berbahaya, setItemBerbahaya] = useState(false);
    const [merek, setMerek] = useState('');
    const [panjang_cm, setPanjang] = useState('');
    const [lebar_cm, setLebar] = useState('');
    const [tinggi_cm, setTinggi] = useState('');
    const [berat, setBerat] = useState('');
    const [dbKategori, setDbKategori] = useState('');
    const inputFile = useRef()
    const [ inputKategori, setInputKategori] = useState([])
    const [ inputKurir, setInputKurir] = useState([])
    const formData = new FormData()

    const addItem = async () => {
        // imageFileSend.forEach(img => {
        //     formData.append('image', img)
        // });
        // await axios.post('http://localhost:6001/item/image', formData)
        // .then( async (response) => {
        //     console.log(response.data.urls);
        //     const imageUrl = await response.data.urls
            await axios.post('http://localhost:6001/item/update', {
                withCredentials: true,
                id_item: searchParams.get("itemId"),
                nama_item,
                deskripsi_item,
                jumlah_item,
                kategori: inputKategori,
                kurir: inputKurir,
                item_berbahaya,
                merek,
                panjang_cm,
                lebar_cm,
                tinggi_cm,
                berat,
                // gambar: imageUrl
            }).then((response) => {
                console.log(response.data.message)
                alert(response.data.message)
                navigate('/itemShow')
            }).catch(err => console.log(err.response.data.message))
        // }).catch(err => console.log(err.response.data.message))
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

    const kurirOpsi = [
        {
            value: '62a8495b86f6dff262959341',
            label: 'Jam'
        },
        {
            value: '62a84b3486f6dff262959343',
            label: 'Strawbery'
        },
        {
            value: '62a84b5686f6dff262959344',
            label: 'Strawbery'
        }
    ]

    const inputKategoriChange = (value) => {
        const kategoriOke = []
        console.log(value)
        for (let index = 0; index < value.length; index++) {
            kategoriOke.push({id: value[index].value})
        }
        setInputKategori(kategoriOke)
    }

    const inputKurirChange = async (value) => {
        const kurirOke = []
        for (let index = 0; index < value.length; index++) {
            kurirOke.push({id: value[index].value})
        }
        setInputKurir(kurirOke)
    }

    const submitAddData = (event) => {
        event.preventDefault()
        addItem()
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
        const {files} = e.target;
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
        console.log(katopsis)
        setDbKategori(katopsis)
    }

    const setItem = (item) => {
        setNamaItem(item.nama_item)
        setDeskripsiItem(item.deskripsi_item)
        setInputKategori(item.kategori)
        const asd = "ok"
        // const asd = inputKategori.map((kat) => {
        //     const idkat = dbKategori.indexOf({value: kat.id})
        //     return(idkat)
        // })
        console.log(asd)
        setMerek(item.merek)
    }

    const getItem = async () => {
        await axios.get(`http://localhost:6001/item/getItem?${searchParams}`)
        .then((response) => {
            setItem(response.data.item)
        })
        .catch((err) => console.log(err))
    }

    useEffect(() => {
        getKategori()
        getItem()
    }, [])
    return(
        <>
            <form className="flex flex-col" onSubmit={submitAddData}>
                <WhiteCard sectionTitle={"Informasi Item"}>
                    <div className="flex flex-col justify-items-start">
                        <div className='relative'>
                            <label className='w-fit text-start'>Pilih Gambar<span className='text-red-500 pl-1'>*</span> ({images.length}/8)</label>
                            {images.length > 0 ? <span className='absolute right-1 left-auto justify-self-end text-red-300 ml-2 cursor-pointer hover:text-red-500' onClick={() => confirmDeleteAll(deleteAllConfirmation)}> Hapus semua gambar</span> : null }
                        </div>
                        <div className='gap-4 flex flex-wrap p-2 bg-orange-100'>
                            {images.length > 0 ?
                                    images.map((image, idx) => {
                                        return(
                                            <div key={idx} className="relative">
                                                <DeleteOutline className="absolute left-auto bottom-0 top-auto right-0 bg-red-600 text-white rounded-full hover:cursor-pointer hover:scale-110 transition-all" onClick={() => onClick(deleteConfirmation, idx)}/>
                                                <img src={image} alt="" className='aspect-square h-20 w-20 '/>
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
                        <label className='justify-self-start w-fit'>Nama item<span className='text-red-500 pl-1'>*</span> ({nama_item.length}/255)</label>
                        <InputBorderBottom placeholder="Gunakan nama yang sesuai dengan item agar mudah dilihat" onChange={(e) => setNamaItem(e.target.value)} value={nama_item}></InputBorderBottom>
                    </div>
                    <div className='flex flex-col'>
                        <label className='justify-self-start w-fit'>Deskripsi<span className='text-red-500 pl-1'>*</span> ({deskripsi_item.length}/3000)</label>
                        <TextareaBorderBottom placeholder="Deskripsikan item dengan detail agar mudah dimengerti" onChange={(e) => setDeskripsiItem(e.target.value)} value={deskripsi_item}></TextareaBorderBottom>
                    </div>
                    <div className='flex flex-col'>
                        <label className='justify-self-start w-fit'>Kategori<span className='text-red-500 pl-1'>*</span> ({inputKategori.length}/5)</label>
                        <Select placeholder="Anda dapat memilih hingga 5 kategori yang sesuai..." options={(inputKategori.length >=5 ? [] : dbKategori)} className='basic-multi-select' classNamePrefix="select" isMulti name="Kategori" onChange={inputKategoriChange} defaultValue={inputKategori}/>
                    </div>
                </WhiteCard>
                <WhiteCard sectionTitle={"Spesifikasi Item"}>
                    <div className='flex flex-col'>
                        <label className='justify-self-start w-fit'>Merek<span className='text-red-500 pl-1'>*</span></label>
                        <InputBorderBottom placeholder="Merek" onChange={(e) => setMerek(e.target.value)} value={merek}></InputBorderBottom>
                    </div>
                    <div className='flex flex-col'>
                        <label className='justify-self-start w-fit'>Barang berbahaya<span className='text-red-500 pl-1'>*</span></label>
                        <div className='form-check form-switch' style={{paddingLeft:"0px"}}>
                            <label className={'text-sm ' + (item_berbahaya ? '' : 'text-slate-500' )}>mengandung magnet / cairan / bahan mudah terbakar</label>
                            <input type='checkbox' role='switch' className="form-check-input px-0 py-1 appearance-none w-9 -ml-10 rounded-full float-right h-5 align-top bg-no-repeat bg-contain bg-gray-300 focus:outline-none cursor-pointer shadow-sm" onClick={(e) => itemBerbahayaSet(e)}></input>
                        </div>
                    </div>
                    <div className='flex flex-col'>
                        <label className='justify-self-start w-fit'>Kuantitas / Stok<span className='text-red-500 pl-1'>*</span></label>
                        <InputBorderBottom placeholder="Kuantitas dari item yang anda lelang" onChange={(e) => setJumlahItem(e.target.value)} value={jumlah_item}></InputBorderBottom>
                    </div>
                    <div className='flex flex-col'>
                        <label className='justify-self-start w-fit'>Dimensi Item<span className='text-red-500 pl-1'>*</span></label>
                        <div className="flex flex-wrap gap-x-4">
                            <InputBorderBottom placeholder="Panjang (cm)" onChange={(e) => setPanjang(e.target.value)} value={panjang_cm}></InputBorderBottom>
                            <InputBorderBottom placeholder="Lebar (cm)" onChange={(e) => setLebar(e.target.value)} value={lebar_cm}></InputBorderBottom>
                            <InputBorderBottom placeholder="Tinggi (cm)" onChange={(e) => setTinggi(e.target.value)} value={tinggi_cm}></InputBorderBottom>
                        </div>
                    </div>
                    <div className='flex flex-col'>
                        <label className='justify-self-start w-fit'>Berat<span className='text-red-500 pl-1'>*</span></label>
                        <InputBorderBottom placeholder="Berat (gram)" onChange={(e) => setBerat(e.target.value)} value={berat}></InputBorderBottom>
                    </div>
                </WhiteCard>
                <WhiteCard sectionTitle={"Pengiriman"}>
                    <div className='flex flex-col'>
                        <label className='relative justify-self-start w-fit'>Ukuran Paket<span className='text-red-500 pl-1'>*</span></label>
                        <div className="flex gap-x-4 flex-wrap">
                            <InputBorderBottom placeholder="Panjang (cm)" onChange={(e) => setPanjang(e.target.value)} value={panjang_cm}></InputBorderBottom>
                            <InputBorderBottom placeholder="Lebar (cm)" onChange={(e) => setLebar(e.target.value)} value={lebar_cm}></InputBorderBottom>
                            <InputBorderBottom placeholder="Tinggi (cm)" onChange={(e) => setTinggi(e.target.value)} value={tinggi_cm}></InputBorderBottom>
                        </div>
                    </div>
                    <div className='flex flex-col'>
                        <label className='justify-self-start w-fit'>Berat<span className='text-red-500 pl-1'>*</span></label>
                        <InputBorderBottom placeholder="Berat (gram)" onChange={(e) => setBerat(e.target.value)} value={berat}></InputBorderBottom>
                    </div>
                    <div className='flex flex-col'>
                        <label className='justify-self-start w-fit'>Kurir<span className='text-red-500 pl-1'>*</span></label>
                        <Select options={kurirOpsi} className='basic-multi-select' classNamePrefix="select" isMulti name="Kurir" onChange={inputKurirChange}/>
                    </div>
                </WhiteCard>
                <WhiteCard>
                    <DefaultButton type="submit" onClick={() => navigate('/itemShow')} >Batal</DefaultButton>
                    <DefaultButton type="submit">Simpan</DefaultButton>
                </WhiteCard>
            </form>
        </>
    )
}

export default ItemEdit