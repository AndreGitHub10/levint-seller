const routes = [
    {
        id: 0,
        nama: "Home",
        link: "home",
        subMenu: []
    },
    {
        id: 1,
        nama: "Lot / Item",
        link: "item",
        subMenu: [
            {
                id: "m1s1",
                nama: "Daftar Item",
                link: "list"
            },
            {
                id: "m1s2",
                nama: "Tambahkan Item",
                link: "tambah"
            }
        ]
    },
    {
        id: 2,
        nama: "chat",
        link: "chat",
        subMenu: []
    },
    {
        id: 3,
        nama: "Lelang",
        link: "lelang",
        subMenu: [
            {
                id: "m3s1",
                nama: "Sedang Berlangsung",
                link: "list"
            },
            {
                id: "m3s2",
                nama: "Buat Jadwal Lelang",
                link: "tambah"
            },
            {
                id: "m3s3",
                nama: "Riwayat Lelang",
                link: "riwayat"
            }
        ]
    },
    {
        id: 4,
        nama: "Transaksi",
        link: "transaksi",
        subMenu: []
    }
]

export default routes