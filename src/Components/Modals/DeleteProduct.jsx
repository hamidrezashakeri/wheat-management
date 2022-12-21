import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { message } from '../../utils/message';
import { deleteProduct } from '../redux/actions/product';


const DeleteProduct = ({flag, setFlag, id})=>{
    const modalToggle = useRef(null);
    const dispatch = useDispatch(null);
    const toggle = ()=>{
        if(flag){
            modalToggle.current.style.display = 'block';
            setFlag(false);
        }else{
            modalToggle.current.style.display = 'none';
            setFlag(true);
        }
    }

    const deleted = ()=>{
        dispatch(deleteProduct(id));
        setFlag(false);
    }

    return(
        <div className='modal zoom' ref={modalToggle}>
            <div className="modal-content">
            <span className='close' onClick={toggle}>&times;</span>
                <h3 style={{ textAlign: 'right'}}>حذف انبار</h3>
                <p style={{ marginTop: '35px'}}>آیا از حذف محصول مطمئن هستید؟</p>
                <div className="input-group" style={{ textAlign: 'left'}}>
                        <button onClick={deleted} className='submit'>حذف</button>
                        <button className='cancel' onClick={toggle}>انصراف</button>
                    </div>
            </div>
        </div>
    )
}

export default DeleteProduct;