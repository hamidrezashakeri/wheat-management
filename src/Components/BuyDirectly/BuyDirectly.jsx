import React, { useState, useEffect } from 'react';
import { DateObject } from 'react-multi-date-picker';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { numberWithCommas } from '../../utils/commas';
import Preloader from '../Preloader/Preloader';
import Pagination from '../Pagination/Pagination';
import Tooltip from '@mui/material/Tooltip';
import Modal from '../Modals/Modal';
import { initBuysDirectly } from '../redux/actions/buysDirectly';
import CustomDatePicker from '../shared/DatePicker';
import { convertToJalali } from '../../utils/convertDate';

const BuyDirectly = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [id, setId] = useState(0);
  const [openDelete, setOpenDelete] = useState(false);
  const [openChange, setOpenChange] = useState(false);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [from, setFrom] = useState(new DateObject(Date.now() - 2628000000));
  const [to, setTo] = useState(new DateObject());
  const [weight, setWeight] = useState("");
  const [weightNumber, setWeightNumber] = useState('');
  const [nationalCode, setNationalCode] = useState('');
  const [name, setName] = useState('');
  const [driver, setDriver] = useState('');
  const [numberTruck, setNumberTruck] = useState('');
  const [rentStatus, setRentStatus] = useState('');
  const [search, setSearch] = useState({});
  const buysDirectly = useSelector((state) => state.buysDirectly);
  const loader = useSelector(state => state.loader);
  const handleDelete = (id) => {
    setId(id);
    setOpenDelete(true);
  };

  const handleUpdate = (id) => {
    const buyDirectly = buysDirectly.find((b) => b._id === id);
    navigate(`/buy-directly/update`, { state: buyDirectly });
  };

  const newBuysDirectly = () => {
    navigate('/buy-directly/new');
  };


  const handleSearch = () => {
    const info = {
      from: from.toDate(),
      to: to.toDate(),
      weight: weight,
      weightNumber,
      nationalCode,
      name,
      driver,
      numberTruck,
      rentStatus
    };
    setSearch(info);
    setPage(1);
  };

  const changeStatus = (id) => {
    setId(id);
    setOpenChange(true);
  }

  useEffect(() => {
    if (Object.keys(search).length > 0) {
      dispatch(initBuysDirectly(search, page, perPage))
    }
  }, [dispatch, search, page, perPage]);
  return (
    <React.Fragment>
      {loader ? <Preloader /> : null}
      <div className="buys-dirctly">
        <div className="buys-dirctly-header">
          <h3>
            <span className="icon fa fa-handshake-o"></span>خرید مستقیم از
            کشاورز
          </h3>
          <button onClick={newBuysDirectly}>
            <span className="fa fa-plus"></span>خرید جدید
          </button>
        </div>
        <div className="buys-dirctly-content">
          <div className="buys-dirctly-content-header">
            <h4>
              <span className="icon fa fa-list"></span>مدیریت خریدها
            </h4>
          </div>
          <div className="buys-dirctly-content-body">
            <div className="buys-dirctly-input">
              <label htmlFor="from">از تاریخ:</label>
              <CustomDatePicker date={from} onChange={setFrom} />
            </div>
            <div className="buys-dirctly-input">
              <label htmlFor="to">تا تاریخ:</label>
              <CustomDatePicker date={to} onChange={setTo} />
            </div>
            <div className="buys-dirctly-input">
              <label htmlFor="weight">وزن کل:</label>
              <input
                type="text"
                id="weight"
                onChange={(event) => setWeight(event.target.value)}
              />
            </div>
            <div className="buys-dirctly-input">
              <label htmlFor="weight-number">شماره توزین:</label>
              <input
                type="text"
                id="weight-number"
                onChange={(event) => setWeightNumber(event.target.value)}
              />
            </div>
            <div className="buys-dirctly-input">
              <label htmlFor="national-code">کد ملی کشاورز:</label>
              <input
                type="text"
                id="national-code"
                onChange={(event) => setNationalCode(event.target.value)}
              />
            </div>
            <div className="buys-dirctly-input">
              <label htmlFor="name">نام کشاورز:</label>
              <input
                type="text"
                id="name"
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div className="buys-dirctly-input">
              <label htmlFor="driver">راننده:</label>
              <input
                type="text"
                id="driver"
                onChange={(event) => setDriver(event.target.value)}
              />
            </div>
            <div className="buys-dirctly-input">
              <label htmlFor="number-truck">شماره پلاک:</label>
              <input
                type="text"
                id="bank"
                onChange={(event) => setNumberTruck(event.target.value)}
              />
            </div>
            <div className="buys-dirctly-input">
              <label htmlFor="status">وضعیت کرایه:</label>
              <select name="status" id="status" onChange={event => setRentStatus(event.target.value)}>
                <option value="">...</option>
                <option value={true}>پرداخت شده</option>
                <option value={false}>پرداخت نشده</option>
              </select>
            </div>
            <div className="buys-dirctly-input">
              <button className="search" onClick={handleSearch}>
                جستجو...
              </button>
            </div>
          </div>
        </div>
        <div className="buys-dirctly-list">
          <h4>
            <span className="fa fa-table"></span>فهرست خریدها
          </h4>
          {buysDirectly.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>عملیات</th>
                  <th>تاریخ خرید</th>
                  <th>وزن کل</th>
                  <th>شماره توزین</th>
                  <th>کد ملی کشاورز</th>
                  <th>نام کشاورز</th>
                  <th>شماره پلاک</th>
                  <th>نام راننده</th>
                  <th>مبلغ کرایه</th>
                  <th>وضعیت کرایه</th>
                </tr>
              </thead>
              <tbody>
                {buysDirectly.map((b, index) => (
                  <tr key={b._id}>
                    <td>{index + 1}</td>
                    <td>
                      <Tooltip title="حذف">
                        <span
                          className="icon fa fa-trash"
                          style={{ color: 'red' }}
                          onClick={() => handleDelete(b._id)}
                        ></span>
                      </Tooltip>
                      <Tooltip title="ویرایش">
                        <span
                          className="icon fa fa-check"
                          style={{ color: 'green' }}
                          onClick={() => handleUpdate(b._id)}
                        ></span>
                      </Tooltip>
                    </td>
                    <td>
                      {convertToJalali(b.date)}
                    </td>
                    <td>{numberWithCommas(b.weight)}</td>
                    <td>{b.weightNumber}</td>
                    <td>{b.nationalCode}</td>
                    <td>{b.name}</td>
                    <td>{b.numberTruck}</td>
                    <td>{b.driver}</td>
                    <td>{numberWithCommas((b.rentRate * b.weight) / 1000)}</td>
                    <td>
                      {b.rentStatus ? (
                        'پرداخت شده'
                      ) : (
                        <button className="rent" onClick={() => changeStatus(b._id)}>پرداخت</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="no-data">
              <h4>
                <span className="fa fa-warning"></span>شما در این بازه زمانی
                هیچ خریدی انجام نداده اید
              </h4>
            </div>
          )}
          {buysDirectly.length > 0 ? (
            <Pagination
              numbers={buysDirectly.length}
              page={page}
              perPage={perPage}
              setPage={setPage}
              setPerPage={setPerPage}
            />
          ) : null}
        </div>
      </div>
      {openDelete ? (
        <Modal
          flag={openDelete}
          setFlag={setOpenDelete}
          id={id}
          action="delete-buy"
        />
      ) : null}
      {openChange ? <Modal flag={openChange} setFlag={setOpenChange} id={id} action="change-status" /> : null}
    </React.Fragment>
  );
};

export default BuyDirectly;
