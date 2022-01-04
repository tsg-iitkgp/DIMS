import React, { useEffect, useState } from "react";
import Styles from '../styles/components/store-master.module.css';
import { apiHost } from '../api';

function StoreMaster({ history }) {

    const [data, setData] = useState([]);

    useEffect(() => {

        const fetchItemData = async () => {
            const options = {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                },
            }
            fetch(`${apiHost}/api/inventory_system/master/stores`, options)
                .then((response) => (response.json()))
                .then((jsonData) => {
                    setData(jsonData.data);
                })
                .catch((error) => {
                    console.log(error);
                    // setError('You are not authorized. Please Login');
                });
        }

        fetchItemData();

    }, []);



    return (
        <div className={Styles.mainContainer}>
            {/* <h2>
                Stores
            </h2> */}
            <div className={Styles.cardsContainer}>
                {
                    data.map((store, index) => (
                        <div key={index} className={Styles.card}>
                            <div className={Styles.storeId}>
                                {store.id}
                            </div>
                            <h1 className={Styles.storeName}>
                                {store.name}
                            </h1>
                            <h2 className={Styles.storeLocation}>
                                {store.location}
                            </h2>
                            <div className={Styles.footer}>
                                <button>
                                    Edit
                                </button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default StoreMaster;
