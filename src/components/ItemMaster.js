import React, { useEffect, useState } from "react";
import Styles from '../styles/components/item-master.module.css';
import { apiHost } from '../api';

function ItemMaster({ history }) {

    const [data, setData] = useState();

    useEffect(() => {

        const fetchItemData = async () => {
            const options = {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                },
            }
            fetch(`${apiHost}/api/inventory_system/items`, options)
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
            Items
        </div>
    )
}

export default ItemMaster;
