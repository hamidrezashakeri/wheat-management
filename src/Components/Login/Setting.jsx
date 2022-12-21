import { isEmpty } from 'lodash';
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SimpleReactValidator from 'simple-react-validator';
import { updatePassword } from '../redux/actions/user';


const Setting = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.user);
    const validator = useRef(new SimpleReactValidator({
        messages: {
            required: 'این فیلد الزامی است.'
        },
        element: message => <span style={{ color: 'red', fontSize: '12px' }}>{message}</span>
    }));
    const [fullname, setFullname] = useState("");
    const [nationalCode, setNationalCode] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [, forceUpdate] = useState(0);
    useEffect(() => {
        setFullname(user.fullname);
        setNationalCode(user.nationalCode);
    }, [user])

    const handleSubmit = () => {
        if (validator.current.allValid()) {
            dispatch(updatePassword({newPassword, oldPassword}, user.userId));
            navigate("/login");

        } else {
            forceUpdate(1);
            validator.current.showMessages()
        }

    }
    return (
        <div className="setting">
            <div className='setting-content'>
                <h3>اطلاعات کاربری</h3>
                <div className="setting-body">
                    <div className="input-group">
                        <label htmlFor="fullname">نام و نام خانوادگی:</label>
                        <input type="text" value={fullname} onChange={event => setFullname(event.target.value)} disabled />
                    </div>
                    <div className="input-group">
                        <label htmlFor="fullname">کد ملی:</label>
                        <input type="text" value={nationalCode} onChange={event => setNationalCode(event.target.value)} disabled />
                    </div>
                    <div className="input-group">
                        <label htmlFor="old-password">کلمه عبور جاری:</label>
                        <input type="password" name='oldPassword' value={oldPassword} onChange={event => setOldPassword(event.target.value)} />
                        {validator.current.message("oldPassword", oldPassword, "required")}
                    </div>
                    <div className="input-group">
                        <label htmlFor="old-password">کلمه عبور جدید:</label>
                        <input type="password" name='newPassword' value={newPassword} onChange={event => setNewPassword(event.target.value)} />
                        {validator.current.message("newPassword", newPassword, "required")}
                    </div>
                    <div className="input-group">
                        <label htmlFor="old-password">تکرار کلمه عبور:</label>
                        <input type="password" name='confirmPassword' value={confirmPassword} onChange={event => setConfirmPassword(event.target.value)} />
                        {validator.current.message("confirmPassword", confirmPassword, `required|in:${newPassword}`, {messages: {in: 'کلمه های عبور یکسان نیستند'}})}

                    </div>
                </div>
                <button onClick={handleSubmit}>ویرایش</button>
            </div>
        </div>
    )
}

export default Setting;