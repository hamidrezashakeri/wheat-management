import React, { useEffect } from 'react';


const Pagination = ({numbers, page, perPage, setPage, setPerPage}) => {
    const allPage = Math.ceil(numbers / perPage);

    const handleSetPage = (page)=>{
        if(page > allPage) setPage(allPage);
        else if(page<1) setPage(1);
        else setPage(page)
    }

    useEffect(()=>{
        if(page> allPage) setPage(allPage)
    },[page, setPage, allPage])

    return (
        <div className="pagination">
            <div className="right">
                <button onClick={()=>setPage(1)} disabled={page<=1}><i class="fa fa-fast-forward" aria-hidden="true"></i></button>
                <button onClick={()=>setPage(page - 1)} disabled={page<=1}><i class="fa fa-forward" aria-hidden="true"></i></button>
                <div className='info'>
                    <span>صفحه</span>
                    <input type="text" className='page' value={page} onChange={event=>handleSetPage(event.target.value)} />
                    <span>از {allPage}</span>
                </div>
                <button onClick={()=>setPage(page+1)} disabled={page*perPage>= numbers}><i class="fa fa-backward" aria-hidden="true"></i></button>
                <button onClick={()=>setPage(allPage)} disabled={page*perPage>= numbers}><i class="fa fa-fast-backward" aria-hidden="true"></i></button>
                <div>
                    <select name="perPage" id="perPage" value={perPage} onChange={event=>setPerPage(event.target.value)}>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                        <option value={200}>200</option>
                    </select>
                </div>
            </div>
            <div className='left'>
                <span>نمایش {(page-1)*perPage+1} تا {page*perPage < numbers ? perPage : numbers} رکورد از {numbers} رکورد</span>
            </div>
        </div>
    )
}

export default Pagination;