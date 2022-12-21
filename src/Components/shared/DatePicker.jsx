import React from 'react';
import DatePicker, { DateObject } from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import InputIcon from 'react-multi-date-picker/components/input_icon';
import 'react-multi-date-picker/styles/colors/red.css';

const CustomDatePicker = ({date, onChange})=>{
    return(
        <DatePicker
                className="red"
                value={date}
                render={<InputIcon />}
                locale={persian_fa}
                calendar={persian}
                onChange={onChange}
              />
    )
}

export default CustomDatePicker;
