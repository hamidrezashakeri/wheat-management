import React, {useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { qoutaSaleByPaymentId } from '../../services/qoutaSalesService';
import { convertToJalali } from '../../utils/convertDate';


const SingleQoutaSale = () => {
    const id = useParams().id;
    const navigate = useNavigate();
    const [getQoutaSale, setQoutaSale] = useState({});
    const [status, setStatus] = useState("idle");
    const handleNewRecord = (id) => {
        const qoutaSale = getQoutaSale.find(q=> q._id === id)
        navigate(`/qouta-sales/transfer/${id}`, {state: qoutaSale});
    }
    const handleTransfersDetail = (id) => {
        const qoutaSale = getQoutaSale.find(q=> q._id === id)
        navigate(`/qouta-sales/transfers-detail/${id}`, {state: qoutaSale});
    }
    useEffect(() => {
        setStatus("pending");
        const setInfo = async () => {
            try {
                const { data, status } = await qoutaSaleByPaymentId(id);
                if (status === 200) {
                    setQoutaSale(data.qoutaSales);
                    setStatus("resolved")
                }
            } catch (err) {
                setStatus("rejected")
            }
        }
        setInfo();
    }, [id])
    if (status === 'resolved') {
        return (
            <div className='qouta-sales'>
                <div className='qouta-sales-content'>
                    <h3 className='qouta-sales-header'>فروش سهمیه ای</h3>
                    {getQoutaSale.length > 0 ? (
                        <table className='qouta-sales-table'>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>عملیات</th>
                                    <th>تاریخ صدور مجوز</th>
                                    <th>شماره مجوز</th>
                                    <th>نوع گندم</th>
                                    <th>انبار مبدا</th>
                                    <th>وزن کل</th>
                                    <th>وضعیت کرایه</th>
                                    <th>وزن تحویل شده</th>
                                    <th>وزن باقی مانده</th>
                                    <th>وضعیت</th>
                                </tr>
                            </thead>
                            <tbody>
                                {getQoutaSale.map((q, index) => (
                                    <tr key={q._id}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <span className='fa fa-trash delete'></span>
                                            <span className='fa fa-check check'></span>
                                            <span className='fa fa-arrow-circle-right next' onClick={() => handleNewRecord(q._id)}></span>
                                            <span className='fa fa-table detail' onClick={() => handleTransfersDetail(q._id)}></span>
                                        </td>
                                        <td>{convertToJalali(q.date)}</td>
                                        <td>{q.number}</td>
                                        <td>{q.type.nameProduct}</td>
                                        <td>{q.store.name}</td>
                                        <td>{q.weight}</td>
                                        <td>{q.rentPrice === '' ? 'پرداخت نشود' : q.rentPrice}</td>
                                        <td>{q.issued}</td>
                                        <td>{q.weight - q.issued}</td>
                                        {q.weight - q.issued > 0 ? <td><span className='pending'>در حال بارگیری</span></td> : <td><span className='delivered'>تحویل شده</span></td>}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="no-data">
                            <h4><span className='fa fa-warning'></span>مجوزی وجود ندارد...</h4>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

export default SingleQoutaSale;