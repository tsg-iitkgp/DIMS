import React from 'react';
import Styles from '../styles/components/request.module.css';

function SentRequest({ data, setRequests }) {

    const options = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem('authToken')}`
        },
    }

    const withdrawRequest = (id) => {
        fetch(`http://localhost:5050/api/inventory_system/requests/withdraw?reqId=${id}`, options)
            .then((response) => (response.json()))
            .then((data)=>(console.log(data)));
        removeRequest();
    }

    const removeRequest = () => {
        setRequests((requests) => (requests.filter((request) => (request.id !== data.id))));
    }

    return (
        <div className={Styles.sentRequest}>
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
                        From
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
                        {data.from.name}
                    </td>
                    <td>
                        {data.requestedBy.username}
                    </td>
                </tr>
            </table>
            <div>
                <button className={Styles.deny} onClick={() => withdrawRequest(data.id)}>
                    Withdraw
                </button>
            </div>
        </div>
    )
}

export default SentRequest;
