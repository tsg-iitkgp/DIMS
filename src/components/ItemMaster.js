import React, { useEffect, useState } from "react";
import Styles from '../styles/components/item-master.module.css';
import FormStyles from '../styles/screens/requests.module.css'
import { apiHost } from '../api';
import Modal from 'react-modal';

function ItemMaster({ history }) {

    const [data, setData] = useState();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [formCategory, setFormCategory] = useState('purchase');
    const [centralStores, setCentralStores] = useState([]);
    const [items, setItems] = useState([]);

    useEffect(() => {

        const fetchItemData = async () => {
            const options = {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                },
            }
            fetch(`${apiHost}/api/inventory_system/items`, options)
                .then((response) => (response.json()))
                .then((jsonData) => {
                    setData(jsonData.data);
                })
                .catch((error) => {
                    console.log(error);
                    // setError('You are not authorized. Please Login');
                });

            fetch(`${apiHost}/api/inventory_system/central-stores`, options)
                .then((response) => (response.json()))
                .then((jsonData) => {
                    console.log(jsonData)
                    setCentralStores(jsonData.data);
                })
                .catch((error) => {
                    console.log(error);
                });

            fetch(`${apiHost}/api/inventory_system/all_items/`, options)
                .then((response) => (response.json()))
                .then((jsonData) => {
                    setItems(jsonData.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }

        fetchItemData();

    }, []);

    const openForm = (categ) => {
        setFormCategory(categ);
        setIsFormOpen(true);
    }

    const closeForm = () => {
        setIsFormOpen(false);
    }

    const raisePurchaseTransaction = (e) => {
        e.preventDefault();
        var formData = {};

        const rawFormData = new FormData(e.target)

        rawFormData.forEach(function (value, key) {
            formData[key] = value;
        });

        // formData['category'] = formCategory;

        console.log(formData);
        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('authToken')}`
            },
            body: JSON.stringify(formData)
        }
        fetch(`${apiHost}/api/inventory_system/off-store-transactions/raise`, options)
            .then((response) => (response.json()))
            .then((jsonData) => (console.log(jsonData)));
        closeForm();
    }

    return (
        <div className={Styles.mainContainer}>
            <div className={Styles.offStoreTransactionBtns}>
                <button onClick={() => openForm('purchase')} className={Styles.purchaseBtn}>
                    Purchase
                </button>
                <button onClick={() => openForm('lost')} className={Styles.lostBtn}>
                    Write Off / Lost
                </button>
            </div>
            <Modal
                isOpen={isFormOpen}
                onRequestClose={closeForm}
                style={{}}
                contentLabel={formCategory === 'purchase' ? 'Purchase' : 'Lost / Write Off'}
                ariaHideApp={false}
            >
                <div className={FormStyles.createRequestModal}>
                    <div className={FormStyles.formContainer}>
                        <h1 className={FormStyles.formHeading}>
                            {formCategory === 'purchase' ? 'Items Purchase' : 'Items Lost / Write Off'}
                        </h1>
                        <form className={FormStyles.createRequestForm} onSubmit={raisePurchaseTransaction}>
                            <div>
                                <div className={FormStyles.inputContainer}>
                                    <label>
                                        Store:
                                    </label>
                                    <select name="storeId">
                                        {
                                            centralStores && centralStores.map((store, index) => (
                                                <option key={index} value={store.id}>{store.name}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                {
                                    formCategory === 'purchase' ? (
                                        <div className={FormStyles.inputContainer}>
                                            <label>
                                                Price per each:
                                            </label>
                                            <input type='number' defaultValue={0} name='price' />
                                        </div>
                                    ) : (
                                        <></>
                                    )
                                }
                            </div>

                            <div>
                                <div className={FormStyles.inputContainer}>
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
                                <div className={FormStyles.inputContainer}>
                                    <label>
                                        Quantity:
                                    </label>
                                    <input type='number' defaultValue={0} name='quantity' />
                                </div>

                                <div className={FormStyles.inputContainer}>
                                    <label>
                                        Category:
                                    </label>
                                    {
                                        formCategory === 'purchase' ? (
                                            <select name="category">
                                                <option value='purchase'>
                                                    purchase
                                                </option>
                                            </select>
                                        ) : (
                                            <select name="category">
                                                <option value='lost'>
                                                    Lost
                                                </option>
                                                <option value='write off'>
                                                    Write Off
                                                </option>
                                            </select>
                                        )
                                    }
                                </div>
                            </div>
                            <div className={FormStyles.btnContainer}>
                                <button className={FormStyles.approve} type="submit">
                                    Submit
                                </button>
                                <button className={FormStyles.deny} onClick={closeForm}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default ItemMaster;
