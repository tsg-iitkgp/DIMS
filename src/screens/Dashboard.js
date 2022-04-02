import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import ItemTable from "../components/ItemTable";
import logout from "../utils/logout";

import { apiHost } from '../api';

export default function Dashboard({ history }) {
    const [storeBalance, setStoreBalance] = useState([]);
    const [storeName, setStoreName] = useState('');

    useEffect(() => {
        if (!localStorage.getItem('authToken')) {
            history.push('/login');
        }

        const fetchStore = async () => {
            const options = {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                },
            }
            fetch(`${apiHost}/api/inventory_system/my-store`, options)
                .then((response) => (response.json()))
                .then((data)=>(setStoreName(data.storeName)))
        }

        const fetchStoreBalance = async () => {
            const options = {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                },
            }
            fetch(`${apiHost}/api/inventory_system/my-store/balance`, options)
                .then((response) => (response.json()))
                .then((jsonData) => {
                    const data = []
                    for(let item of jsonData.data) {
                        data.push({
                            name: item.name,
                            quantity: item.StoreItem.quantity,
                            total_quantity: item.total_quantity
                        })
                    }
                    console.log(jsonData)
                    setStoreBalance(data);
                })
                .catch((error) => {
                    console.log(error);
                    localStorage.removeItem('authToken');
                    localStorage.removeItem('role');
                    history.push('/login');
                    // setError('You are not authorized. Please Login');
                });
        }

        fetchStoreBalance();
        fetchStore();

    }, [history]);

    return (
        <Layout>
            <div>
                <h1>
                    Dashboard - {storeName}
                </h1>
                <p>
                </p>
                <ItemTable data={storeBalance} />
            </div>
            <div>
                
            </div>
        </Layout>
    );
}