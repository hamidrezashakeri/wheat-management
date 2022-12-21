import React from "react";
import { Link } from 'react-router-dom';

const Sidebar = ()=>{
    return(
        <div className="sidebar">
           <Link to="/">
                <span className="icon fa fa-home"></span>
                <span className="title">صفحه اصلی</span>
           </Link>
           <Link to="/stores">
                <span className="icon fa fa-cubes"></span>
                <span className="title">مدیریت انبارهای ذخیره سازی</span>
           </Link>
           <Link to="/products">
                <span className="icon fa fa-industry"></span>
                <span className="title">مدیریت محصولات</span>
           </Link>
           <Link to="/payments">
                <span className="icon fa fa-credit-card"></span>
                <span className="title">فیش های واریزی</span>
           </Link>
           <Link to="/buy-directly">
                <span className="icon fa fa-handshake-o"></span>
                <span className="title">خرید مستقیم از کشاورز</span>
           </Link>
           <Link to="/qouta-sales">
                <span className="icon fa fa-plus-square"></span>
                <span className="title">فروش سهمیه ای</span>
           </Link>
           <Link to="/transfers">
                <span className="icon fa fa-truck"></span>
                <span className="title">نقل و انتقالات (کمیسیون)</span>
           </Link>
           <Link to="/reports">
                <span className="icon fa fa-bar-chart"></span>
                <span className="title">گزارشات</span>
           </Link>
        </div>
    )
}

export default Sidebar;