import React from 'react';

const CustomInput = ({labelId, labelText, name, value, setValue = ()=>{}, validator= [], disabled = false})=>{
    return(
       <div className="input-group">
            <label htmlFor={labelId}>{labelText}</label>
            <input type="text" name={name} value={value} onChange={event=>setValue(event.target.value)} disabled={disabled}/>
            {validator}
       </div>
    )
}

export default CustomInput;