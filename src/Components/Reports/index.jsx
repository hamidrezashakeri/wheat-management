import React from 'react';
import { Link } from 'react-router-dom';

const Index = () => {
    return (
        <div className="cardBox">
            <Link to="/reports/material-balance">
                <div className="card">
                    <span className="icon fa fa-line-chart" style={{ backgroundColor: '#d90429' }}></span>
                    <p className="title" style={{ color: '#d90429' }}>گزارش تراز جنسی</p>
                </div>
            </Link>

            <Link to="/reports/transfers">
                <div className="card">
                    <span className="icon fa fa-truck" style={{ backgroundColor: '#18b201' }}></span>
                    <p className="title" style={{ color: '#18b201' }}>گزارشات حمل و نقل</p>
                </div>
            </Link>

            <Link to="/reports/payments">
                <div className="card">
                    <span className="icon fa fa-credit-card" style={{ backgroundColor: '#ffb703' }}></span>
                    <p className="title" style={{ color: '#ffb703' }}>گزارش فیش های واریزی به تفکیک نوع مصرف</p>
                </div>
            </Link>
        </div>
    )
}

export default Index;