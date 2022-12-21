import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import moment from 'jalali-moment';
import DateObject from 'react-date-object';
import { useDispatch, useSelector } from 'react-redux';
import { initTransferReport } from '../redux/actions/transfersReport';
import { initStore } from '../redux/actions/store';
import Preloader from '../Preloader/Preloader';
import Pagination from '../Pagination/Pagination';
import CustomDatePicker from '../shared/DatePicker';

const Transfers = () => {
    const dispatch = useDispatch();
    const { stores } = useSelector(state => state.store);
    const loader = useSelector(state => state.loader);
    const [from, setFrom] = useState(new DateObject(Date.now() - 2628000000))
    const { reports, numbers } = useSelector(state => state.transfersReport);
    const [to, setTo] = useState(new DateObject());
    const [transaction, setTransaction] = useState("all");
    const [store, setStore] = useState("");
    const [sourceWeight, setSourceWeight] = useState("");
    const [destinationWeight, setDestinationWeight] = useState("");
    const [weightNumber, setWeightNumber] = useState("");
    const [numberTruck, setNumberTruck] = useState("");
    const [driver, setDriver] = useState("");
    const [rentStatus, setRentStatus] = useState("");
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [search, setSearch] = useState({});
    const handleSearch = () => {
        const info = {
            from: from.toDate(),
            to: to.toDate(),
            transaction,
            store,
            sourceWeight,
            destinationWeight,
            weightNumber,
            numberTruck,
            driver,
            rentStatus
        }
        setSearch(info);
        setPage(1);
    }
    useEffect(() => {
       if(Object.keys(search).length >0){
        dispatch(initTransferReport(search, page, perPage));
       }
    }, [dispatch, search, page, perPage])
    useEffect(() => {
        dispatch(initStore());
    }, [dispatch])
    return (
        <>
            <div className='transfers-report'>
                {loader ? <Preloader /> : null}
                <h3><span className='fa fa-list'></span>مدیریت گزارشات حمل و نقل</h3>
                <div className="transfers-report-search">
                    <div className="input-group">
                        <label htmlFor="from">از تاریخ:</label>
                        <CustomDatePicker date={from} onChange={setFrom} />
                    </div>
                    <div className="input-group">
                        <label htmlFor="to">تا تاریخ:</label>
                        <CustomDatePicker date={to} onChange={setTo} />
                    </div>
                    <div className="input-group">
                        <label htmlFor="transaction">نوع تراکنش:</label>
                        <select name="transaction" id="transaction" onChange={event => setTransaction(event.target.value)}>
                            <option value="all">همه</option>
                            <option value="transfer">نقل و انتقال(کمیسیون)</option>
                            <option value="qoutasale">فروش سهمیه ای</option>
                        </select>
                    </div>
                    <div className="input-group">
                        <label htmlFor="stores">انبار مبدا:</label>
                        <select name="stores" id="stores" onChange={event => setStore(event.target.value)}>
                            <option value="">...</option>
                            {_.orderBy(stores, 'name', 'asc').map(s => (
                                <option key={s._id} value={s._id}>{s.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="input-group">
                        <label htmlFor="source-weight">وزن مبدا:</label>
                        <input type="text" onChange={event => setSourceWeight(event.target.value)} />
                    </div>
                    <div className="input-group">
                        <label htmlFor="destination-weight">وزن مقصد:</label>
                        <input type="text" onChange={event => setDestinationWeight(event.target.value)} />
                    </div>
                    <div className="input-group">
                        <label htmlFor="weight-number">شماره توزین:</label>
                        <input type="text" onChange={event => setWeightNumber(event.target.value)} />
                    </div>
                    <div className="input-group">
                        <label htmlFor="number-truck">شماره پلاک:</label>
                        <input type="text" onChange={event => setNumberTruck(event.target.value)} />
                    </div>
                    <div className="input-group">
                        <label htmlFor="driver">راننده:</label>
                        <input type="text" onChange={event => setDriver(event.target.value)} />
                    </div>
                    <div className="input-group">
                        <label htmlFor="rent-status">وضعیت کرایه:</label>
                        <select name="rent-status" id="rent-status" onChange={event => setRentStatus(event.target.value)}>
                            <option value="">...</option>
                            <option value={false}>پرداخت نشده</option>
                            <option value={true}>پرداخت شده</option>
                        </select>
                    </div>
                </div>
                <button className='search' onClick={handleSearch}>جستجو...</button>
            </div>

            <div className="transfers-report-content">
                <h3><span className='fa fa-table'></span>فهرست گزارشات</h3>
                {reports.length > 0 ? (
                    <table style={{ marginTop: '50px' }}>
                        <thead>
                            <tr>
                                <th>ردیف</th>
                                <th>نوع تراکنش</th>
                                <th>تاریخ ورود</th>
                                <th>انبار مبدا</th>
                                <th>وزن مبدا</th>
                                <th>وزن مقصد</th>
                                <th>شماره توزین</th>
                                <th>شماره پلاک</th>
                                <th>راننده</th>
                                <th>وضعیت کرایه</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reports ? _.orderBy(reports, 'date', 'desc').map((t, index) => (
                                <tr key={t._id._id}>
                                    <td>{(page - 1)*perPage + index+1}</td>
                                    <td>{t.qoutaSale ? 'فروش سهمیه ای' : 'نقل و انتقال(کمیسون)'}</td>
                                    <td>{moment(t.date).locale('fa').format('YYYY/MM/DD')}</td>
                                    <td>{t.store.name}</td>
                                    <td>{t.sourceWeight}</td>
                                    <td>{t.destinationWeight}</td>
                                    <td>{t.weightNumber}</td>
                                    <td>{t.numberTruck}</td>
                                    <td>{t.driver}</td>
                                    <td>{t.rentState ? 'پرداخت شده' : 'پرداخت نشده'}</td>
                                </tr>
                            )) : null}
                        </tbody>
                    </table>
                ) : (
                    <div className="no-data">
                        <h4><span className='fa fa-warning'></span>برای دریافت اطلاعات بر وری دکمه جستجو کلیک نمایید</h4>
                    </div>
                )}
                {reports.length > 0 ? <Pagination numbers={numbers} page={page} perPage={perPage} setPage={setPage} setPerPage={setPerPage} /> : null}
            </div>

        </>
    )
}

export default Transfers;