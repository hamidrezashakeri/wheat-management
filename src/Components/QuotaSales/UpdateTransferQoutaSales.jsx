import React, { useEffect, useState, useRef } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import DateObject from 'react-date-object';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateSingleTransferQoutaSale } from '../redux/actions/transferQoutaSale';
import CustomDatePicker from '../shared/DatePicker';

const UpdateTransferQoutaSales = () => {
  const validator = useRef(
    new SimpleReactValidator({
      messages: {
        required: 'این فیلد الزامی است.',
        numeric: 'مقدار عددی وارد کنید',
      },
      element: (message) => (
        <span
          style={{
            color: 'red',
            fontSize: '12px',
            position: 'absolute',
            top: '50px',
            right: '126px',
          }}
        >
          {message}
        </span>
      ),
    })
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const qoutaSales = useSelector((state) => state.qoutaSales);
  const { state } = useLocation();
  const [date, setDate] = useState(new DateObject());
  const [sourceWeight, setSourceWeight] = useState('');
  const [destinationWeight, setDestinationWeight] = useState('');
  const [weightNumber, setWeightNumber] = useState('');
  const [driver, setDriver] = useState('');
  const [number1, setNumber1] = useState('');
  const [alphabet, setAlphabet] = useState('');
  const [number2, setNumber2] = useState('');
  const [number3, setNumber3] = useState('');
  const [, forceUpdate] = useState(0);
  const handleSubmit = () => {
    const info = {
      id: state.transfer._id,
      date: isNaN(+date) ? date : date.toDate(),
      sourceWeight,
      destinationWeight,
      weightNumber,
      driver,
      numberTruck: `${number1} ${alphabet} ${number2}-${number3}`,
    };
    const qoutaSale = qoutaSales.find(
      (q) => q._id === state.transfer.qoutaSale._id
    );
    if (validator.current.allValid()) {
      dispatch(
        updateSingleTransferQoutaSale(info, state.transfer.qoutaSale._id)
      );
      navigate(
        `/qouta-sales/transfers-detail/${state.transfer.qoutaSale._id}`,
        {
          state: qoutaSale,
        }
      );
    } else {
      validator.current.showMessages();
      forceUpdate(1);
    }
  };

  useEffect(() => {
    setDate(state.transfer.date);
    setSourceWeight(state.transfer.sourceWeight);
    setDestinationWeight(state.transfer.destinationWeight);
    setWeightNumber(state.transfer.weightNumber);
    setDriver(state.transfer.driver);
    setNumber1(state.transfer.numberTruck.substr(0, 2));
    setAlphabet(state.transfer.numberTruck.substr(3, 1));
    setNumber2(state.transfer.numberTruck.substr(5, 3));
    setNumber3(state.transfer.numberTruck.substr(9, 2));
  }, [state]);

  return (
    <div className="transfer">
      {state && (
        <div className="transfer-content">
          <h3 className="transfer-header">ویرایش محموله</h3>
          <div className="transfer-body">
            <div className="input-group">
              <label htmlFor="date">تاریخ ورود:</label>
              <CustomDatePicker date={date} onChange={setDate} />
            </div>
            <div className="input-group">
              <p>
                شماره مجوز: <span>{state.transfer.license}</span>
              </p>
            </div>
            <div className="input-group">
              <p>
                انبار مبدا: <span>{state.transfer.store.name}</span>
              </p>
            </div>
            <div className="input-group">
              <p>
                نوع گندم: <span>{state.type.nameProduct}</span>
              </p>
            </div>
            <div className="input-group">
              <label htmlFor="source-weight">وزن مبدا:</label>
              <input
                type="text"
                name="src"
                value={sourceWeight}
                onChange={(event) => setSourceWeight(event.target.value)}
              />
              {validator.current.message(
                'src',
                sourceWeight,
                'required|numeric:min:0,num'
              )}
            </div>
            <div className="input-group">
              <label htmlFor="destination-weight">وزن مقصد:</label>
              <input
                type="text"
                name="dest"
                value={destinationWeight}
                onChange={(event) => setDestinationWeight(event.target.value)}
              />
              {validator.current.message(
                'dest',
                destinationWeight,
                'required|numeric:min:0,num'
              )}
            </div>
            <div className="input-group">
              <label htmlFor="weight-number">شماره توزین:</label>
              <input
                type="text"
                name="wieghtNumber"
                value={weightNumber}
                onChange={(event) => setWeightNumber(event.target.value)}
              />
              {validator.current.message(
                'weightNumber',
                weightNumber,
                'required|numeric:min:0,num'
              )}
            </div>
            <div className="input-group">
              <label htmlFor="driver">نام راننده:</label>
              <input
                type="text"
                value={driver}
                onChange={(event) => setDriver(event.target.value)}
              />
            </div>
            <div className="input-group">
              <p>شماره وسیله نقلیه:</p>
              <div className="number-truck" style={{ direction: 'ltr' }}>
                <input
                  type="text"
                  name="number1"
                  style={{ width: '50px', height: '50px' }}
                  maxLength="2"
                  value={number1}
                  onChange={(event) => setNumber1(event.target.value)}
                />
                <select
                  name="alphabet"
                  id="alphabet"
                  style={{ width: '52px', height: '50px' }}
                  value={alphabet}
                  onChange={(event) => setAlphabet(event.target.value)}
                >
                  <option value="ع">ع</option>
                  <option value="الف">الف</option>
                  <option value="ب">ب</option>
                  <option value="پ">پ</option>
                  <option value="ت">ت</option>
                  <option value="ث">ث</option>
                  <option value="ج">ج</option>
                  <option value="ج">ج</option>
                  <option value="ح">ح</option>
                  <option value="خ">خ</option>
                  <option value="د">د</option>
                  <option value="ذ">ذ</option>
                  <option value="ر">ر</option>
                  <option value="ز">ز</option>
                  <option value="ژ">ژ</option>
                  <option value="س">س</option>
                  <option value="ش">ش</option>
                  <option value="ص">ص</option>
                  <option value="ض">ض</option>
                  <option value="ط">ط</option>
                  <option value="ظ">ظ</option>
                  <option value="غ">غ</option>
                  <option value="ف">ف</option>
                  <option value="ق">ق</option>
                  <option value="ک">ک</option>
                  <option value="گ">گ</option>
                  <option value="ل">ل</option>
                  <option value="م">م</option>
                  <option value="ن">ن</option>
                  <option value="و">و</option>
                  <option value="ه">ه</option>
                  <option value="ی">ی</option>
                </select>
                <input
                  type="text"
                  name="number2"
                  style={{ width: '150px', height: '50px' }}
                  maxLength="3"
                  value={number2}
                  onChange={(event) => setNumber2(event.target.value)}
                />
                <span style={{ marginLeft: '10px' }}>ایران</span>
                <input
                  type="text"
                  name="number3"
                  style={{
                    width: '50px',
                    height: '30px',
                    marginLeft: '8px',
                    marginTop: '15px',
                  }}
                  maxLength="2"
                  value={number3}
                  onChange={(event) => setNumber3(event.target.value)}
                />
              </div>
              {validator.current.message(
                'number1',
                number1,
                'required|numeric|min:2',
                { messages: { min: 'فرمت پلاک نامعتبر است.' } }
              ) ||
                validator.current.message('alphabet', alphabet, 'required') ||
                validator.current.message(
                  'number2',
                  number2,
                  'required|numeric|min:3',
                  { messages: { min: 'فرمت پلاک نامعتبر است.' } }
                ) ||
                validator.current.message(
                  'number3',
                  number3,
                  'required|numeric|min:2',
                  { messages: { min: 'فرمت پلاک نامعتبر است.' } }
                )}
            </div>
          </div>
          <button className="submit" onClick={handleSubmit}>
            ثبت
          </button>
        </div>
      )}
    </div>
  );
};

export default UpdateTransferQoutaSales;
