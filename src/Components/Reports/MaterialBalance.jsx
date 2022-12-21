import React, { useState } from 'react';
import _ from 'lodash';
import DateObject from 'react-date-object';
import { useDispatch, useSelector } from 'react-redux';
import { initMaterialBalnce } from '../redux/actions/materialBalance';
import CustomDatePicker from '../shared/DatePicker';

const MaterialBalance = () => {
  const materialBalance = useSelector(state => state.materialBalance);
  console.log(materialBalance);
  const dispatch = useDispatch();
  const [from, setFrom] = useState(new DateObject(Date.now() - 2628000000))
  const [to, setTo] = useState(new DateObject());
  const handleSubmit = () => {
    console.log('true');
    const info = { from: from.toDate(), to: to.toDate() };
    dispatch(initMaterialBalnce(info));
  }
  return (
    <div className="material-balance">
      <div className="filter">
        <div className="input-group">
          <label htmlFor="from">از تاریخ: </label>
          <CustomDatePicker date={from} onChange={setFrom} />
        </div>
        <div className="input-group">
          <label htmlFor="to">تا تاریخ: </label>
          <CustomDatePicker date={to} onChange={setTo} />
        </div>
      </div>
      <div className="input-group">
        <button className='search' onClick={handleSubmit}>جستجو...</button>
      </div>
      <div className="content-report">
        {Object.keys(materialBalance).length > 0 ? (
          <>
            <table>
              <thead>
                <tr>
                  <th style={{ width: '10%' }}>ردیف</th>
                  <th>انبار فرستنده</th>
                  <th>وزن مبدا</th>
                  <th>وزن مقصد</th>
                  <th>اختلاف وزن</th>
                </tr>
              </thead>
              <tbody>
                {materialBalance.weightBuysDirect.length > 0 ? (
                  <tr>
                    <td>1</td>
                    <td>  مسقیم از کشاورز</td>
                    <td><input type="text" value={materialBalance.weightBuysDirect[0].total} readOnly /></td>
                    <td><input type="text" value="-" readOnly /></td>
                    <td>0</td>
                  </tr>
                ) : null}
                {materialBalance.transferWeight.length > 0 ?
                  _.orderBy(materialBalance.transferWeight, '_id.name', 'asc').map((t, index) => (
                    <tr key={t._id._id}>
                      <td>{materialBalance.weightBuysDirect.length> 0 ? index + 2: index+1}</td>
                      <td>{t._id.name}</td>
                      <td><input type="text" value={t.totalSource} readOnly /></td>
                      <td><input type="text" value={t.totalDest} readOnly /></td>
                      <td>{t.totalDest - t.totalSource}</td>
                    </tr>
                  ))
                  : null}
              </tbody>
            </table>
            <hr />
            <br />
            <table>
              <thead>
                <tr>
                  <th style={{ width: '10%' }}>ردیف</th>
                  <th>انبار فرستنده</th>
                  <th>نوع گندم</th>
                  <th>وزن مبدا</th>
                  <th>وزن مقصد</th>
                  <th>اختلاف وزن</th>
                </tr>
              </thead>
              <tbody>
                {materialBalance.transfersQoutaSaleWeight.length > 0 ?
                  _.orderBy(materialBalance.transfersQoutaSaleWeight, "_id.store.name", 'asc').map((t, index) => (
                    <tr key={t._id._id}>
                      <td>{index + 1}</td>
                      <td>{t._id.store.name}</td>
                      <td>{t._id.type.nameProduct}</td>
                      <td><input type="text" value={t.totalSource} readOnly /></td>
                      <td><input type="text" value={t.totalDest} readOnly /></td>
                      <td>{t.totalDest - t.totalSource}</td>
                    </tr>
                  ))
                  : null}
              </tbody>
            </table>
            <hr />
          </>
        ) : (
          <div className="no-data">
            <h4><span className='fa fa-warning'></span>برای دریافت اطلاعات بر وری دکمه جستجو کلیک نمایید</h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default MaterialBalance;
