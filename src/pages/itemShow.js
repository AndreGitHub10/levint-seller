import Tab from "../components/tab"
import Tabs from "../components/Tabs"
import Table from "../components/table"
const tabList = [
    {
        id: 1,
        nama: "Semua item",
        target: "#semuaItem"
    },
    {
        id: 2,
        nama: "Dalam pelelangan",
        target: "#semuaItem"
    },
    {
        id: 3,
        nama: "Kosong / Terjual",
        target: "#belumTerjual"
    },
    {
        id: 4,
        nama: "Bermasalah",
        target: "#bermasalah"
    },
]

const ItemShow = () => {
    return(
        <section id="itemShow" className="relative bg-white py-4">
            <div className="relative list-none w-full">
            <Tabs>
                {tabList.map(tab => {
                    return(
                    <div label={tab.nama} key={tab.id}>
                        <Table />
                    </div>
                    )
                })}
{/*                 
                <div label="Croc">
                After 'while, <em>Crocodile</em>!
                </div>
                <div label="Sarcosuchus">
                Nothing to see here, this tab is <em>extinct</em>!
                </div> */}
            </Tabs>
                {/* {tabList.map(tab => {
                    return(
                        <Tab
                            id={tab.id}
                            key={tab.id}
                            nama={tab.nama}
                            target={tab.target}
                        />
                    )
                })} */}
            </div>
        </section>
    )
}

export default ItemShow