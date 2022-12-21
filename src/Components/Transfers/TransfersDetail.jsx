import React, { useEffect, useState, useRef } from 'react';
import Tooltip from '@mui/material/Tooltip';
import { DateObject } from 'react-multi-date-picker';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Preloader from '../Preloader/Preloader';
import { numberWithCommas } from '../../utils/commas';
import Modal from '../Modals/Modal';
import  Pagination from '../Pagination/Pagination';
import { getTransfersDetail, searchTransfersDetail } from '../redux/actions/transfersDetail';
import CustomDatePicker from '../shared/DatePicker';
import { convertToJalali } from '../../utils/convertDate';


const TransfersDetail = () => {
    const { state } = useLocation();
    const { transfers, numbers } = useSelector(state => state.transfersDetail);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const capture = useRef(null);
    const [loading, setLoading] = useState(true);
    const [from, setFrom] = useState(new DateObject(new Date(state.date)))
    const [to, setTo] = useState(new DateObject(new Date()));
    const [sourceWeight, setSourceWieght] = useState("");
    const [destinationWeight, setDestinationWeight] = useState("");
    const [weightNumber, setWeightNumber] = useState("");
    const [driver, setDriver] = useState("");
    const [numberTruck, setNumberTruck] = useState("");
    const [rentState, setRentState] = useState("");
    const [id, setId] = useState(0);
    const [openChange, setOpenChange] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [search, setSearch] = useState({});

    const renderPdf = () => {
        navigate("/qouta-sales/transfers-detail-pdf", { state: {transfers, store: state.store.name}});
    }

    const handleDelete = (id)=>{
        setId(id);
        setOpenDelete(true);
    }

    const handleUpdate = (id)=>{
        const transfer = transfers.find(t=> t._id === id);
       navigate(`/transfers/update-record`, {state: transfer});
    }

    const handleSearch = () => {
        const info = { to: to.toDate(), from: from.toDate(), sourceWeight, destinationWeight, weightNumber, driver, numberTruck, rentState };
        setSearch(info);
        setPage(1);
        
    }
    
    const handleRent = (id) => {
        setId(id);
        setOpenChange(true);
        
    }
    useEffect(() => {
        if(Object.keys(search).length >0){
            dispatch(searchTransfersDetail(search, state._id, page, perPage));
            setLoading(false);
        }else{
            dispatch(getTransfersDetail(state._id, page, perPage));
            setLoading(false);
        }
    }, [state._id, page, perPage, search, dispatch])
    return (
        <React.Fragment>
            <div className='transfer'>
                {loading ? <Preloader /> : null}
                <div className='search-box'>
                    <h3><span className='fa fa-list'></span>{`مدیریت محموله ها از ${state.store.name}`}</h3>
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
                            <label htmlFor="src">وزن مبدا:</label>
                            <input type="text" onChange={event => setSourceWieght(event.target.value)} />
                        </div>
                        <div className="input-group">
                            <label htmlFor="dest">وزن مقصد:</label>
                            <input type="text" onChange={event => setDestinationWeight(event.target.value)} />
                        </div>
                        <div className="input-group">
                            <label htmlFor="number">شماره توزین:</label>
                            <input type="text" onChange={event => setWeightNumber(event.target.value)} />
                        </div>
                        <div className="input-group">
                            <label htmlFor="driver">راننده:</label>
                            <input type="text" onChange={event => setDriver(event.target.value)} />
                        </div>
                        <div className="input-group">
                            <label htmlFor="number-truck"> شماره پلاک:</label>
                            <input type="text" onChange={event => setNumberTruck(event.target.value)} />
                        </div>
                        <div className="input-group">
                            <label htmlFor="rent">وضعیت کرایه:</label>
                            <select name="rent" id="rent" onChange={event=>setRentState(event.target.value)}>
                                <option value="">...</option>
                                <option value={false}>پرداخت نشده</option>
                                <option value={true}>پرداخت شده</option>
                            </select>
                        </div>
                    </div>
                    <div style={{ width: '100%'}}>
                        <button className='search' onClick={handleSearch}>جستجو...</button>
                    </div>
                </div>
                <div className="transfer-content">
                    <div className="transfer-header">
                    <h3><span className='fa fa-table'></span>{`فهرست محموله های ${state.store.name}`}</h3>
                    <button className='export' onClick={renderPdf}><span className='fa fa-file-pdf-o' ></span></button>
                    </div>
                    <div className='transfer-details'>
                        {numbers > 0 ? (
                            <>
                                <table ref={capture}>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>عملیات</th>
                                            <th>تاریخ ورود</th>
                                            <th>وزن مبدا</th>
                                            <th>وزن مقصد</th>
                                            <th>شماره توزین</th>
                                            <th>راننده</th>
                                            <th>شماره پلاک</th>
                                            <th>مبلغ کرایه</th>
                                            <th>وضعیت کرایه</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {transfers.map((t, index) => (
                                            <tr key={t._id}>
                                                <td>{((page - 1)*perPage)+(index + 1)}</td>
                                                <td>
                                                    <Tooltip title="حذف"><span className='fa fa-trash delete' onClick={()=>handleDelete(t._id)}></span></Tooltip>
                                                    <Tooltip title="ویرایش"><span className='fa fa-check update' onClick={()=>handleUpdate(t._id)}></span></Tooltip>
                                                </td>
                                                <td>{convertToJalali(t.date)}</td>
                                                <td>{numberWithCommas(t.sourceWeight)}</td>
                                                <td>{numberWithCommas(t.destinationWeight)}</td>
                                                <td>{t.weightNumber}</td>
                                                <td>{t.driver}</td>
                                                <td>{t.numberTruck}</td>
                                                <td>{t.transferId.rentPrice === '' ? 'پرداخت نشود' : numberWithCommas((t.sourceWeight * t.transferId.rentPrice) / 1000)}</td>
                                                {t.transferId.rentPrice === '' ? <td>بدون پرداخت</td> : <td>{t.rentState ? 'پرداخت شده' : (<button className='rent' onClick={() => handleRent(t._id)}>پرداخت</button>)}</td>}
                                            </tr>

                                        ))}
                                    </tbody>
                                </table>
                                <Pagination numbers={numbers} page={page} setPage={setPage} perPage={perPage} setPerPage={setPerPage} />
                            </>
                        ) : (
                            <div className="no-data">
                                <h4><span className='fa fa-warning'></span>محموله ای ثبت نشده است.</h4>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {openChange ? <Modal flag={openChange} setFlag={setOpenChange} id={id} action="rent" secondId={state._id} /> : null}
            {openDelete ? <Modal flag={openDelete} setFlag={setOpenDelete} id={id} action="delete-transfer-detail" secondId={state._id} />: null}
        </React.Fragment>
    )
}

export default TransfersDetail;