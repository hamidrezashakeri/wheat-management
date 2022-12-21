import React, { useState, useEffect } from 'react';
import DateObject from 'react-date-object';
import Tooltip from '@mui/material/Tooltip';
import { useSelector, useDispatch } from 'react-redux';
import { search } from '../redux/actions/qoutaSales';
import { useNavigate } from 'react-router-dom';
import { initProduct } from '../redux/actions/product';
import { initStore } from '../redux/actions/store';
import Pagination from '../Pagination/Pagination';
import _ from 'lodash';
import Modal from '../Modals/Modal';
import Preloader from '../Preloader/Preloader';
import CustomDatePicker from '../shared/DatePicker';
import { convertToJalali } from '../../utils/convertDate';


const QoutaSales = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const qoutaSales = useSelector(state => state.qoutaSales);
    const loader = useSelector(state=> state.loader);
    const { stores, numberOfStores } = useSelector(state => state.store);
    const { products, numberOfProducts } = useSelector(state => state.product);
    const [from, setFrom] = useState(new DateObject(Date.now() - 2628000000));
    const [to, setTo] = useState(new DateObject());
    const [license, setLicense] = useState("");
    const [type, setType] = useState("");
    const [store, setStore] = useState("");
    const [weight, setWeight] = useState("");
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [id, setId] = useState(0);
    const [openDelete, setOpenDelete] = useState(false);
    const [searchData, setSearchData] = useState({});

    const handleDelete = (id) => {
        setId(id);
        setOpenDelete(true);
    }

    const handleUpdate= (id) =>{
        const qoutaSale = qoutaSales.find(q=> q._id === id);
        navigate(`/qouta-sales/update/${id}`, { state: qoutaSale });
    }

    const handleNewRecord = (id) => {
        const qoutaSale = qoutaSales.find(q => q._id === id);
        navigate(`/qouta-sales/transfer/${id}`, { state: qoutaSale });
    }
    const handleTransfersDetail = (id) => {
        const qoutaSale = qoutaSales.find(q => q._id === id);
        navigate(`/qouta-sales/transfers-detail/${id}`, { state: qoutaSale });
    }
    const handleSearch = () => {
        const info = { from: from.toDate(), to: to.toDate(), license, type, store, weight }
        setSearchData(info);
        setPage(1);
    }

    useEffect(() => {
        if (Object.keys(searchData).length > 0) {
            dispatch(search(searchData, page, perPage));
        }
    }, [dispatch, searchData, page, perPage])

    useEffect(() => {
        dispatch(initProduct(1, numberOfProducts));
        dispatch(initStore(1, numberOfStores));
    }, [dispatch, numberOfStores, numberOfProducts])
    return (
        <React.Fragment>
            {loader ? <Preloader /> : null}
            <div className='qouta-sales'>
                <div className='search-box'>
                    <h3><span className='fa fa-list'></span>{`مدیریت فروش سهمیه ای`}</h3>
                    <div className="search-box-content">
                        <div className="input-group">
                            <label htmlFor="from">از تاریخ:</label>
                            <CustomDatePicker date={from} onChange={setFrom} />
                        </div>
                        <div className="input-group">
                            <label htmlFor="to">تا تاریخ:</label>
                            <CustomDatePicker date={to} onChange={setTo} />
                        </div>
                        <div className="input-group">
                            <label htmlFor="license">شماره مجوز:</label>
                            <input type="text" onChange={event => setLicense(event.target.value)} />
                        </div>
                        <div className="input-group">
                            <label htmlFor="type">نوع گندم:</label>
                            <select name="type" id="type" onChange={event => setType(event.target.value)}>
                                <option value="">...</option>
                                {numberOfProducts > 0 ? products.map(p => (
                                    <option key={p._id} value={p._id}>{p.nameProduct}</option>)) : null}
                            </select>
                        </div>
                        <div className="input-group">
                            <label htmlFor="store">انبار مبدا:</label>
                            <select name="store" id="store" onChange={event => setStore(event.target.value)}>
                                <option value="">...</option>
                                {numberOfStores > 0 ? _.orderBy(stores, "name", "asc").map(s => (
                                    <option key={s._id} value={s._id}>{s.name}</option>
                                )) : null}
                            </select>
                        </div>
                        <div className="input-group">
                            <label htmlFor="weight">وزن:</label>
                            <input type="text" onChange={event => setWeight(event.target.value)} />
                        </div>
                    </div>
                    <div style={{ width: '100%' }}>
                        <button className='search' onClick={handleSearch}>جستجو...</button>
                    </div>
                </div>
                <div className='qouta-sales-content'>
                    <h3 className='qouta-sales-header'><span className='fa fa-table'></span>فهرست فروش سهمیه ای</h3>
                    {qoutaSales.length > 0 ? (
                        <table className='qouta-sales-table'>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>عملیات</th>
                                    <th>تاریخ صدور مجوز</th>
                                    <th>شماره مجوز</th>
                                    <th>نوع گندم</th>
                                    <th>انبار مبدا</th>
                                    <th>وزن کل</th>
                                    <th>وضعیت کرایه</th>
                                    <th>وزن تحویل شده</th>
                                    <th>وزن باقی مانده</th>
                                    <th>وضعیت</th>
                                </tr>
                            </thead>
                            <tbody>
                                {qoutaSales.map((q, index) => (
                                    <tr key={q._id}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <Tooltip title="حذف"><span className='fa fa-trash delete' onClick={() => handleDelete(q._id)}></span></Tooltip>
                                            <Tooltip title="ویرایش"><span className='fa fa-check check' onClick={()=>handleUpdate(q._id)}></span></Tooltip>
                                            <Tooltip title="مرحله بعد"><span className='fa fa-arrow-circle-right next' onClick={() => handleNewRecord(q._id)}></span></Tooltip>
                                            <Tooltip title="جزئیات"><span className='fa fa-table detail' onClick={() => handleTransfersDetail(q._id)}></span></Tooltip>
                                        </td>
                                        <td>{convertToJalali(q.date)}</td>
                                        <td>{q.number}</td>
                                        <td>{q.type.nameProduct}</td>
                                        <td>{q.store.name}</td>
                                        <td>{q.weight}</td>
                                        <td>{q.rentPrice === '' ? 'پرداخت نشود' : q.rentPrice}</td>
                                        <td>{q.issued}</td>
                                        <td>{q.weight - q.issued}</td>
                                        {q.weight - q.issued > 0 ? <td><span className='pending'>در حال بارگیری</span></td> : <td><span className='delivered'>تحویل شده</span></td>}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="no-data">
                            <h4><span className='fa fa-warning'></span>در این بازه زمانی مجوزی صادر نشده است</h4>
                        </div>
                    )}
                    {qoutaSales.length > 0 ? <Pagination numbers={qoutaSales.length} page={page} setPage={setPage} perPage={perPage} setPerPage={setPerPage} /> : null}
                </div>
            </div>
            {openDelete ? <Modal flag={openDelete} setFlag={setOpenDelete} id={id} action="delete-qouta-sale" /> : null}
        </React.Fragment>
    )
}

export default QoutaSales;