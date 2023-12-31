import React from "react";
import Select, {defaultTheme} from "react-select";
import styles from './styles.module.scss'
import clsx from "clsx";
import CurrencyFlag from "../currency-flag";

const CustomSelect = (props) => {
    const {
        value,
        onChange,
        options,
        label,
        className,
        disabled
    } = props

    const selectClassnames = clsx (
        styles['select-wrap'],
        className
    )
    const formatOption=(option)=>{
        return(
            <div>
                <CurrencyFlag width={15} height={13} currency={option.value}/>
                <div className={styles['label']}>{option.label}</div>
            </div>
        )
    }


    return (
        <div className={selectClassnames}>
             {label && (
                <span className={styles['label']}>
                    {label}
                </span>
            )}
            <Select
                classNamePrefix={'custom-select'}
                isDisabled={disabled}
                className={styles['select']}
                value={value}
                onChange={onChange}
                options={options}
                formatOptionLabel={formatOption}
            />
        </div>
    )
}

export default CustomSelect