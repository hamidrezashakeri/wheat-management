import React, { useRef, useState } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import { useDispatch } from 'react-redux';
import { addStore } from '../redux/actions/store';

const NewStore = ({ flag, setFlag }) => {
    const dispatch = useDispatch(null);
    const modalToggle = useRef(null);
    const validator = useRef(new SimpleReactValidator({
        messages:{
            required: 'این فیلد الزامی است.'
        },
        element : message => <span style={{color: 'red', fontSize: '12px'}}>{message}</span> 
    }));
    const [nameStore, setNameStore] = useState("");
    const [city, setCity] = useState("");
    const [status, setStatus] = useState("");
    const [,forceUpdate] = useState(0);

    const store = (event) => {
        event.preventDefault();
        const newStore = {
            name: nameStore,
            city,
            status: status || false
        }
        if (validator.current.allValid()) {
            dispatch(addStore(newStore));
            setFlag(false);
        }else{
            validator.current.showMessages();
            forceUpdate(1);
        }
    }

    const toggle = () => {
        if (flag) {
            modalToggle.current.style.display = "block";
            setFlag(false);
        } else {
            modalToggle.current.style.display = "none";
            setFlag(true);
        }
    }

    return (
        <div className="modal zoom" ref={modalToggle}>
            <div className="modal-content">
                <span className='close' onClick={toggle}>&times;</span>
                <h3>انبار ذخیره سازی جدید</h3>
                <form onSubmit={event => store(event)}>
                    <div className="input-group">
                        <label htmlFor="title-store">نام مرکز ذخیره سازی:</label>
                        <input type="text" name='title' id='title-store' placeholder='به طور مثال: حسن قشلاق' value={nameStore} onChange={event => setNameStore(event.target.value)} />
                        {validator.current.message("title", nameStore, "required")}
                    </div>
                    <div className="input-group">
                        <label htmlFor="city-store">شهرستان:</label>
                        <input type="text" name='city' id='city-store' placeholder='به طور مثال: همدان-بهار' value={city} onChange={event => setCity(event.target.value)} />
                        {validator.current.message("city", city, "required")}
                    </div>
                    <div className="input-group">
                        <label htmlFor="status">وضعیت:</label>
                        <select name="status" id="status" value={status} onChange={event => setStatus(event.target.value)}>
                            <option value={false}>غیرفعال</option>
                            <option value={true}>فعال</option>
                        </select>
                    </div>
                    <div className="input-group">
                        <button type='submit' className='submit'>ثبت</button>
                        <button className='cancel' onClick={() => toggle()}>انصراف</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default NewStore;