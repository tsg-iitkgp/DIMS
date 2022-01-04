import React, { useEffect, useState } from "react";
import { FaCubes, FaStore, FaUserAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import ItemMaster from "../components/ItemMaster";
import Layout from "../components/Layout";
import StoreMaster from "../components/StoreMaster";
import UserMaster from "../components/UserMaster";
import Styles from '../styles/screens/master-data.module.css'

export default function MasterData({ history }) {
    const [category, setCategory] = useState('stores');

    useEffect(() => {
        if (!localStorage.getItem('authToken')) {
            history.push('/login');
        }
    }, [history]);

    const navigateTo = (category) => {
        setCategory(category);
    }

    return (
        <Layout>
            <div className={Styles.sectionContainer}>
                <h1 className={Styles.heading}>
                    Master Data Management
                </h1>
                <div className={Styles.gridContainer}>
                    <div onClick={() => (navigateTo('stores'))} className={`${Styles.gridItem} ${category === 'stores' ? Styles.active : ''}`}>
                        <FaStore className={Styles.gridItemIcon} />
                        Stores
                    </div>
                    <div onClick={() => (navigateTo('items'))} className={`${Styles.gridItem} ${category === 'items' ? Styles.active : ''}`}>
                        <FaCubes className={Styles.gridItemIcon} />
                        Items
                    </div>
                    <div onClick={() => (navigateTo('users'))} className={`${Styles.gridItem} ${category === 'users' ? Styles.active : ''}`}>
                        <FaUserAlt className={Styles.gridItemIcon} />
                        Users
                    </div>
                </div>
                <div className={Styles.body}>
                    {
                        category === 'stores' ? (
                            <StoreMaster />
                        ) : (
                            category === 'items' ? (
                                <ItemMaster />
                            ) : (
                                <UserMaster />
                            )
                        )
                    }
                </div>
            </div>
        </Layout>
    );
}