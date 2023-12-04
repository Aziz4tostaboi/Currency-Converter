import React, {useEffect, useState} from "react";
import styles from './styles.module.scss';
import Button from "../components/button";
import CustomSelect from "../components/select";
import AmountInput from "../components/amount";
import {API, REQUEST_HEADERS} from "../api/endpoints";
import {type} from "@testing-library/user-event/dist/type";



function App() {
    const [fromOption, setFromOption] = useState(null)
    const [toOption, setToOption] = useState(null)
    const [amountInput , setAmountInput] = useState('');
    const [symbolsOptions, setSymbolsOptions] = useState([]);
    const [result, setResult] = useState(null)
    const [Loding,setLodaing]=useState(false)
    const[disabledButton,setDisabledButton ]=useState(false)
    const [disabledAmoutInput,setdisabledAmoutInput]=useState(false)
    const [disabledselect,setDisabledselet]=useState(false)

     const swap = () => {
        setFromOption(toOption)
        setToOption(fromOption)

    }



    const getSymbols = async () => {
        const res = await fetch(API.CURRENCY.symbols, REQUEST_HEADERS)
        const data = await res.json()
        return data.symbols
    }

    const transformSymbolsDataToOptions = (symbolsObj) => {
        return Object.keys(symbolsObj).map(item => {
            return {
                value: item,
                label: item
            }
        })
    }

    const handleConvertCurrency = async () => {
        if (!amountInput || !toOption || !fromOption) {
            return
        }
        try{
            setLodaing(true)
            setDisabledButton(true)
            setdisabledAmoutInput(true)
            setDisabledselet(true)

        const res = await fetch(API.CURRENCY.convert(toOption.value, fromOption.value, amountInput), REQUEST_HEADERS)
        const data = await res.json()
        setResult({
            amount: data.query.amount,
            result: data.result,
            from: data.query.from,
            to: data.query.to
        })
            }catch (error){
            console.log("error")
        }
        finally {
            setLodaing(false)
            setDisabledButton(false)
            setdisabledAmoutInput(false)
            setDisabledselet(false)
        }
    }


    useEffect( () => {
        (async () => {
            const symbols = await getSymbols()
            const options = transformSymbolsDataToOptions(symbols)
            setSymbolsOptions(options)
        })()
    }, []);

    return (
        <div className={styles['currency-converter-wrap']}>

            <h1 className={styles['title']}>Currency Converter</h1>
            <AmountInput
                label='Enter Amount'
                value={amountInput}
                onChange={e => setAmountInput(e.target.value)}
                disabled={disabledAmoutInput }
            />
            <div className={styles['custom-selects']}>

                <CustomSelect
                    className={styles['first']}
                    label='From'
                    value={fromOption}
                    onChange={val => setFromOption(val)}
                    options={symbolsOptions}
                    disabled={disabledselect}
                />
                <h2 onClick={swap}>  ⇆ </h2>
                <CustomSelect
                    label='To'
                    value={toOption}
                    onChange={val => setToOption(val)}
                    options={symbolsOptions}
                    disabled={disabledselect}
                />
            </div>
                    <p>Result</p>
                {  result && `${amountInput} ${result.from} = ${result.result} ${result.to}`}
            <Button
                type={type}
                onClick={handleConvertCurrency}
                className={styles['convert-btn']}
                disabled={!amountInput || !fromOption || !toOption || disabledButton}
            >
                {Loding?<span className={styles['loader']}>LOaDIng...</span>:<span>Convert</span>}
            </Button>


        </div>
    );
}

export default App;
