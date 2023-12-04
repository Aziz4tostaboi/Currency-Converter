import React from "react";
import styles from './styles.module.scss';
import clsx from "clsx";

const AmountInput = (props) => {
    const {
        label,
        value,
        onChange,
        className
    } = props

    const inputClassnames = clsx (
        styles['amount-wrap'],
        className
    )

    return (
        <div className={inputClassnames}>
            {label && (
                <span className={styles['label']}>
                    {label}
                </span>
            )}
            <input
                className={styles['input']}
                value={value}
                onChange={onChange}
                type="number"
            />
        </div>
    )
}

export default AmountInput