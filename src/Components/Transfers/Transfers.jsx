import React, { useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import { DateObject } from 'react-multi-date-picker';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { initStore } from '../redux/actions/store';
import Pagination from '../Pagination/Pagination';
import _ from 'lodash';
import Modal from '../Modals/Modal';
import Preloader from '../Preloader/Preloader';
import { initTransfers, searchTransfers } from '../redux/actions/transfers';
import { numberWithCommas } from '../../utils/commas';
import CustomDatePicker from '../shared/DatePicker';
import { convertToJalali } from '../../utils/convertDate';


const Transfers = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {transfers, numberOfTransfers} = useSelector(state => state.transfers);
    const loader = useSelector(state=> state.loader);
    const { stores, numberOfStores } = useSelector(state => state.store);
    const [from, setFrom] = useState(new DateObject(Date.now() - 2628000000));
    const [to, setTo] = useState(new DateObject());
    const [number, setNumber] = useState("");
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

    const handleNewRecord = (id) => {
        const transfer = transfers.find(t => t._id === id);
        navigate(`/transfers/new-record`, { state: transfer });
    }

    const handleUpdate = (id)=>{
        const transfer = transfers.find(t=> t._id === id);
        navigate(`/transfers/update`, { state: transfer});
    }

    const handleTransfersDetail = (id) => {
        const transfer = transfers.find(t => t._id === id);
        navigate(`/transfers/detail`, { state: transfer });
    }
    const newTransfer = ()=>{
        navigate("/transfers/new");
    }

    const handleSearch = () => {
        const info = { from: from.toDate(), to: to.toDate(), number, store, weight }
        setSearchData(info);
        setPage(1);
    }

    useEffect(() => {
        if (Object.keys(searchData).length > 0) {
            dispatch(searchTransfers(searchData, page, perPage));
        }else{
            dispatch(initTransfers(page, perPage));
        }
    }, [dispatch, searchData, page, perPage])

    useEffect(() => {
        dispatch(initStore(1, numberOfStores));
    }, [dispatch, numberOfStores])
    return (
        <React.Fragment>
            {loader ? <Preloader /> : null}
            <div className='qouta-sales'>
            <div className="buys-dirctly-header">
            <h3>
              <span className="icon fa fa-truck"></span>نقل و انتقالات
            </h3>
            <button onClick={()=>newTransfer()}>
              <span className="fa fa-plus"></span>مجوز جدید
            </button>
          </div>
                <div className='search-box'>
                    <h3><span className='fa fa-list'></span>{`مدیریت نقل و انتقالات`}</h3>
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
                            <input type="text" onChange={event => setNumber(event.target.value)} />
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
                    <h3 className='qouta-sales-header'><span className='fa fa-table'></span>فهرست نقل و انتقالات</h3>
                    {numberOfTransfers > 0 ? (
                        <table className='qouta-sales-table'>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>عملیات</th>
                                    <th>تاریخ صدور مجوز</th>
                                    <th>شماره مجوز</th>
                                    <th>انبار مبدا</th>
                                    <th>وزن کل</th>
                                    <th>وضعیت کرایه</th>
                                    <th>وزن تحویل شده</th>
                                    <th>وزن باقی مانده</th>
                                    <th>وضعیت</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transfers.map((t, index) => (
                                    <tr key={t._id}>
                                        <td>{(page - 1)*perPage+(index + 1)}</td>
                                        <td>
                                            <Tooltip title="حذف"><span className='fa fa-trash delete' onClick={() => handleDelete(t._id)}></span></Tooltip>
                                            <Tooltip title="ویرایش"><span className='fa fa-check check' onClick={()=>handleUpdate(t._id)}></span></Tooltip>
                                            <Tooltip title="مرحله بعد"><span className='fa fa-arrow-circle-right next' onClick={() => handleNewRecord(t._id)}></span></Tooltip>
                                            <Tooltip title="جزئیات"><span className='fa fa-table detail' onClick={() => handleTransfersDetail(t._id)}></span></Tooltip>
                                        </td>
                                        <td>{convertToJalali(t.date)}</td>
                                        <td>{t.number}</td>
                                        <td>{t.store.name}</td>
                                        <td>{numberWithCommas(t.weight)}</td>
                                        <td>{t.rentStatus  ? numberWithCommas(t.rentPrice): 'پرداخت نشود' }</td>
                                        <td>{numberWithCommas(t.issued)}</td>
                                        <td>{numberWithCommas(t.weight - t.issued)}</td>
                                        {t.weight - t.issued > 0 ? <td><span className='pending'>در حال بارگیری</span></td> : <td><span className='delivered'>تحویل شده</span></td>}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="no-data">
                            <h4><span className='fa fa-warning'></span>در این بازه زمانی مجوزی صادر نشده است</h4>
                        </div>
                    )}
                    {numberOfTransfers > 0 ? <Pagination numbers={numberOfTransfers} page={page} setPage={setPage} perPage={perPage} setPerPage={setPerPage} /> : null}
                </div>
            </div>
            {openDelete ? <Modal flag={openDelete} setFlag={setOpenDelete} id={id} action="delete-transfer" /> : null}
        </React.Fragment>
    )
}

export default Transfers;