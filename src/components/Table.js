import React from 'react';
import Styles from '../styles/components/table.module.css';

function Table({ data }) {
    return (
        <div className={Styles.table}>
            <div className={`${Styles.tableCell} ${Styles.header}`}>
                <h3>
                    Item Name
                </h3>
                {/* <a href="" className="btn">register now</a> */}
            </div>
            <div className={`${Styles.tableCell} ${Styles.header}`}>
                <h3>
                    Available Quantity
                </h3>
                {/* <a href="" className="btn">register now</a> */}
            </div>
            <div className={`${Styles.tableCell} ${Styles.header}`}>
                <h3>
                    Total Quantity
                </h3>
                {/* <a href="" className="btn">Send us a Email</a> */}
            </div>

            {
                data.map((item, index) => (<React.Fragment key={index}>
                    <div className={`${Styles.tableCell} ${Styles.cellFeature}`}>
                        {item.name}
                    </div>
                    <div className={Styles.tableCell}>
                        <span>
                            {item.quantity}
                        </span>
                    </div>
                    <div className={Styles.tableCell}>
                        <span>
                            0
                        </span>
                    </div>
                </React.Fragment>))
            }
            <div className={`${Styles.tableCell} ${Styles.cellFeature}`}>
                Tennis Ball
            </div>
            <div className={Styles.tableCell}>
                <span>
                    0
                </span>
            </div>
            <div className={Styles.tableCell}>
                <span>
                    0
                </span>
            </div>
            <div className={`${Styles.tableCell} ${Styles.cellFeature}`}>
                Tennis Racket
            </div>
            <div className={Styles.tableCell}>
                <span>
                    0
                </span>
            </div>
            <div className={Styles.tableCell}>
                <span>
                    0
                </span>
            </div>
            <div className={`${Styles.tableCell} ${Styles.cellFeature}`}>
                Badminton Racket
            </div>
            <div className={Styles.tableCell}>
                <span>
                    1
                </span>
            </div>
            <div className={Styles.tableCell}>
                <span>
                    0
                </span>
            </div>
            <div className={`${Styles.tableCell} ${Styles.cellFeature}`}>
                Volleyball
            </div>
            <div className={Styles.tableCell}>
                <span>
                    1
                </span>
            </div>
            <div className={Styles.tableCell}>
                <span>
                    0
                </span>
            </div>
            <div className={`${Styles.tableCell} ${Styles.cellFeature}`}>
                Football
            </div>
            <div className={Styles.tableCell}>
                <span>
                    1
                </span>
            </div>
            <div className={Styles.tableCell}>
                <span>
                    0
                </span>
            </div>
            <div className={`${Styles.tableCell} ${Styles.cellFeature}`}>
                Badminton Net
            </div>
            <div className={Styles.tableCell}>
                <span>
                    1
                </span>
            </div>
            <div className={Styles.tableCell}>
                <span>
                    0
                </span>
            </div>
        </div>
    )
}

export default Table;
