import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { changeRentStatus, deleteSingleBuy } from '../redux/actions/buysDirectly';
import { deleteSinglePayment } from '../redux/actions/payment';
import { deleteSingleQoutaSale } from '../redux/actions/qoutaSales';
import { changeSingleStatusStore } from '../redux/actions/store';
import { changeSingleStatusRent, deleteSingleTransferQoutaSale } from '../redux/actions/transferQoutaSale';
import { deleteSingleTransfer } from '../redux/actions/transfers';
import { deleteSingleTransferDetail } from '../redux/actions/transfersDetail';

const Modal = ({ flag, setFlag, id, secondId = 0, action }) => {
    const modalToggle = useRef(null);
    const dispatch = useDispatch(null);
    const toggle = () => {
        if (flag) {
            modalToggle.current.style.display = 'block';
            setFlag(false);
        } else {
            modalToggle.current.style.display = 'none';
            setFlag(true);
        }
    }

    const change = () => {
        switch (action) {
            case "store":
                dispatch(changeSingleStatusStore(id));
                setFlag(false);
                break;
            case "rent":
                dispatch(changeSingleStatusRent(id, secondId));
                setFlag(false);
                break;
            case "delete":
                dispatch(deleteSingleTransferQoutaSale(id, secondId));
                setFlag(false);
                break;
            case "delete-qouta-sale":
                dispatch(deleteSingleQoutaSale(id));
                setFlag(false);
                break;
            case "delete-payment":
                dispatch(deleteSinglePayment(id));
                setFlag(false);
                break;
            case "delete-buy":
                dispatch(deleteSingleBuy(id));
                setFlag(false);
                break;
            case "delete-transfer-detail":
                dispatch(deleteSingleTransferDetail(id));
                setFlag(false);
                break;
            case "delete-transfer":
                dispatch(deleteSingleTransfer(id));
                setFlag(false);
                break;
            case "change-status":
                dispatch(changeRentStatus(id));
                setFlag(false);
            default:
                setFlag(false);
        }
    }

    return (
        <div className='modal zoom' ref={modalToggle}>
            <div className="modal-content">
                <span className='close' onClick={toggle}>&times;</span>
                <h3 style={{ textAlign: 'right' }}>تغییر وضعیت</h3>
                <p style={{ marginTop: '35px' }}>آیا از انجام این کار مطمئن هستید؟</p>
                <div className="input-group" style={{ textAlign: 'left' }}>
                    <button onClick={change} className='submit'>بله</button>
                    <button className='cancel' onClick={toggle}>انصراف</button>
                </div>
            </div>
        </div>
    )
}

export default Modal;