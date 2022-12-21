import { addBuyDirectly, changeStatus, deleteBuy, getBuysDirectly, updateBuy } from "../../../services/buysDirectlyService"
import { message } from "../../../utils/message";

export const initBuysDirectly = (info, page = 1, perPage = 10) => {
    return async (dispatch, getState) => {
        try {
            const { status, data } = await getBuysDirectly(info, page, perPage);
            await dispatch({ type: 'SHOW' });
            if (status === 200) {
                await dispatch({ type: 'HIDE' })
                await dispatch({ type: 'INIT_BUYS', payload: data });
            } else {
                await dispatch({ type: 'HIDE' });
                await dispatch({ type: 'INIT_BUYS', payload: [] });
            }
        } catch (error) {
            //message("خطا در برقراری ارتباط", "error");
        }
    }
}

export const newBuyDirectly = (info) => {
    return async (dispatch, getState) => {
        try {
            const { status, data } = await addBuyDirectly(info);
            await dispatch({ type: 'SHOW' });
            if (status === 201) {
                await dispatch({ type: 'HIDE' });
                await dispatch({ type: 'ADD_BUYS', payload: data });
                message("با موفقیت اضافه شد", "success");
            } else {
                await dispatch({ type: 'ADD_BUYS', payload: [] });
                await dispatch({ type: 'HIDE' });
            }
        } catch (error) {
            message("خطا در خرید", "error");
        }
    }
}

export const deleteSingleBuy = (id) => {
    return async (dispatch, getState) => {
        try {
            const { status } = await deleteBuy(id);
            await dispatch({ type: 'SHOW' });
            if (status === 201) {
                const buys = [...getState().buysDirectly];
                const filteredBuys = buys.filter(b => b._id !== id);
                await dispatch({ type: 'DELETE_BUYS', payload: filteredBuys });
                await dispatch({ type: 'HIDE' })
                message("با موفقیت حذف شد", "success");
            } else {
                await dispatch({ type: 'DELETE_BUYS', payload: [] });
                await dispatch({ type: 'HIDE' });
            }
        } catch (error) {
            if(error.response.status === 403){
                return message("برای این مجوز، محموله ثبت شده است");
            }
            message("خطا در حذف", "error");
        }
    }
}

export const updateSingleBuyDirectly = (info, id) => {
    return async (disptach, getState) => {
        try {
            const { status, data } = await updateBuy(info, id);
            await disptach({ type: 'SHOW' });
            if (status === 201) {
                let buys = [...getState().buysDirectly];
                const indexBuy = buys.findIndex(b => b._id === id);
                buys[indexBuy] = data;
                await disptach({ type: 'HIDE' });
                await disptach({ type: 'UPDATE_BUYS', payload: buys });
                message("با موفقیت ویرایش شد", "success");
            } else {
                await disptach({ type: 'HIDE' });
                await disptach({ type: 'UPDATE_BUYS', payload: [] });
            }
        } catch (error) {
            message("خطا در ویرایش", "error");
        }
    }
}

export const changeRentStatus = (id) => {
    return async (dispatch, getState) => {
        try {
            const { status } = await changeStatus(id);
            await dispatch({type: 'SHOW'});
            if (status === 201) {
                let buys = [...getState().buysDirectly];
                const indexBuy = buys.findIndex(b => b._id === id);
                const buy = buys[indexBuy];
                buy.rentStatus = true;
                buys[indexBuy] = buy;
                await dispatch({type: 'HIDE'});
                await dispatch({ type: 'UPDATE_BUYS', payload: buys });
                message("عملیات با موفقیت انجام شد", "success");
            }else{
                await dispatch({type: 'HIDE'});
                await dispatch({ type: 'UPDATE_BUYS', payload: [] });
            }
        } catch (error) {
            message("خطا در ویرایش", "error");
        }
    }
}