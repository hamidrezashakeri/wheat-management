import { addSinglePayment, deletePayment, getAllProducts, updatePayment } from "../../../services/paymentService"
import { message } from "../../../utils/message";

export const initPayment = (info, page=1, perPage= 10) => {
    return async (dispatch, getState) => {
        try {
            const payments = await allPayments(info, page, perPage);
            await dispatch({ type: 'SHOW' });
            if (payments.length > 0) {
                await dispatch({ type: 'HIDE' });
                await dispatch({ type: 'INIT_PAYMENT', payload: payments });
            } else {
                await dispatch({ type: 'HIDE' });
                await dispatch({ type: 'INIT_PAYMENT', payload: [] });
            }
        } catch (error) {
            //message("خطا در برقرای ارتباط", "error");
        }
    }
}

export const addPayment = payment => {
    return async (dispatch, getState) => {
        try {
            const { status, data } = await addSinglePayment(payment);
            await dispatch({ type: 'SHOW' });
            if (status === 201) {
                await dispatch({ type: 'HIDE' });
                await dispatch({ type: 'INIT_PAYMENT', payload: data })
                message("فیش واریزی با موفقیت اضافه گردید", 'success');
            } else {
                await dispatch({ type: 'HIDE' })
                await dispatch({ type: 'INIT_PEYMENT', payload: [] });
            }
        } catch (error) {

        }
    }
}

export const updateSinglePayment = (paymentInfo, paymentId) => {
    return async (dispatch, getState) => {
        try {
            const { status, data } = await updatePayment(paymentInfo, paymentId);
            await dispatch({ type: 'SHOW' });
            if (status === 201) {
                let payments = [...getState().payment];
                const paymentIndex = payments.findIndex(p => p._id === paymentId);
                payments[paymentIndex] = data;
                await dispatch({ type: 'HIDE' });
                await dispatch({ type: 'INIT_PAYMENT', payload: payments });
                message("با موفقیت ویرایش شد", "success");
            }
        } catch (error) {
            if (error.response.status === 401) {
                return message("عدم تطابق وزن خریداری شده با میزان فروش سهمیه ای", "error");
            }
            message("خطا در ویرایش")
        }
    }
}

export const deleteSinglePayment = id => {
    return async (dispatch, getState) => {
        try {
            const { status } = await deletePayment(id);
            await dispatch({ type: 'SHOW' })
            if (status === 201) {
                const payments = [...getState().payment];
                const filteredPayments = payments.filter(p => p._id !== id);
                dispatch({ type: 'HIDE' });
                dispatch({ type: 'INIT_PAYMENT', payload: filteredPayments });
                message("با موفقیت حذف شد", "success");
            } else {
                dispatch({type: 'HIDE'});
                dispatch({ type: 'INIT_PAYMENT', payload: [] });
            }
        } catch (error) {
            if(error.response.status === 403){
                return message("برای این فیش واریزی مجوز صادر گردیده است.", "error");
            }
            return message("خطا در حذف", "error");
        }
    }
}

export const allPayments = async (info, page = 1, perPage = 10) => {
    const { status, data } = await getAllProducts(info, page, perPage);
    if (status === 200) {
        return data;
    } else {
        return [];
    }
}