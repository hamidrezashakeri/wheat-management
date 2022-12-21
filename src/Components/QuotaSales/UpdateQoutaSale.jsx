import React, { useState, useEffect, useRef } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import _ from 'lodash';
import DateObject from 'react-date-object';
import { useDispatch, useSelector } from 'react-redux';
import {useLocation, useNavigate } from 'react-router-dom';
import { initStore } from '../redux/actions/store';
import { updateSingleQoutaSale } from '../redux/actions/qoutaSales';
import CustomDatePicker from '../shared/DatePicker';

const UpdateQoutaSale = () => {
    const validator = useRef(new SimpleReactValidator({
        messages: {
            required: 'این فیلد الزامی است.',
            numeric: 'مقدار عددی وارد کنید'
        },
        element: message => <span style={{ color: 'red', fontSize: '12px', position: 'absolute', top: '42px', right: '126px' }}>{message}</span>
    }));
    const { state } = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch(null);
    const {stores, numberOfStores} = useSelector(state => state.store);
    const [date, setDate] = useState(new DateObject());
    const [number, setNumber] = useState("");
    const [store, setStore] = useState("");
    const [weight, setWeight] = useState("");
    const [rentStatus, setRentStatus] = useState("no");
    const [rentPrice, setPriceRent] = useState("");
    const [,forceUpdate] = useState(0);
    const handleSubmit = () => {
        const info = { date: isNaN(+date) ? date : date.toDate(), number, store, weight, rentStatus: rentStatus === 'yes' ? true : false, rentPrice };
        if(validator.current.allValid()){
            dispatch(updateSingleQoutaSale(info,state._id));
            navigate("/qouta-sales");
        }else{
            validator.current.showMessages();
            forceUpdate(1);
        }
    }

    useEffect(()=>{
        setDate(state.date);
        setNumber(state.number);
        setStore(state.store._id);
        setWeight(state.weight);
        setRentStatus(state.rentStatus? 'yes': 'no');
        setPriceRent(state.rentPrice);
    },[state])

    useEffect(() => {
        dispatch(initStore(1, numberOfStores));
    }, [dispatch, numberOfStores])
    return (
        <div className='new-quota-sales'>
            <div className="new-qouta-sales-content">
                <h3>ویرایش مجوز</h3>
                <div className="details-new-qouta-sales">
                    <div className="input-group">
                        <label htmlFor="date">تاریخ صدور مجوز:</label>
                        <CustomDatePicker date={date} onChange={setDate} />
                    </div>
                    <div className="input-group">
                        <label htmlFor="number">شماره مجوز:</label>
                        <input type="text" value={number} onChange={event => setNumber(event.target.value)} />
                    </div>
                    <div className="input-group">
                        <label htmlFor="stores">انبار تحویل دهنده:</label>
                        <select name="stores" id="stores" value={store} onChange={event => setStore(event.target.value)}>
                            <option value="">...</option>
                            {_.orderBy(stores, "name", "asc").map(s => (
                                <option key={s._id} value={s._id}>{s.name}</option>
                            ))}
                        </select>
                        {validator.current.message("stores", store, "required")}
                    </div>
                    <div className="input-group">
                        <label htmlFor="weight">وزن خریداری شده:</label>
                        <input type="text" name='weight' value={weight} onChange={event => setWeight(event.target.value)} />
                        {validator.current.message("weight", weight, "required|numeric")}
                    </div>
                    <div className="input-group">
                        <label htmlFor="rent">وضعیت کرایه:</label>
                        <select name="rent" id="rent" value={rentStatus} onChange={event => setRentStatus(event.target.value)}>
                            <option value="no">...</option>
                            <option value="yes">پرداخت شود</option>
                            <option value="no">پرداخت نشود</option>
                        </select>
                    </div>
                    {rentStatus === 'yes' ? (
                        <div className="input-group">
                            <label htmlFor="price-rent">مبلغ کرایه:</label>
                            <input type="text" value={rentPrice} onChange={event => setPriceRent(event.target.value)} />
                        </div>
                    ) : null}
                </div>
                <button onClick={handleSubmit} className='submit' style={{ width: '100%' }}>ثبت</button>
            </div>
        </div>
    )
}

export default UpdateQoutaSale;