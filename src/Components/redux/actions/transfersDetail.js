import {
  addTransferDetail,
  deleteTransferDetail,
  searchTransfers,
  transfersDetail,
  updateTransferDetail,
} from '../../../services/transfersDetailService';
import { message } from '../../../utils/message';

export const getTransfersDetail = (id, pageId, perPage) => {
  return async (dispatch, getState) => {
    try {
      const { status, data } = await transfersDetail(id, pageId, perPage);
      await dispatch({ type: 'SHOW' });
      if (status === 200) {
        await dispatch({ type: 'HIDE' });
        await dispatch({ type: 'INIT_TRANSFERS_DETAIL', payload: data });
      }
    } catch (error) {
      await dispatch({ type: 'HIDE' });
    }
  };
};

export const searchTransfersDetail = (
  search,
  transferId,
  pageId = 1,
  perPage = 10
) => {
  return async (dispatch, getState) => {
    try {
      const { data, status } = await searchTransfers(
        search,
        transferId,
        pageId,
        perPage
      );
      dispatch({ type: 'SHOW' });
      if (status === 200) {
        await dispatch({ type: 'HIDE' });
        await dispatch({ type: 'INIT_TRANSFERS_DETAIL', payload: data });
      }
    } catch (error) {
      await dispatch({ type: 'HIDE' });
    }
  };
};

export const newTransferDetail = (info, transferId) => {
  return async (dispatch, getState) => {
    try {
      const { status, data } = await addTransferDetail(info, transferId);
      await dispatch({ type: 'SHOW' });
      if (status === 201) {
        await dispatch({ type: 'UPDATE_TRANSFERS_DETAIL', payload: data });
        await dispatch({ type: 'HIDE' });
        message('با موفقیت اضافه شد', 'success');
      }
    } catch (error) {
      if (error.response.status === 403) {
        await dispatch({ type: 'HIDE' });
        return message('مجموع وزن محموله ها از وزن مجوز بیشتر می شود', 'error');
      }
      await dispatch({ type: 'HIDE' });
      message('خطا در اضافه کردن مجوز', 'error');
    }
  };
};

export const deleteSingleTransferDetail = (id) => {
  return async (dispatch, getState) => {
    try {
      const { status } = await deleteTransferDetail(id);
      await dispatch({ type: 'SHOW' });
      if (status === 201) {
        const { transfers, numbers } = { ...getState().transfersDetail };
        const filteredTransfers = transfers.filter((t) => t._id !== id);
        await dispatch({
          type: 'UPDATE_TRANSFERS_DETAIL',
          payload: { transfers: filteredTransfers, numbers: numbers - 1 },
        });
        message('با موفقیت حذف شد', 'success');
      }
    } catch (error) {
      await dispatch({ type: 'HIDE' });
      message('خطا در حذف', 'error');
    }
  };
};

export const updateSingleTransferDetail = (info, transferId) => {
  return async (dispatch, getState) => {
    try {
      const { status,data } = await updateTransferDetail(info, transferId);
      await dispatch({type: 'SHOW'});
      if (status === 201) {
        const { transfers, numbers } = {...getState().transfersDetail};
        const transfersIndex = transfers.findIndex(t=> t._id === info._id);
        transfers[transfersIndex] = data;
        await dispatch({type: 'HIDE'});
        await dispatch({type: 'UPDATE_TRANSFERS_DETAIL', payload: {transfers, numbers}});
        message('با موفقیت ویرایش شد', 'success');
      }
    } catch (error) {
        if(error.response.status === 403){
            await dispatch({type: 'HIDE'});
            return message("مجموع وزن محموله ها از وزن مجوز بیشتر می شود", 'error');
        }
        message("خطا در ویرایش", "error");
    }
  };
};
