import React from 'react';
import Styles from '../styles/components/request.module.css';

function ReceivedRequest({ data }) {

    const options = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem('authToken')}`
        },
    }

    const approveRequest = (id) => {
        fetch(`http://localhost:5050/api/inventory_system/requests/approve?reqId=${id}`, options)
            .then((response) => (response.json()))
            .then((data)=>(console.log(data)))
    }
    const denyRequest = (id) => {
        fetch(`http://localhost:5050/api/inventory_system/requests/deny?reqId=${id}`, options)
            .then((response) => (response.json()))
            .then((data)=>(console.log(data)))
    }

    return (
        <div className={Styles.receivedRequest}>
            <table>
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
