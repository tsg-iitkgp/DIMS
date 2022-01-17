import React from 'react';
import Styles from '../styles/components/transaction-table.module.css';

function TransactionTable({ header, data, category }) {

    const dateOptions = { hour: 'numeric', minute: 'numeric', year: 'numeric', month: 'long', day: 'numeric' };

    return (
        <table className={Styles.table}>
            <thead>
                <tr>
                    {
                        header.map((item, index) => (
                            <th key={index}>
                                {item}
                            </th>
                        ))
                    }
                </tr>
            </thead>
            <tbody>
                {
                    category === 'store-to-store' ? (
                        data.sort((a, b) => (b.id - a.id)).map((item, index) => (
                            <tr key={index}>
                                <td>
                                    {item.id}
                                </td>
                                <td>
                                    {item.item && item.item.name}
                                </td>
                                <td>
                                    {item.quantity}
                                </td>
                                <td>
                                    {item.from && item.from.name}
                                </td>
                                <td>
                                    {item.to && item.to.name}
                                </td>
                                <td>
                                    {item.approved ? "Approved" : "Denied"}
                                </td>
                                <td>
                                    {item.requestedBy && item.requestedBy.username}
                                </td>
                                <td>
                                    {item.closedBy && item.closedBy.username}
                                </td>
                                <td>
                                    {
                                        (new Date(item.updatedAt)).toLocaleDateString('en-IN', dateOptions)
                                    }
                                </td>
                            </tr>
                        ))
                    ) : (
                        data.sort((a, b) => (b.id - a.id)).map((item, index) => (
                            <tr key={index}>
                                <td>
                                    {item.id}
                                </td>
                                <td>
                                    {item.item && item.item.name}
                                </td>
                                <td>
                                    {item.quantity}
                                </td>
                                <td>
                                    {item.to && item.to.name}
                                </td>
                                <td>
                                    {item.price}
                                </td>
                                <td>
                                    {item.raisedBy && item.raisedBy.username}
                                </td>
                                <td>
                                    {
                                        (new Date(item.createdAt)).toLocaleDateString('en-IN', dateOptions)
                                    }
                                </td>
                            </tr>
                        ))
                    )
                }
            </tbody>
        </table>
    )
}

export default TransactionTable;
