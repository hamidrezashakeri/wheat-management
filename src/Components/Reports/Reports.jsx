import React from 'react';

const Reports = ({children}) => {
    return (
        <div className="reports">
            <div className="reports-header">
                <h3><span className='fa fa-bar-chart'></span>گزارشات</h3>
            </div>
            <div className="reports-content">
                {children}
            </div>
        </div>
    )
}

export default Reports;