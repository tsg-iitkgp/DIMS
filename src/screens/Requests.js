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
                    console.log(jsonData.data);
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
        }

        fetchRequests(requestsCategory);

    }, [history, requestsCategory]);

    const switchCategory = (category) => {
        setRequestsCategory(category)
    }

    const openForm = () => {
        setIsFormOpen(true)
    }

    const closeForm = () => {
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
                                    requests.length ? (requests.map((request) => (
                                        <ReceivedRequest data={request} />
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
                                >
                                    <div className={Styles.createRequestModal}>
                                        <div className={Styles.formContainer}>

                                        </div>
                                        <form>
                                            <input type='text' />
                                        </form>
                                    </div>
                                </Modal>
                                {
                                    requests.length ? (
                                        <div>
                                            {
                                                requests.map((request) => (
                                                    <SentRequest data={request} />
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
