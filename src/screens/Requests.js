import React, { useEffect, useState } from "react";
import Layout from '../components/Layout';

function Requests({ history }) {

    const [requests, setRequests] = useState([]);
    const [requestsCategory, setRequestsCategory] = useState('received');

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
                        setRequests(jsonData.data);
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



    return (
        <Layout>

        </Layout>
    )
}

export default Requests;
