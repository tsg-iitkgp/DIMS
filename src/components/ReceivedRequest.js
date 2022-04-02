import React from 'react';
import Styles from '../styles/components/request.module.css';
import {apiHost} from '../api';

function ReceivedRequest({ data, setRequests }) {

    const options = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem('authToken')}`
        },
    }

    const approveRequest = (id) => {
        fetch(`${apiHost}/api/inventory_system/requests/approve?reqId=${id}`, options)
            .then((response) => (response.json()))
            .then((data) => (console.log(data)));
        removeRequest();
    }
    const denyRequest = (id) => {
        fetch(`${apiHost}/api/inventory_system/requests/deny?reqId=${id}`, options)
            .then((response) => (response.json()))
            .then((data) => (console.log(data)));
        removeRequest();
    }
    const removeRequest = () => {
        setRequests((requests) => (requests.filter((request) => (request.id !== data.id))));
    }

    return (
        <div className={Styles.receivedRequest}>
            <table>
                <thead>
                    <tr>
                        <th>
                            Id
                        </th>
                        <th>
                            Qty
                        </th>
                        <th>
                            Item
                        </th>
                        <th>
                            To
                        </th>
                        <th>
                            By
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            {data.id}
                        </td>
                        <td>
                            {data.quantity}
                        </td>
                        <td>
                            {data.item.name}
                        </td>
                        <td>
                            {data.to.name}
                        </td>
                        <td>
                            {data.requestedBy.username}
                        </td>
                    </tr>
                </tbody>
            </table>
            <div>
                <button className={Styles.approve} onClick={() => approveRequest(data.id)}>
                    Approve
                </button>
                <button className={Styles.deny} onClick={() => denyRequest(data.id)}>
                    Deny
                </button>
            </div>
        </div>
    )
}

export default ReceivedRequest;
