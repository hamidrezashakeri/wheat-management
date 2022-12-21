import React from 'react';


const Preloader = () => {
    return (
        <div className='preloader'>
            <div className='center'>
                <div className='ring'></div>
                <span>در حال بارگذاری...</span>
            </div>
        </div>
    )
}

export default Preloader;