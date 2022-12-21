import {
  addTransfer,
  deleteTransfer,
  filteredTransfers,
  getTransfers,
  updateTransfer,
} from '../../../services/transfersService';
import { message } from '../../../utils/message';

export const initTransfers = (page = 1, perPage = 10) => {
  return async (dispatch, getState) => {
    try {
      const { status, data } = await getTransfers(page, perPage);
      dispatch({ type: 'SHOW' });
      if (status === 200) {
        await dispatch({ type: 'HIDE' });
        await dispatch({ type: 'INIT_TRANSFERS', payload: data });
      }
    } catch (error) {
      await dispatch({ type: 'HIDE' });
    }
  };
};

export const searchTransfers = (info, page = 1, perPage = 10) => {
  return async (dispatch, getState) => {
    try {
      const { status, data } = await filteredTransfers(info, page, perPage);
      await dispatch({ type: 'SHOW' });
      if (status === 200) {
        await dispatch({ type: 'HIDE' });
        await dispatch({ type: 'INIT_TRANSFERS', payload: data });
      }
    } catch (error) {
      await dispatch({ type: 'HIDE' });
    }
  };
};

export const newTransfer = (info) => {
  return async (dispatch, getState) => {
    try {
      const { status, data } = await addTransfer(info);
      await dispatch({ type: 'SHOW' });
      if (status === 201) {
        await dispatch({ type: 'UPDATE_TRANSFERS', payload: data });
        await dispatch({ type: 'HIDE' });
        message('با موفقیت اضافه شد', 'success');
      }
    } catch (error) {
      await dispatch({ ype: 'HIDE' });
      message('خطا در اضافه کردن مجوز', 'error');
    }
  };
};

export const deleteSingleTransfer = (id) => {
  return async (dispatch, getState) => {
    try {
      const { status } = await deleteTransfer(id);
      await dispatch({ type: 'SHOW' });
      if (status === 201) {
        const { transfers, numberOfTransfers } = { ...getState().transfers };
        const filteredTransfers = transfers.filter((t) => t._id !== id);
        await dispatch({
          type: 'UPDATE_TRANSFERS',
          payload: {
            transfers: filteredTransfers,
            numberOfTransfers: numberOfTransfers - 1,
          },
        });
        await dispatch({ type: 'HIDE' });
        message('با موفقیت حذف شد', 'success');
      }
    } catch (error) {
      if (error.response.status === 403) {
        await dispatch({ type: 'HIDE' });
        return message('برای این مجوز محموله ثبت شده است', 'error');
      }
      await dispatch({ type: 'HIDE' });
      message('خطا در حذف', 'error');
    }
  };
};

export const updateSingleTransfer = (info, id) => {
  return async (disptach, getState) => {
    try {
      const { status, data } = await updateTransfer(info, id);
      await disptach({type: 'SHOW'});
      if (status === 201) {
        const { transfers, numberOfTransfers} = {...getState().transfers};
        const transferIndex = transfers.findIndex(t=> t._id === id);
        transfers[transferIndex] = data;
        await disptach({type: 'UPDATE_TRANSFERS', payload: {transfers, numberOfTransfers}});
        await disptach({type: 'HIDE'});
        message('با موفقیت ویرایش شد', 'success');
      }
    } catch (error) {
        if(error.response.status === 403){
            await disptach({type: 'HIDE'});
            return message("مجموع وزن محموله ها بیشتر از وزن مجوز صادر شده است", "error");
        }
        await disptach({type: 'HIDE'});
        message("خطا در ویرایش", 'error');
    }
  };
};
