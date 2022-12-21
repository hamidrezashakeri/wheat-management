import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Index from '.';
import MaterialBalance from './MaterialBalance';
import Payments from './Payments';
import Reports from './Reports';
import Transfers from './Transfers';


const ReportLayout = ()=>{
    return(
        <Reports>
            <Routes>
                <Route path='' element={<Index />} />
                <Route path='material-balance' element={<MaterialBalance />} />
                <Route path='transfers' element={<Transfers />} />
                <Route path='payments' element={<Payments />} />
            </Routes>
        </Reports>
    )
}

export default ReportLayout;