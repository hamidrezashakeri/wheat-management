import React from "react";
import { Link } from 'react-router-dom';

const Main = () => {
    return (
        <div className="main">
            <div className="main-content">
                <h3 className="main-header"><span className="fa fa-dashboard"></span>داشبورد</h3>
                <div className="cardBox">
                    <Link to="/stores">
                        <div className="card">
                            <span className="icon fa fa-cubes" style={{ backgroundColor: '#d90429' }}></span>
                            <p className="title" style={{ color: '#d90429' }}>مدیریت انبارهای ذخیره سازی</p>
                        </div>
                    </Link>
                    <Link to="/products">
                        <div className="card">
                            <span className="icon fa fa-industry" style={{ backgroundColor: '#ffb703' }}></span>
                            <p className="title" style={{ color: '#ffb703' }}>مدیریت کالا</p>
                        </div>
                    </Link>
                    <Link to="/payments">
                        <div className="card">
                            <span className="icon fa fa-credit-card" style={{ backgroundColor: '#ee4266' }}></span>
                            <p className="title" style={{ color: '#ee4266' }}>فیش های واریزی</p>
                        </div>
                    </Link>
                    <Link to="buy-directly">
                        <div className="card">
                            <span className="icon fa fa-handshake-o" style={{ backgroundColor: '#4f772d' }}></span>
                            <p className="title" style={{ color: '#4f772d' }}>خرید مستقیم از کشاورز</p>
                        </div>
                    </Link>
                    <Link to="/qouta-sales">
                        <div className="card">
                            <span className="icon fa fa-plus-square" style={{ backgroundColor: '#be0aff' }}></span>
                            <p className="title" style={{ color: '#be0aff' }}>فروش سهمیه ای</p>
                        </div>
                    </Link>
                    <Link to="/transfers">
                        <div className="card">
                            <span className="icon fa fa-truck" style={{ backgroundColor: '#43aa8b' }}></span>
                            <p className="title" style={{ color: '#43aa8b' }}>نقل و انتقالات</p>
                        </div>
                    </Link>
                    <Link to="/reports">
                        <div className="card">
                            <span className="icon fa fa-bar-chart" style={{ backgroundColor: '#16697a' }}></span>
                            <p className="title" style={{ color: '#16697a' }}>گزارشات</p>
                        </div>
                    </Link>

                </div>
            </div>
        </div>
    )
}

export default Main;