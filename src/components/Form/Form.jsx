import React, {useCallback, useEffect, useState} from 'react';
import './Form.css';
import {useTelegram} from "../../hooks/useTelegram";

const Form = () => {
    const [country, setCountry] = useState('');
    const [street, setStreet] = useState('');
    const [subject, setSubject] = useState('physical');
    const {telegram} = useTelegram();

    const onSendData = useCallback(() => {
        const data = {
            country,
            street,
            subject
        }
        telegram.sendData(JSON.stringify(data));
    }, [country, street, subject])

    useEffect(() => {
        telegram.onEvent('mainButtonClicked', onSendData)
        return () => {
            telegram.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

    useEffect(() => {
        telegram.MainButton.setParams({
            text: 'Send Data'
        })
    }, [])

    useEffect(() => {
        if(!street || !country) {
            telegram.MainButton.hide();
        } else {
            telegram.MainButton.show();
        }
    }, [country, street])

    const onChangeCountry = (e) => {
        setCountry(e.target.value)
    }

    const onChangeStreet = (e) => {
        setStreet(e.target.value)
    }

    const onChangeSubject = (e) => {
        setSubject(e.target.value)
    }

    return (
        <div className={"form"}>
            <h3>Please provide your data</h3>
            <input
                className={'input'}
                type="text"
                placeholder={'Country'}
                value={country}
                onChange={onChangeCountry}
            />
            <input
                className={'input'}
                type="text"
                placeholder={'Street'}
                value={street}
                onChange={onChangeStreet}
            />
            <select value={subject} onChange={onChangeSubject} className={'select'}>
                <option value={'physical'}>Physical Person</option>
                <option value={'legal'}>Legal Person</option>
            </select>
        </div>
    );
};

export default Form;