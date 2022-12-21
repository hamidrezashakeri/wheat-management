import React, { useState } from 'react';
import _ from 'lodash';
import DateObject from 'react-date-object';
import { useDispatch, useSelector } from 'react-redux';
import { initPaymentsReport } from '../redux/actions/paymentsReport';
import { numberWithCommas } from '../../utils/commas';
import Preloader from '../Preloader/Preloader';
import CustomDatePicker from '../shared/DatePicker';

const Payments = () => {
  const dispatch = useDispatch();
  const paymentsReport = useSelector((state) => state.paymentsReport);
  const [from, setFrom] = useState(new DateObject(Date.now() - 2628000000));
  const [to, setTo] = useState(new DateObject());
  const loader = useSelector((state) => state.loader);
  const handleSubmit = () => {
    const info = { from: from.toDate(), to: to.toDate() };
    dispatch(initPaymentsReport(info));
  };
  return (
    <div className="material-balance">
      {loader ? <Preloader /> : null}
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
        <button onClick={handleSubmit}>جستجو...</button>
      </div>
      <div className="content-report">
        <table>
          <thead>
            <tr>
              <th style={{ width: '10%' }}>ردیف</th>
              <th>نوع گندم</th>
              <th>مبلغ واحد کالا</th>
              <th>وزن خریداری شده</th>
              <th>مبلغ ریالی</th>
              <th>مجموع مجوزهای صادر شده</th>
              <th>وزن باقی مانده</th>
            </tr>
          </thead>
          <tbody>
            {paymentsReport.length > 0
              ? _.orderBy(paymentsReport, '_id.nameProduct', 'desc').map((p, index) => (
                  <tr key={p._id._id}>
                    <td>{index + 1}</td>
                    <td>{p._id.nameProduct}</td>
                    <td>{numberWithCommas(Number(p._id.priceProduct))}</td>
                    <td>
                      <input
                        type="text"
                        value={numberWithCommas(p.totalAmount)}
                        readOnly
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={numberWithCommas(
                          Number(p._id.priceProduct) * p.totalAmount
                        )}
                        readOnly
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={numberWithCommas(p.totalIssued)}
                        readOnly
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={numberWithCommas(p.totalAmount - p.totalIssued)}
                        readOnly
                      />
                    </td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
        <hr />
      </div>
    </div>
  );
};

export default Payments;
