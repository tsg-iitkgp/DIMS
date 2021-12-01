import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import Table from "../components/Table";
import logout from "../utils/logout";

export default function Dashboard({ history }) {
    const [storeBalance, setStoreBalance] = useState([]);

    useEffect(() => {
        if (!localStorage.getItem('authToken')) {
            history.push('/login');
        }

        const fetchStoreBalance = async () => {
            const options = {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                },
            }
            fetch('http://localhost:5050/api/inventory_system/my-store/balance', options)
                .then((response) => (response.json()))
                .then((jsonData) => {
                    const data = []
                    for(let item of jsonData.data) {
                        data.push({
                            name: item.name,
                            quantity: item.StoreItem.quantity
                        })
                    }
                    console.log(data)
                    setStoreBalance(data);
                })
                .catch((error) => {
                    console.log(error);
                    localStorage.removeItem('authToken');
                    history.push('/login');
                    // setError('You are not authorized. Please Login');
                });
        }

        fetchStoreBalance();

    }, [history]);

    return (
        <Layout>
            <div>
                <h1>
                    Dashboard
                </h1>
                <p>
                </p>
                <Table data={storeBalance} />
            </div>
        </Layout>
    );
}