import React, { useEffect, useState } from "react";
import Layout from '../components/Layout';
import TransactionTable from "../components/TransactionTable";
import Styles from '../styles/screens/transactions.module.css';

import { apiHost } from '../api';


function Transactions({ history }) {

    const [storeTransactions, setStoreTransactions] = useState([]);
    const [tableHeader, setTableHeader] = useState([]);
    const [category, setCategory] = useState('store-to-store');

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

            const url = (category === 'store-to-store' ?
                `${apiHost}/api/inventory_system/my-store/transactions`
                : `${apiHost}/api/inventory_system/purchase/transactions`);

            console.log(url)
            fetch(url, options)
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
                    console.log(jsonData)
                    if (jsonData.data) {
                        setTableHeader(jsonData.tableHeader);
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

    }, [history, category]);

    const switchCategory = (categ) => {
        if (localStorage.getItem('role') === 'admin') {
            setCategory(categ);
        }
    }
    return (
        <Layout>
            <div>
                <div className={Styles.actionsContainer}>
                    {
                        localStorage.getItem('role') === 'admin' ? (
                            <select onChange={(e) => switchCategory(e.target.value)}>
                                <option value={'store-to-store'}>
                                    Store - Store Transactions
                                </option>
                                <option value={'purchase'}>
                                    Purchase Transactions
                                </option>
                            </select>
                        ) : (
                            <></>
                        )
                    }
                    <input type='datetime-local' />
                    <input type='datetime-local' />
                    <button>
                        Generate Report
                    </button>
                </div>
                <TransactionTable header={tableHeader} category={category} data={storeTransactions} />
            </div>
        </Layout>
    )
}

export default Transactions;
