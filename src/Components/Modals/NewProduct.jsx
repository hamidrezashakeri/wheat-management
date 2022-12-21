import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from '../redux/actions/product';
import SimpleReactValidator from 'simple-react-validator';


const NewProduct = ({ flag, setFlag }) => {
    const validator = useRef(new SimpleReactValidator({
        messages: {
            required: 'این فیلد الزامی است.',
            numeric: 'مقدار عددی وارد کنید'
        },
        element: message => <span style={{ color: 'red', fontSize: '12px' }}>{message}</span>
    }));
    const modalToggle = useRef(null);
    const dispatch = useDispatch(null);
    const [nameProduct, setNameProduct] = useState("");
    const [priceProduct, setPriceProduct] = useState("");
    const [, forceUpdate] = useState(0);
    const product = (event) => {
        event.preventDefault();
        const productInfo = {
            nameProduct,
            priceProduct
        }
        if (validator.current.allValid()) {
            dispatch(addProduct(productInfo));
            setFlag(false);
        }else{
            validator.current.showMessages();
            forceUpdate(1);
        }
    }

    const toggle = () => {
        if (flag) {
            modalToggle.current.style.display = 'block';
            setFlag(false)
        } else {
            modalToggle.current.style.display = 'none';
            setFlag(true)
        }
    }

    return (
        <div className="modal zoom" ref={modalToggle}>
            <div className="modal-content">
                <span className='close' onClick={toggle}>&times;</span>
                <h3>محصول جدید</h3>
                <form onSubmit={event => product(event)}>
                    <div className="input-group">
                        <label htmlFor="title-store">نام محصول:</label>
                        <input type="text" id='title-product' placeholder='به طور مثال: گندم یارانه ای' name='title' value={nameProduct} onChange={event => setNameProduct(event.target.value)} />
                        {validator.current.message("title", nameProduct, "required")}
                    </div>
                    <div className="input-group">
                        <label htmlFor="city-store">قیمت واحد محصول(ریال):</label>
                        <input type="text" id='price-product' name='price' placeholder='به طور مثال: 6650' value={priceProduct} onChange={event => setPriceProduct(event.target.value)} />
                        {validator.current.message("price", priceProduct, "required|numeric|min:0,num")}
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

export default NewProduct;