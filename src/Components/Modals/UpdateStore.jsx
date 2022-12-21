import React, { useRef, useState } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import { useDispatch, useSelector } from 'react-redux';
import { updateStore } from '../redux/actions/store';


const UpdateStore = ({ flag, setFlag, id }) => {
    const dispatch = useDispatch(null)
    const modalToggle = useRef(null);
    const validator = useRef(new SimpleReactValidator({
        messages: {
            required: 'این فیلد الزامی است'
        },
        element: message => <span style={{ color: 'red', fontSize: '12px' }}>{message}</span>
    }))
    const { stores } = useSelector(state => state.store);
    const filterStore = stores.find(s => s._id === id)
    const [name, setName] = useState(filterStore.name);
    const [city, setCity] = useState(filterStore.city);
    const [status, setStatus] = useState(filterStore.status);
    const [,forceUpdate] = useState(0);
    const store = (event) => {
        event.preventDefault();
        const newStore = {
            id: Math.floor(Math.random() * 1000),
            name,
            city,
            status
        }
        if (validator.current.allValid()) {
            dispatch(updateStore(id, newStore));
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
                <h3>ویرایش ذخیره سازی جدید</h3>
                <form onSubmit={event => store(event)}>
                    <div className="input-group">
                        <label htmlFor="title-store">نام مرکز ذخیره سازی:</label>
                        <input type="text" name='title' id='title-store' value={name} onChange={event => setName(event.target.value)} />
                        {validator.current.message("title", name, "required")}
                    </div>
                    <div className="input-group">
                        <label htmlFor="city-store">شهرستان:</label>
                        <input type="text" name='city' id='city-store' value={city} onChange={event => setCity(event.target.value)} />
                        {validator.current.message("city", city, "required")}
                    </div>
                    <div className="input-group">
                        <label htmlFor="status">وضعیت:</label>
                        <select name="status" id="status" value={status} onChange={event => setStatus(event.target.value)}>
                            <option value={true}>فعال</option>
                            <option value={false}>غیرفعال</option>
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

export default UpdateStore;