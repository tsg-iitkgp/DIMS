import React, { useEffect, useState } from "react";
import Layout from '../components/Layout';
import TransactionTable from "../components/TransactionTable";

function Transactions({ history }) {

    const [storeTransactions, setStoreTransactions] = useState([]);

    useEffect(() => {
        if (!localStorage.getItem('authToken')) {
            history.push('/login');
        }

        const fetchStoreTransactions = async () => {
            const options = {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                },
            }
            fetch('http://localhost:5050/api/inventory_system/my-store/transactions', options)
                .then((response) => (response.json()))
                .then((jsonData) => {
                    /*
                    const data = []
                    for(let item of jsonData.data) {
                        data.push({
                            name: item.name,
                            quantity: item.StoreItem.quantity
                        })
                    }
                    console.log(data)
                    */
                    if (jsonData.data) {
                        setStoreTransactions(jsonData.data);
                    }
                })
                .catch((error) => {
                    console.log(error);
                    localStorage.removeItem('authToken');
                    history.push('/login');
                    // setError('You are not authorized. Please Login');
                });
        }

        fetchStoreTransactions();

    }, [history]);
    return (
        <Layout>
            <div>
                <TransactionTable data={storeTransactions} />
            </div>
        </Layout>
    )
}

export default Transactions;
