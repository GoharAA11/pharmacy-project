
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { medicineData, changeRating, setSearchTerm } from "./medicine.slice";
import axios from "axios";
import styles from './medicine.module.css';

export const Dashboard = () => {
    const dispatch = useDispatch();
    const medicine = useSelector((state) => state.medicine)
    const searchTerm = useSelector((state) => state.searchTerm)


    const getData = async () => {
        const res = await axios.get("http://localhost:3004/medicine")
        dispatch(medicineData(res.data))
    };

    const handleChange = async (id, newRating) => {

        dispatch(changeRating({ id, rating: newRating }))


        await axios.patch(`http://localhost:3004/medicine/${id}`, { rating: newRating })
    };

    const handleSearchChange = (e) => {
        dispatch(setSearchTerm(e.target.value))
    };


    useEffect(() => {
        getData()
    }, [dispatch])


    const filteredMedicine = medicine.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );



    return (
        <>
            <h1>Medicine List</h1>
            <div>
                <div className={styles.content}>
                    <input
                        className={styles.formControl}
                        placeholder="Search for medicine..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>
                {
                    filteredMedicine.map(item => (
                        <div className={styles.square} key={item.id}>
                            <img src={item.photo} className={styles.img} />
                            <div className={styles.text}>
                                <p className={styles.name}>{item.name}</p>
                                <strong className={styles.price}>{item.price} AMD</strong>
                                <div>
                                    {
                                        new Array(5)
                                            .fill(null)
                                            .map((_, i) =>
                                                <img key={i} onClick={() => handleChange(item.id, i + 1)}
                                                    src={i < item.rating
                                                        ? "https://cdn4.iconfinder.com/data/icons/small-n-flat/24/star-512.png"
                                                        : "https://cdn3.iconfinder.com/data/icons/teenyicons-outline-vol-3/15/star-small-64.png"}
                                                    width={20} height={20} />)
                                    }
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    );
}

