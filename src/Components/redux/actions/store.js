import { addSingleStore, changeStatusStore, deleteSingleStore, getAllStores, searchStores, updateSingleStore } from "../../../services/storeService";
import { message } from "../../../utils/message";


export const initStore = (pageId = 1, perPage = 10) => {
    return async (dispatch, getState) => {
        try {
            const stores = await allStores(pageId, perPage);
            await dispatch({ type: 'SHOW' });
            if (Object.keys(stores).length > 0) {
                await dispatch({ type: 'HIDE' })
                await dispatch({ type: 'INIT_STORE', payload: stores });
            } else {
                await dispatch({ type: 'HIDE' });
                await dispatch({ type: 'INIT_STORE', payload: {} });
            }
        } catch (error) {
            //message("خطا در برقراری ارتباط", 'error');
        }
    }
}

export const addStore = store => {
    return async (dispatch, getState) => {
        try {
            const { status } = await addSingleStore(store);
            await dispatch({ type: 'SHOW' });
            if (status === 201) {
                const stores = await allStores();
                if (Object.keys(stores).length > 0) {
                    await dispatch({ type: 'HIDE' });
                    await dispatch({ type: 'ADD_STORE', payload: stores })
                    message("مرکز ذخیره سازی با موفقیت اضافه گردید", "success");
                } else {
                    await dispatch({ type: 'HIDE' });
                    await dispatch({ type: 'INIT_STORE', payload: {} });
                }
            }

        } catch (error) {
            message("خطا در اضافه کردن مرکز ذخیره سازی", "error");
        }
    }
}

export const deleteStore = id => {
    return async (dispatch, getState) => {
        try {
            const { status } = await deleteSingleStore(id);
            await dispatch({ type: 'SHOW' });
            if (status === 201) {
                const stores = await allStores();
                if (Object.keys(stores).length > 0) {
                    await dispatch({ type: 'HIDE' });
                    await dispatch({ type: 'DELETE_STORE', payload: stores });
                    message("مرکز ذخیره سازی با موفقیت حذف گردید", 'success');
                } else {
                    await dispatch({ type: 'HIDE' });
                    await dispatch({ type: 'INIT_STORE', payload: {} });
                }

            }
        } catch (error) {
            if (error.response.status === 401) {
                return message("برای این مرکز ذخیره سازی محموله ثبت شده است.", "error");
            }
            message("خطا در حذف", "error");
        }
    }
}

export const updateStore = (id, data) => {
    return async (dispatch, getState) => {
        try {
            const { status } = await updateSingleStore(id, data);
            await dispatch({ type: 'SHOW' });
            if (status === 201) {
                const stores = await allStores();
                if (Object.keys(stores).length > 0) {
                    await dispatch({ type: 'HIDE' });
                    await dispatch({ type: 'UPDATE_STORE', payload: stores });
                    message("مرکز ذخیره سازی با موفقیت ویرایش گردید", 'success');
                } else {
                    await dispatch({ type: 'HIDE' });
                    await dispatch({ type: 'INIT_STORE', payload: {} });
                }
            }
        } catch (error) {
            message("خطا در ویرایش مرکز ذخیره سازی")
        }

    }
}

export const changeSingleStatusStore = id => {
    return async (dispatch, getState) => {
        const { status } = await changeStatusStore(id);
        await dispatch({ type: 'SHOW' });
        if (status === 200) {
            const stores = await allStores();
            if (Object.keys(stores).length > 0) {
                await dispatch({ type: 'HIDE' });
                await dispatch({ type: 'UPDATE_STORE', payload: stores });
                message("با موفقیت تغییر یافت", "success");
            } else {
                await dispatch({ type: 'HIDE' });
                await dispatch({ type: 'INIT_STORE', payload: {} });
            }
        }
    }
}

export const filteredStore = (pageId = 1, perPage = 10, search) => {
    return async (dispatch, getState) => {
        try {
            const { data, status } = await searchStores(pageId, perPage, search);
            await dispatch({ type: 'SHOW' })
            if (status === 200) {
                await dispatch({ type: 'HIDE' });
                await dispatch({ type: 'INIT_STORE', payload: data });
            } else {
                await dispatch({ type: 'HIDE' });
                await dispatch({ type: 'INIT_STORE', payload: {} });
            }
        } catch (error) {
            message("خطا در برقرای ارتباط", "error");
        }
    }
}

export const allStores = async (pageId, perPage) => {
    const { data, status } = await getAllStores(pageId, perPage);
    if (status === 200) {
        return data;
    }
    return [];
}
