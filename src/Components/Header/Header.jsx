import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import logo from './logo.png';

const Header = () => {
    const [flag, setFlag] = useState(false);
    const user = useSelector(state => state.user);
    const navigate = useNavigate();
    const toggleSidebar = () => {
        const sidebar = document.getElementsByClassName('sidebar')[0];
        const dashboard = document.getElementsByClassName('dashboard')[0];
        setFlag(!flag);
        if (flag) {
            sidebar.style.width = "80px";
            dashboard.style.right = "80px";
            dashboard.style.width = "calc(100% - 80px)";
        } else {
            sidebar.style.width = "300px";
            dashboard.style.right = "300px";
            dashboard.style.width = "calc(100% - 300px)";
        }
    }
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate('/login');
    }

    return (
        /*  header */
        <div className="header">
            {/* right header */}
            <div className="right-header">
                <Link to='/'>
                    <div className="logo">
                        <img src={logo} alt="لوگوی شرکت" />
                        <span>شرکت تولیدی آرد مریانج کار</span>
                    </div>
                </Link>
                <div className='bars'>
                    <span className='fa fa-bars' onClick={toggleSidebar}></span>
                </div>
            </div>
            {/* end right header */}

            {/* left header */}
            <div className="left-header">
                <div className='account-setting'>
                    <span className='fa fa-cogs icon'></span>
                    <Link to="/setting-user" style={{ color: '#fff' }}><span className='title'>تنظیمات حساب کاربری</span></Link>
                </div>
                <div className="user">
                    <span className='fa fa-user icon'></span>
                    <span className='title'>{`${user.fullname}`}</span>
                </div>
                <div className="logout">
                    <span className='fa fa-power-off icon' onClick={handleLogout}></span>
                </div>
            </div>
            {/* end left header */}
        </div>
        /* end header  */
    )
}

export default Header;