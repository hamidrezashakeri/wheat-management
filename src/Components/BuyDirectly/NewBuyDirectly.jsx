import React, { useState, useRef } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import { useDispatch } from 'react-redux';
import DateObject from 'react-date-object';
import { newBuyDirectly } from '../redux/actions/buysDirectly';
import CustomDatePicker from '../shared/DatePicker';

const NewBuyDirectly = () => {
  const validator = useRef(new SimpleReactValidator({
    messages: {
      required: 'این فیلد الزامی است.',
      numeric: 'مقدار عددی وارد کنید',
    },
    element: message => <span style={{ color: 'red', fontSize: '12px', position: 'absolute', top: '50px', right: '126px' }}>{message}</span>
  }));
  const dispatch = useDispatch();
  const [date, setDate] = useState(new DateObject());
  const [weight, setWeight] = useState(0);
  const [weightNumber, setWeightNumber] = useState('');
  const [nationalCode, setNationalCode] = useState('');
  const [name, setName] = useState('');
  const [driver, setDriver] = useState('');
  const [number1, setNumber1] = useState('');
  const [number2, setNumber2] = useState('');
  const [number3, setNumber3] = useState('');
  const [alphabet, setAlphabet] = useState('ع');
  const [rentRate, setRentRate] = useState(0);
  const [, forceUpdate] = useState(0);
  const reset = () => {
    setWeight(0);
    setWeightNumber("");
    setName("");
    setDriver("");
    setNationalCode("");
    setRentRate(0);
    setNumber1("");
    setAlphabet("ع");
    setNumber2("");
    setNumber3("");
  }
  const handleSubmit = () => {
    const info = {
      date: date.toDate(),
      weight,
      weightNumber,
      nationalCode,
      name,
      driver,
      rentRate,
      numberTruck: `${number1} ${alphabet} ${number2}-${number3}`,
    };
    if (validator.current.allValid()) {
      dispatch(newBuyDirectly(info));
      reset();
    }else{
      validator.current.showMessages();
      forceUpdate(1);
    }
  };

  return (
    <div className="transfer">
      <div className="transfer-content">
        <h3 className="transfer-header">خرید مستقیم از کشاورز</h3>
        <div className="transfer-body">
          <div className="input-group">
            <label htmlFor="date">تاریخ خرید:</label>
            <CustomDatePicker date={date} onChange={setDate} />
          </div>
          <div className="input-group">
            <label htmlFor="weight">وزن کل:</label>
            <input
              type="text"
              name='weight'
              value={weight}
              onChange={(event) => setWeight(event.target.value)}
            />
            {validator.current.message("weight", weight, "required|numeric:min:0,num")}
          </div>
          <div className="input-group">
            <label htmlFor="national-code">نام کشاورز:</label>
            <input
              type="text"
              name='name'
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            {validator.current.message("name", name, "required")}
          </div>
          <div className="input-group">
            <label htmlFor="national-code">کد ملی کشاورز: </label>
            <input
              type="text"
              name='nationalCode'
              value={nationalCode}
              onChange={(event) => setNationalCode(event.target.value)}
            />
            {validator.current.message("nationalCode", nationalCode, "required|numeric:min:0,num")}
          </div>
          <div className="input-group">
            <p>شماره وسیله نقلیه:</p>
            <div className="number-truck" style={{ direction: 'ltr' }}>
              <input
                type="text"
                name='number1'
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
                name='number2'
                style={{ width: '150px', height: '50px' }}
                maxLength="3"
                value={number2}
                onChange={(event) => setNumber2(event.target.value)}
              />
              <span style={{marginLeft: '10px'}}>ایران</span>
              <input
                type="text"
                name='number3'
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
            {validator.current.message("number1", number1, "required|numeric|min:2",{messages: {min: 'فرمت پلاک نامعتبر است.'}})||
             validator.current.message("alphabet", alphabet, "required")||
             validator.current.message("number2", number2, "required|numeric|min:3",{messages: {min: 'فرمت پلاک نامعتبر است.'}})||
             validator.current.message("number3", number3, "required|numeric|min:2",{messages: {min: 'فرمت پلاک نامعتبر است.'}})
            }
            
          </div>
          <div className="input-group">
            <label htmlFor="national-code">نام راننده:</label>
            <input
              type="text"
              name='driver'
              value={driver}
              onChange={(event) => setDriver(event.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="weight-number">شماره توزین:</label>
            <input
              type="text"
              name='weightNumber'
              value={weightNumber}
              onChange={(event) => setWeightNumber(event.target.value)}
            />
            {validator.current.message("weightNumber", weightNumber, "required|numeric:min:0,num")}
          </div>
          <div className="input-group">
            <label htmlFor="national-code">نرخ کرایه(تن/ریال):</label>
            <input
              type="text"
              name='rentRate'
              value={rentRate}
              onChange={(event) => setRentRate(event.target.value)}
            />
            {validator.current.message("rentRate", rentRate, "required|numeric:min:0,num")}
          </div>
        </div>
        <button className="submit" onClick={handleSubmit}>
          ثبت
        </button>
      </div>
    </div>
  );
};

export default NewBuyDirectly;
