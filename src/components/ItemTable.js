import React from 'react';
import Styles from '../styles/components/item-table.module.css';

function ItemTable({ data }) {
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
        </div>
    )
}

export default ItemTable;
