import React, { useEffect, useState } from "react";
import { FaPlus } from 'react-icons/fa';
import Modal from 'react-modal';
import Layout from '../components/Layout';
import ReceivedRequest from "../components/ReceivedRequest";
import SentRequest from "../components/SentRequest";
import Styles from '../styles/screens/requests.module.css'

function Requests({ history }) {

    const [requests, setRequests] = useState([]);
    const [requestsCategory, setRequestsCategory] = useState('received');
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [centralStores, setCentralStores] = useState([]);
    const [items, setItems] = useState([]);

    useEffect(() => {
        if (!localStorage.getItem('authToken')) {
            history.push('/login');
        }
    }, [history]);

    useEffect(() => {
        const fetchRequests = async (category) => {
            const options = {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                },
            }
            fetch(`http://localhost:5050/api/inventory_system/requests/${category}`, options)
                .then((response) => (response.json()))
                .then((jsonData) => {
                    /*const data = []
                    for(let item of jsonData.data) {
                        data.push({
                            name: item.name,
                            quantity: item.StoreItem.quantity
                        })
                    }
                    console.log(data)*/
                    // console.log(jsonData.data);
                    if (jsonData.data) {
                        setRequests(jsonData.data.filter((item) => (item.isPending !== false)));
                    }
                })
                .catch((error) => {
                    console.log(error);
                    localStorage.removeItem('authToken');
                    history.push('/login');
                    // setError('You are not authorized. Please Login');
                });

            fetch(`http://localhost:5050/api/inventory_system/from-stores`, options)
                .then((response) => (response.json()))
                .then((jsonData) => {
                    console.log(jsonData)
                    setCentralStores(jsonData.data);
                })
                .catch((error) => {
                    console.log(error);
                });

            fetch(`http://localhost:5050/api/inventory_system/all_items/`, options)
                .then((response) => (response.json()))
                .then((jsonData) => {
                    setItems(jsonData.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }

        fetchRequests(requestsCategory);

    }, [history, requestsCategory]);

    const switchCategory = (category) => {
        setRequestsCategory(category)
    }

    const openForm = () => {
        setIsFormOpen(true)
    }

    const raiseRequest = (e) => {
        e.preventDefault();
        var formData = {};

        const rawFormData = new FormData(e.target)

        rawFormData.forEach(function (value, key) {
            formData[key] = value;
        });

        console.log(formData);
        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('authToken')}`
            },
            body: JSON.stringify(formData)
        }

        fetch('http://localhost:5050/api/inventory_system/requests/raise', options)
            .then((response) => (response.json()))
            .then((jsonData) => (console.log(jsonData)));
        closeForm();
    }

    const closeForm = (e) => {
        setIsFormOpen(false)
    }

    return (
        <Layout>
            <div className={Styles.requestsContainer}>
                <div className={Styles.header}>
                    <div onClick={() => switchCategory('received')} className={`${Styles.item} ${requestsCategory === 'received' ? Styles.active : ''}`}>
                        Received
                    </div>
                    <div onClick={() => switchCategory('requested')} className={`${Styles.item} ${requestsCategory === 'requested' ? Styles.active : ''}`}>
                        Requested
                    </div>
                </div>
                <div className={Styles.body}>
                    {
                        requestsCategory === 'received' ? (
                            <div>
                                {
                                    requests.length ? (requests.map((request, index) => (
                                        <ReceivedRequest setRequests={setRequests} key={index} data={request} />
                                    ))) : (
                                        <div className={Styles.noRequestsContainer}>
                                            No Pending Requests
                                        </div>
                                    )
                                }
                            </div>
                        ) : (
                            <div>
                                {/* Requested Case */}
                                <div className={Styles.createRequest}>
                                    <span onClick={openForm} className={Styles.plusIconContainer}>
                                        Raise
                                        <FaPlus className={Styles.plusIcon} />
                                    </span>
                                </div>
                                <Modal
                                    isOpen={isFormOpen}
                                    onRequestClose={closeForm}
                                    style={{}}
                                    contentLabel="Create a Request"
                                    ariaHideApp={false}
                                >
                                    <div className={Styles.createRequestModal}>
                                        <div className={Styles.formContainer}>
                                            <h1 className={Styles.formHeading}>
                                                Create a Request
                                            </h1>
                                            <form className={Styles.createRequestForm} onSubmit={raiseRequest}>
                                                <div>
                                                    <div className={Styles.inputContainer}>
                                                        <label>
                                                            From Store:
                                                        </label>
                                                        <select name="fromStoreId">
                                                            {
                                                                centralStores && centralStores.map((store, index) => (
                                                                    <option key={index} value={store.id}>{store.name}</option>
                                                                ))
                                                            }
                                                        </select>
                                                    </div>
                                                    {/* <div className={Styles.inputContainer}>
                                                        <label>
                                                            To Store:
                                                        </label>
                                                        <select name="toStoreId">
                                                            {
                                                                stores && stores.map((store, index) => (
                                                                    <option key={index} value={store.id}>{store.name}</option>
                                                                ))
                                                            }
                                                        </select>
                                                    </div> */}
                                                </div>

                                                <div>
                                                    <div className={Styles.inputContainer}>
                                                        <label>
                                                            Item:
                                                        </label>
                                                        <select name="itemId">
                                                            {
                                                                items && items.map((store, index) => (
                                                                    <option key={index} value={store.id}>{store.name}</option>
                                                                ))
                                                            }
                                                        </select>
                                                    </div>
                                                    <div className={Styles.inputContainer}>
                                                        <label>
                                                            Quantity:
                                                        </label>
                                                        <input type='number' defaultValue={0} name='quantity' />
                                                    </div>
                                                </div>
                                                <div className={Styles.btnContainer}>
                                                    <button className={Styles.approve} type="submit">
                                                        Submit
                                                    </button>
                                                    <button className={Styles.deny} onClick={closeForm}>
                                                        Cancel
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </Modal>
                                {
                                    requests.length ? (
                                        <div>
                                            {
                                                requests.map((request) => (
                                                    <SentRequest setRequests={setRequests} data={request} />
                                                ))
                                            }
                                        </div>
                                    ) : (
                                        <div className={Styles.noRequestsContainer}>
                                            No Pending Requests
                                        </div>
                                    )
                                }
                            </div>
                        )
                    }
                </div>
                <div className={Styles.footer}>

                </div>
            </div>
        </Layout>
    )
}

export default Requests;
