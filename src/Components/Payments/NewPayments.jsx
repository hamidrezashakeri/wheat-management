import React, { useState, useEffect, useRef } from "react";
import SimpleReactValidator from "simple-react-validator";
import { useDispatch, useSelector } from "react-redux";
import DateObject from 'react-date-object';
import { addPayment } from "../redux/actions/payment";
import { initProduct } from "../redux/actions/product";
import { useNavigate } from "react-router-dom";
import CustomDatePicker from "../shared/DatePicker";
import CustomInput from "../shared/CustomInput";


const NewPayments = () => {
    const validator = useRef(new SimpleReactValidator({
        messages: {
            required: 'این فیلد الزامی است.',
            numeric: 'مقدار عددی وارد کنید'
        },
        element: message => <span style={{ color: 'red', fontSize: '12px', position: 'absolute', top: '42px', right: '126px' }}>{message}</span>
    }));
    const navigate = useNavigate();
    const dispatch = useDispatch(null);
    const { products, numberOfProducts } = useSelector(state => state.product);
    const [date, setDate] = useState(new DateObject());
    const [amount, setAmount] = useState("");
    const [type, setType] = useState("");
    const [unit, setUnit] = useState("");
    const [bank, setBank] = useState("");
    const [, forceUpdate] = useState(0);
    const handleSubmit = () => {
        const info = { date: date.toDate(), amount, type, bank }
        if (validator.current.allValid()) {
            dispatch(addPayment(info));
            navigate('/payments');
        } else {
            validator.current.showMessages();
            forceUpdate(1);
        }
    }

    useEffect(() => {
        if (products) {
            const filtred = products.filter(p => p._id === type)[0];
            filtred ? setUnit(filtred['priceProduct']) : setUnit(0);
        }
    }, [type, products])

    useEffect(() => {
        dispatch(initProduct());
    }, [dispatch])

    return (
        <div className="new-payments">
            <div className="new-payments-content">
                <div className="new-payments-content-header">
                    <h4>فیش واریزی جدید</h4>
                </div>
                <div className="new-payments-content-body">
                    <div className="input-group">
                        <label htmlFor="date">تاریخ خرید:</label>
                        <CustomDatePicker date={date} onChange={setDate} />
                    </div>
                        <div className="input-group">
                        <label htmlFor="amount">مقدار خرید:</label>
                        <input type="text" name="amount" value={amount} onChange={event => setAmount(event.target.value)} />
                        {validator.current.message("amount", amount, "required|numeric:min:0,num")}
                    </div>
                    <div className="input-group">
                        <label htmlFor="price">مبلغ خرید:</label>
                        <input type="text" value={unit ? amount * unit : 0} disabled />
                    </div>
                    <div className="input-group">
                        <label htmlFor="type">نوع گندم:</label>
                        <select name="type" id="type" value={type} onChange={event => setType(event.target.value)}>
                            <option value="">...</option>
                            {numberOfProducts > 0 ? products.map(p => (
                                <option key={p._id} value={p._id}>{p.nameProduct}</option>)) : null}
                        </select>
                        {validator.current.message("type", type, "required")}
                    </div>
                    <div className="input-group">
                        <label htmlFor="unit">مبلغ واحد کالا:</label>
                        <input type="text" value={unit} disabled />
                    </div>
                    <div className="input-group">
                        <label htmlFor="bank">بانک صادر شده:</label>
                        <input type="text" name="bank" value={bank} onChange={event => setBank(event.target.value)} />
                        {validator.current.message("bank", bank, "required")}
                    </div>
                </div>
                <div className="input-group">
                    <button onClick={handleSubmit}>ثبت</button>
                </div>
            </div>
        </div>
    )
}

export default NewPayments;