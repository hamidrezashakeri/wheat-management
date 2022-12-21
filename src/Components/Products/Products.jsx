import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DeleteProduct from '../Modals/DeleteProduct';
import NewProduct from '../Modals/NewProduct';
import UpdateProduct from '../Modals/UpdateProduct';
import Pagination from '../Pagination/Pagination';
import Preloader from '../Preloader/Preloader';
import { filteredProducts, initProduct } from '../redux/actions/product';
import img from './1.jpg';

const Products = () => {
    const dispatch = useDispatch(null);
    const [id, setId] = useState();
    const [openNewProduct, setOpenProduct] = useState(false);
    const [openDeleteProduct, setOpenDeleteProduct] = useState(false);
    const [openUpdateProduct, setOpenUpdateProduct] = useState(false);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const {products, numberOfProducts} = useSelector(state => state.product);
    const loader = useSelector(state=> state.loader);

    const handleSearch = (value)=>{
        setSearch(value)
        setPage(1);
    }

    const setDeleteData = (id) => {
        setId(id);
        setOpenDeleteProduct(true);
    }

    const setUpdateData = (id)=>{
        setId(id);
        setOpenUpdateProduct(true);
    }

    useEffect(()=>{
        if(search){
            dispatch(filteredProducts(page, perPage, {search}));
        }else{
            dispatch(initProduct(page, perPage));
        }
    },[dispatch, page, perPage, search])

    return (
        <React.Fragment>
            {loader ? <Preloader />: null}
            <div className='products'>
                <h3 className='main-header'><span className='fa fa-industry'></span>مدیریت محصولات</h3>
                <div className="products-content">
                    <div className="products-content-header">
                        <div className="products-content-header-left">
                            <button className='new-product' onClick={setOpenProduct}><span className='fa fa-plus'></span>تعریف محصول جدید</button>
                        </div>
                        <div className='products-content-header-right'>
                            <input type="text" placeholder='جستجوی محصول...' className='search-products' onChange={event => handleSearch(event.target.value)}/>
                            <span className='fa fa-search'></span>
                        </div>
                    </div>
                    <div className='products-content-body'>
                        {numberOfProducts > 0 ? (
                            <div className="products-body">
                                {products.map(p => (
                                    <div className="product" key={p._id}>
                                        <div className="image-product">
                                            <img src={img} alt="محصول" />
                                        </div>
                                        <div className='body-product'>
                                            <h4>{p.nameProduct}</h4>
                                            <p>قیمت واحد محصول: {p.priceProduct} ریالی</p>
                                        </div>
                                        <div className="footer-product">
                                            <button className='delete'  onClick={() => setDeleteData(p._id)}><span className='fa fa-trash'></span>حذف</button>
                                            <button className='update'  onClick={()=>setUpdateData(p._id)}><span className='fa fa-check'></span>ویرایش</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="no-data">
                                <h4><span className='fa fa-warning'></span>هیچ کالایی ثبت نشده است</h4>
                            </div>
                        )}
                    </div>
                    {numberOfProducts>0 ?<Pagination numbers={numberOfProducts} page={page} perPage={perPage} setPage={setPage} setPerPage={setPerPage} />: null}
                </div>
            </div>
            {openNewProduct ? <NewProduct flag={openNewProduct} setFlag={setOpenProduct} /> : null}
            {openDeleteProduct ? <DeleteProduct flag={openDeleteProduct} setFlag={setOpenDeleteProduct} id={id} /> : null}
            {openUpdateProduct ? <UpdateProduct flag={openUpdateProduct} setFlag={setOpenUpdateProduct} id={id} /> : null}
        </React.Fragment>
    )
}

export default Products;