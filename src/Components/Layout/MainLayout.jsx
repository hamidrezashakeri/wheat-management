import React, { useEffect } from 'react';
import jwt from 'jwt-decode';
import { Routes, Route , useNavigate, Navigate } from 'react-router-dom';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import Dashboard from '../Dashboard/Dashborad';
import Main from '../Main/Main';
import Stores from '../Stores/Stores';
import Products from '../Products/Products';
import Payments from '../Payments/Payments';
import NewPayments from '../Payments/NewPayments';
import NewQuotaSales from '../QuotaSales/NewQuotaSales';
import QoutaSales from '../QuotaSales/QoutaSales';
import TransferQoutaSales from '../QuotaSales/TransferQoutaSales';
import TransferDetails from '../QuotaSales/TransferDetails';
import TransferDetailPDF from '../PDF/TransferDetailPDF';
import SingleQoutaSale from '../QuotaSales/SingleQoutaSale';
import UpdateTransferQoutaSales from '../QuotaSales/UpdateTransferQoutaSales';
import UpdatePayment from '../Payments/UpdatePayments';
import BuyDirectly from '../BuyDirectly/BuyDirectly';
import NewBuyDirectly from '../BuyDirectly/NewBuyDirectly';
import UpdateBuyDirectly from '../BuyDirectly/UpdateBuyDirectly';
import Transfers from '../Transfers/Transfers';
import NewTransfer from '../Transfers/NewTransfer';
import NewTransferDetails from '../Transfers/NewTransferDetails';
import TransfersDetail from '../Transfers/TransfersDetail';
import UpdateTransferDetail from '../Transfers/UpdateTransferDetail';
import UpdateTransfer from '../Transfers/UpdateTransfer';
import { addUser, clearUser } from '../redux/actions/user';
import { useDispatch } from 'react-redux';
import Setting from '../Login/Setting';
import UpdateQoutaSale from '../QuotaSales/UpdateQoutaSale';
import ReportLayout from '../Reports/ReportLayout';


const MainLayout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(()=>{
        const token = localStorage.getItem("token");
        if(token){
            const decodedToken = jwt(token);
            const date = new Date();
            if(decodedToken.exp * 1000 < date.getTime()){
                localStorage.removeItem("token");
                dispatch(clearUser());
                navigate('/login');
            }else{
                dispatch(addUser(decodedToken.user));
            }
        }else{
            navigate("/login");
        }
    },[dispatch,navigate])

    useEffect(()=>{
       document.onscroll = ()=>{
        if(document.documentElement.scrollTop > 10){
            document.getElementsByClassName('sidebar')[0].style.top = '0px'
        }else{
            document.getElementsByClassName('sidebar')[0].style.top = '78px'
        }
       }
    },[])
    return (
        <div className='container'>
            <Header />
            <Sidebar />
            <Dashboard>
                <Routes>
                    <Route path='/' element={<Main />} />
                    <Route path='/stores' element={<Stores />} />
                    <Route path='/products' element={<Products />} />
                    {/* <Route path="/payments" element={<Payments />} /> */}
                    <Route path='/payments'>
                        <Route index element={<Payments />} />
                        <Route path='new' element={<NewPayments />} />
                        <Route path='update' element={<UpdatePayment />} />
                    </Route>
                    <Route path='/qouta-sales'>
                        <Route index element={<QoutaSales />} />
                        <Route path=':id' element={<SingleQoutaSale />} />
                        <Route path='new/:id' element={<NewQuotaSales />} />
                        <Route path='update/:id' element={<UpdateQoutaSale />} />
                        <Route path='transfer/:id' element={<TransferQoutaSales />} />
                        <Route path='transfers-detail/:id' element={<TransferDetails />} />
                        <Route path="transfers-detail-pdf" element={<TransferDetailPDF />} />
                        <Route path='update-transfer/:id' element={<UpdateTransferQoutaSales />} />
                    </Route>
                    <Route path='/buy-directly'>
                        <Route index element={<BuyDirectly />} />
                        <Route path='new' element={<NewBuyDirectly />} />
                        <Route path='update' element={<UpdateBuyDirectly />} />
                    </Route>
                    <Route path='/transfers'>
                        <Route index element={<Transfers />} />
                        <Route path='new' element={<NewTransfer />} />
                        <Route path="new-record" element={<NewTransferDetails />} />
                        <Route path='detail' element={<TransfersDetail />} />
                        <Route path="update" element={<UpdateTransfer />} />
                        <Route path='update-record' element={<UpdateTransferDetail />} />
                    </Route>
                    <Route path="/setting-user" element={<Setting />} />
                    <Route path='/reports/*' element={<ReportLayout />} />
                    <Route path='*' element={<Navigate to="/login" replace/> } />
                </Routes>
            </Dashboard>
        </div>
    )
}

export default MainLayout;