import { deleteQoutaSale, getAllQoutaSales, newQoutaSales, searchQoutaSale, updateQoutaSale } from "../../../services/qoutaSalesService"
import { message } from "../../../utils/message";

export const getQoutaSales = () => {
    return async (dispatch, getState) => {
        try {
            const { status, data } = await getAllQoutaSales();
            dispatch({type: 'SHOW'});
            if (status === 200) {
                await dispatch({ type: 'INIT_QOUTA_SALES', payload: data });
                await dispatch({ type: 'HIDE'});
            }
        } catch (error) {
            dispatch({type: 'HIDE'});
        }
    }
}

export const addQoutaSales = (qoutaSalesInfo, paymentId) => {
    return async (dispatch, getState) => {
        try {
            const { status, data } = await newQoutaSales(qoutaSalesInfo, paymentId);
            await dispatch({ type: 'SHOW' });
            if (status === 201) {
                const payments = [...getState().payment];
                const paymentIndex = payments.findIndex(p => p._id === paymentId);
                payments[paymentIndex] = data.payment;
                await dispatch({ type: 'UPDATE_PAYMENT', payload: payments });
                await dispatch({ type: 'HIDE' });
                message("مجوز صادر شده با موفقیت اضافه گردید", "success");
            }
        } catch (error) {
            if(error.response.status === 403){
                await dispatch({type: 'HIDE'});
                return message("مجموع مجوز های صادره نباید بیشتر از فیش واریزی باشد", "error");
            }
            await dispatch({ type: 'HIDE' });
            message("خطا در اضافه کردن مجوز", "error");
        }
    }
}

export const search = (qoutaSalesInfo, page = 1, perPage = 10) => {
    return async (dispatch, getState) => {
        try {
            const { status, data } = await searchQoutaSale(qoutaSalesInfo, page, perPage);
            await dispatch({ type: 'SHOW' });
            if (status === 200) {
                await dispatch({ type: 'UPDATE_QOUTA_SALES', payload: data });
                await dispatch({ type: 'HIDE' });
            }
        } catch (error) {
            await dispatch({ type: 'HIDE' });
        }
    }
}

export const deleteSingleQoutaSale = (id) => {
    return async (dispatch, getState) => {
        try {
            const { status } = await deleteQoutaSale(id);
            await dispatch({type: 'SHOW'});
            if (status === 201) {
                const qoutaSales = [...getState().qoutaSales];
                console.log(qoutaSales);
                const filteredQoutaSales = qoutaSales.filter(q=> q._id !== id);
                dispatch({ type: 'UPDATE_PAYMENT', payload: []});
                dispatch({ type: 'UPDATE_QOUTA_SALES', payload: filteredQoutaSales });
                dispatch({type: 'HIDE'});
                message("با موفقیت حذف شد", "success");
            }
        } catch (error) {
            if(error.response.status === 403){
                await dispatch({type: 'HIDE'});
                return message("بر ای این مجوز محموله ثبت شده است", "error");
            }
            await dispatch({type: 'HIDE'});
            message("خطا در حذف", 'error');
        }
    }
}

export const updateSingleQoutaSale = (info, qoutaSaleId)=>{
    return async(dispatch, getState)=>{
       try {
        const { status, data} = await updateQoutaSale(info, qoutaSaleId);
        await dispatch({type: 'SHOW'});
        if(status === 201){
            const qoutaSales = [...getState().qoutaSales];
            const qoutaSaleIndex = qoutaSales.findIndex(q=> q._id === qoutaSaleId);
            qoutaSales[qoutaSaleIndex] = data;
            await dispatch({ type: 'HIDE'});
            await dispatch({ type: 'UPDATE_QOUTA_SALES', payload: qoutaSales});
            await dispatch({ type: 'UPDATE_PAYMENT', payload: []});
            message("با موفقیت ویرایش شد", "success");
        }
       } catch (error) {
        console.log(error);
            if(error.response.status === 403){
                await dispatch({ type: 'HIDE'});
                return message("وزن خریداری شده با مقدار فیش واریزی یا جمع محموله ها مغایرت دارد", "error");
            }
            await dispatch({type: 'HIDE'});
            message("خطا در ویرایش" ,"success");
       }

    }
}