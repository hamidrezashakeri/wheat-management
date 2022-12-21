import React, { useState, useEffect } from 'react';
import { DateObject } from 'react-multi-date-picker';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { initPayment } from '../redux/actions/payment';
import moment from 'jalali-moment';
import { numberWithCommas } from '../../utils/commas';
import { initProduct } from '../redux/actions/product';
import Preloader from '../Preloader/Preloader';
import Pagination from '../Pagination/Pagination';
import Tooltip from '@mui/material/Tooltip';
import Modal from '../Modals/Modal';
import CustomDatePicker from '../shared/DatePicker';

const Payments = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [id, setId] = useState(0);
    const [openDelete, setOpenDelete] = useState(false);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [type, setType] = useState("");
    const [bank, setBank] = useState("");
    const [from, setFrom] = useState(new DateObject(Date.now() - 2628000000))
    const [to, setTo] = useState(new DateObject());
    const { products, numberOfProducts } = useSelector(state => state.product);
    const payments = useSelector(state => state.payment);
    const loader = useSelector(state => state.loader);
    const handleDelete = (id) => {
        setId(id);
        setOpenDelete(true);
    }

    const handleUpdate = (id) => {
        const payment = payments.find(p => p._id === id);
        navigate(`/payments/update`, { state: payment });

    }

    const newPaymentNavigate = () => {
        navigate("/payments/new");
    }

    const newQoutaSalesNavigate = (id) => {
        navigate(`/qouta-sales/new/${id}`);
    }

    const singleQoutaSaleNavigate = (id) => {
        navigate(`/qouta-sales/${id}`);
    }

    const handleSearch = () => {
        const info = { type, from: from.toDate(), to: to.toDate(), bank };
        dispatch(initPayment(info, page, perPage))
        setPage(1);
    }

    useEffect(() => {
        dispatch(initProduct(1, numberOfProducts))
    }, [dispatch, numberOfProducts])
    return (
        <React.Fragment>
            {loader ? <Preloader /> : null}
            <div className='payments'>
                <div className="payments-header">
                    <h3><span className='icon fa fa-credit-card'></span>فیش های واریزی</h3>
                    <button onClick={newPaymentNavigate}><span className='fa fa-plus'></span>فیش واریزی جدید</button>
                </div>
                <div className="payments-content">
                    <div className="payments-content-header">
                        <h4><span className='icon fa fa-list'></span>مدیریت فیش های واریزی</h4>
                    </div>
                    <div className="payments-content-body">
                        <div className="payments-input">
                            <label htmlFor="type">نوع گندم:</label>
                            <select name="type" id="type" onChange={event => setType(event.target.value)}>
                                <option value="">...</option>
                                {numberOfProducts > 0 ? products.map(p => (
                                    <option key={p._id} value={p._id}>{p.nameProduct}</option>)) : null}
                            </select>
                        </div>
                        <div className="payments-input">
                            <label htmlFor="bank"> بانک صادر شده:</label>
                            <input type="text" id='bank' onChange={event => setBank(event.target.value)} />
                        </div>
                        <div className="payments-input">
                            <label htmlFor="from">از تاریخ:</label>
                            <CustomDatePicker date={from} onChange={setFrom} />
                        </div>
                        <div className="payments-input">
                            <label htmlFor="to">تا تاریخ:</label>
                            <CustomDatePicker date={to} onChange={setTo} />
                        </div>
                        <div className="payments-input">
                            <button className='search' onClick={handleSearch}>جستجو...</button>
                        </div>
                    </div>
                </div>
                <div className="payments-list">
                    <h4><span className='fa fa-table'></span>فهرست فیش های واریزی</h4>
                    {payments.length > 0 ? (
                        <table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>عملیات</th>
                                    <th>تاریخ خرید</th>
                                    <th>نوع گندم</th>
                                    <th>مبلغ واحد</th>
                                    <th>مقدار خرید</th>
                                    <th>بانک صادر شده</th>
                                    <th>مبلغ خرید</th>
                                    <th>صادر شده</th>
                                    <th>باقی مانده</th>
                                    <th>وضعیت</th>
                                </tr>
                            </thead>
                            <tbody>
                                {payments.map((p, index) => (
                                    <tr key={p._id}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <Tooltip title="حذف"><span className='icon fa fa-trash' style={{ color: 'red' }} onClick={() => handleDelete(p._id)}></span></Tooltip>
                                            <Tooltip title="ویرایش"><span className='icon fa fa-check' style={{ color: 'green' }} onClick={() => handleUpdate(p._id)}></span></Tooltip>
                                            <Tooltip title="مجوز جدید"><span onClick={() => newQoutaSalesNavigate(p._id)} className='icon fa fa-arrow-circle-right' style={{ color: 'purple' }}></span></Tooltip>
                                            <Tooltip title="جزئیات مجوزها"><span className='fa fa-table detail' onClick={() => singleQoutaSaleNavigate(p._id)}></span></Tooltip>
                                        </td>
                                        <td>{moment(p.date).locale("fa").format("YYYY/MM/DD")}</td>
                                        <td>{p.type.nameProduct}</td>
                                        <td>{numberWithCommas(p.type.priceProduct)}</td>
                                        <td>{numberWithCommas(p.amount)}</td>
                                        <td>{p.bank}</td>
                                        <td>{numberWithCommas(p.amount * p.type.priceProduct)}</td>
                                        <td>{numberWithCommas(p.issued)}</td>
                                        <td>{numberWithCommas(p.amount - p.issued)}</td>
                                        <td><span className={p.amount - p.issued > 0 ? 'pending' : 'delivered'}>{p.amount - p.issued > 0 ? 'تسویه نشده' : 'تسویه شده'}</span></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="no-data">
                            <h4><span className='fa fa-warning'></span>شما در این بازه زمانی هیچ واریزی انجام نداده اید</h4>
                        </div>
                    )}
                    {payments.length > 0 ? <Pagination numbers={payments.length} page={page} perPage={perPage} setPage={setPage} setPerPage={setPerPage} /> : null}
                </div>
            </div>
            {openDelete ? <Modal flag={openDelete} setFlag={setOpenDelete} id={id} action="delete-payment" /> : null}
        </React.Fragment>
    )
}

export default Payments;