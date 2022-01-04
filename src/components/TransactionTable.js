import React from 'react';
import Styles from '../styles/components/transaction-table.module.css';

function TransactionTable({ data }) {

    const dateOptions = { hour: 'numeric', minute: 'numeric', year: 'numeric', month: 'long', day: 'numeric' };

    return (
        <table className={Styles.table}>
            <thead>
                <tr>
                    <th>
                        Id
                    </th>
                    <th>
                        Item
                    </th>
                    <th>
                        Quantity
                    </th>
                    <th>
                        From
                    </th>
                    <th>
                        To
                    </th>
                    <th>
                        Status
                    </th>
                    <th>
                        Requested By
                    </th>
                    <th>
                        Closed By
                    </th>
                    <th>
                        Time
                    </th>
                </tr>
            </thead>
            <tbody>
                {
                    data.sort((a, b) => (b.id - a.id)).map((item, index) => (
                        <tr key={index}>
                            <td>
                                {item.id}
                            </td>
                            <td>
                                {item.item.name}
                            </td>
                            <td>
                                {item.quantity}
                            </td>
                            <td>
                                {item.from.name}
                            </td>
                            <td>
                                {item.to.name}
                            </td>
                            <td>
                                {item.approved ? "Approved" : "Denied"}
                            </td>
                            <td>
                                {item.requestedBy.username}
                            </td>
                            <td>
                                {item.closedBy.username}
                            </td>
                            <td>
                                {
                                    (new Date(item.updatedAt)).toLocaleDateString('en-IN', dateOptions)
                                }
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}

export default TransactionTable;
