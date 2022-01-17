import React, { useEffect, useState } from "react";
import Styles from '../styles/components/user-master.module.css';
import { apiHost } from '../api';

function UserMaster({ history }) {

    const [data, setData] = useState();

    useEffect(() => {

        const fetchItemData = async () => {
            const options = {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                },
            }
            fetch(`${apiHost}/api/inventory_system/dashboard/users`, options)
                .then((response) => (response.json()))
                .then((jsonData) => {
                    console.log(jsonData.data);
                    setData(jsonData.data);
                })
                .catch((error) => {
                    console.log(error);
                    // setError('You are not authorized. Please Login');
                });
        }

        fetchItemData();

    }, [history]);



    return (
        <div className={Styles.mainContainer}>
            <div className={Styles.actionBtnContainer}>
                <button className={Styles.addBtn}>
                    Add User
                </button>
            </div>
            <div className={Styles.dataContainer}>
                {
                    data && data.map((user, index) => (
                        <div key={index} className={Styles.userCard}>
                            <div className={Styles.row}>
                                <div className={Styles.gridLabel}>
                                    Id
                                </div>
                                <div className={Styles.gridValue}>
                                    {user.id}
                                </div>
                            </div>
                            <div className={Styles.row}>
                                <div className={Styles.gridLabel}>
                                    Username
                                </div>
                                <div className={Styles.gridValue}>
                                    {user.username}
                                </div>
                            </div>
                            <div className={Styles.row}>
                                <div className={Styles.gridLabel}>
                                    Role
                                </div>
                                <div className={Styles.gridValue}>
                                    {user.role}
                                </div>
                            </div>
                            {
                                user.Store && (
                                    <>
                                        <div className={Styles.row}>
                                            <div className={Styles.gridLabel}>
                                                Store Name
                                            </div>
                                            <div className={Styles.gridValue}>
                                                {user.Store.name}
                                            </div>
                                        </div>
                                        <div className={Styles.row}>
                                            <div className={Styles.gridLabel}>
                                                Store Location
                                            </div>
                                            <div className={Styles.gridValue}>
                                                {user.Store.location}
                                            </div>
                                        </div>
                                        <div className={Styles.row}>
                                            <div className={Styles.gridLabel}>
                                                Store Type
                                            </div>
                                            <div className={Styles.gridValue}>
                                                {user.Store.location}
                                            </div>
                                        </div>
                                    </>
                                )
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default UserMaster;
