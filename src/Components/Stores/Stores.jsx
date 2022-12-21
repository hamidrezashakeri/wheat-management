import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Tooltip from '@mui/material/Tooltip';
import DeleteStore from '../Modals/DeleteStore';
import Modal from '../Modals/Modal';
import NewStore from '../Modals/NewStore';
import UpdateStore from '../Modals/UpdateStore';
import Pagination from '../Pagination/Pagination';
import Preloader from '../Preloader/Preloader';
import { filteredStore, initStore } from '../redux/actions/store';


const Stores = () => {
    const dispatch = useDispatch(null);
    const { stores, numberOfStores } = useSelector(state => state.store);
    const loader = useSelector(state=> state.loader);
    const [id, setId] = useState();
    const [search, setSearch] = useState("");
    const [openStore, setOpenStore] = useState(false);
    const [openDeleteStore, setDeleteStore] = useState(false);
    const [openUpdateStore, setUpdateStore] = useState(false);
    const [openChange, setOpenChange] = useState(false);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);

    const handleSearch = (value) => {
        setSearch(value);
        setPage(1);
    }

    const setDeleteData = id => {
        setId(id);
        setDeleteStore(true);
    }

    const setUpdateData = id => {
        setId(id);
        setUpdateStore(true);
    }

    const setChange = id => {
        setId(id);
        setOpenChange(true);
    }

    useEffect(() => {
        if (search) {
            dispatch(filteredStore(page, perPage, { search }));
        } else {
            dispatch(initStore(page, perPage));
        }
    }, [dispatch, page, perPage, search])
    
    return (
        <React.Fragment>
            {loader ? <Preloader /> : null}
            <div className='stores'>
                <h3 className='main-header'><span className='fa fa-cubes'></span>انبارهای ذخیره سازی</h3>
                <div className="stores-content">
                    <div className="stores-content-header">
                        <div className="stores-content-header-left">
                            <button onClick={() => setOpenStore(!openStore)} className='new-stores'><span className='fa fa-plus'></span>انبار ذخیره سازی جدید</button>
                        </div>
                        <div className='stores-content-header-right'>
                            <input type="text" placeholder='جستجوی انبار...' className='search-stores' onChange={event => handleSearch(event.target.value)} />
                            <span className='fa fa-search'></span>
                        </div>
                    </div>
                    <div className='stores-content-body'>
                        {numberOfStores > 0 ? (
                            <table className='stores-table'>
                                <thead>
                                    <tr>
                                        <th>ردیف</th>
                                        <th>عملیات</th>
                                        <th>مرکز ذخیره سازی</th>
                                        <th>شهرستان</th>
                                        <th>وضعیت</th>
                                        <th>تغییر وضعیت</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {stores.map((s, index) => (
                                        <tr key={s._id}>
                                            <td>{(page - 1) * perPage + (index + 1)}</td>
                                            <td>
                                                <Tooltip title="حذف" arrow>
                                                    <span className='fa fa-trash delete' onClick={() => setDeleteData(s._id)}></span>
                                                </Tooltip>
                                                <Tooltip title="ویرایش" arrow>
                                                    <span className='fa fa-check check' onClick={() => setUpdateData(s._id)}></span>
                                                </Tooltip>
                                            </td>
                                            <td>{s.name}</td>
                                            <td>{s.city}</td>

                                            <td><span className={`status ${s.status === true ? 'active' : 'deactive'}`}>{s.status === true ? 'فعال' : 'غیرفعال'}</span></td>
                                            <td><button className='changed' onClick={() => setChange(s._id)}>تغییر وضعیت</button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className="no-data">
                                <h4><span className='fa fa-warning'></span>شما هیچ مرکز ذخیره سازی ثبت نکرده اید</h4>
                            </div>
                        )}
                    </div>
                    {numberOfStores > 0 ? <Pagination numbers={numberOfStores} page={page} perPage={perPage} setPage={setPage} setPerPage={setPerPage} /> : null}
                </div>
            </div>
            {openStore ? <NewStore flag={openStore} setFlag={setOpenStore} /> : null}
            {openDeleteStore ? <DeleteStore flag={openDeleteStore} setFlag={setDeleteStore} id={id} /> : null}
            {openUpdateStore ? <UpdateStore flag={openUpdateStore} setFlag={setUpdateStore} id={id} /> : null}
            {openChange ? <Modal flag={openChange} setFlag={setOpenChange} id={id} action="store" /> : null}
        </React.Fragment>
    )
}

export default Stores;