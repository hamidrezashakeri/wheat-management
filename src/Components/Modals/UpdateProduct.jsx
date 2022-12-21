import React, { useRef, useState } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import { useDispatch, useSelector } from 'react-redux';
import { updateProduct } from '../redux/actions/product';

const UpdateProduct = ({ flag, setFlag, id }) => {
    const validator = useRef(new SimpleReactValidator({
        messages: {
            required: 'این فیلد الزامی است.',
            numeric: 'مقدار عددی وارد کنید'
        },
        element: message => <span style={{ color: 'red', fontSize: '12px' }}>{message}</span>
    }));
    const { products } = useSelector(state => state.product);
    const filterProduct = products.find(s => s._id === id)
    const dispatch = useDispatch(null)
    const modalToggle = useRef(null);
    const [nameProduct, setNameProduct] = useState(filterProduct.nameProduct);
    const [price, setPrice] = useState(filterProduct.priceProduct);
    const [, forceUpdate] = useState(0);
    const product = (event) => {
        event.preventDefault();
        const productInfo = {
            id: Math.floor(Math.random() * 1000),
            nameProduct,
            priceProduct: price
        }
        if (validator.current.allValid()) {
            dispatch(updateProduct(id, productInfo));
            setFlag(false);
        } else {
            forceUpdate(1);
            validator.current.showMessages();
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
                <h3>ویرایش محصول</h3>
                <form onSubmit={event => product(event)}>
                    <div className="input-group">
                        <label htmlFor="title-product">نام محصول:</label>
                        <input type="text" name='title' id='title-product' placeholder='به طور مثال: گندم یارانه ای' value={nameProduct} onChange={event => setNameProduct(event.target.value)} />
                        {validator.current.message("title", nameProduct, "required")}
                    </div>
                    <div className="input-group">
                        <label htmlFor="price-product">قیمت واحد محصول(ریال):</label>
                        <input type="text" name='price' id='price-product' placeholder='به طور مثال: 6650' value={price} onChange={event => setPrice(event.target.value)} />
                        {validator.current.message("price", price, "required|numeric|min:0,num")}
                    </div>
                    <div className="input-group">
                        <button type='submit' className='submit'>ویرایش</button>
                        <button className='cancel' onClick={() => toggle()}>انصراف</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UpdateProduct;