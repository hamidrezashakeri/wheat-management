import {
  changeStatusRent,
  deleteTransferQoutaSale,
  getTransferQoutaSale,
  newTransferQoutaSale,
  searchTransfers,
  updateTransferQoutaSale,
} from '../../../services/qoutaSalesService';
import { message } from '../../../utils/message';

export const getAllTransferQoutaSale = (id, pageId = 1, perPage = 10) => {
  return async (dispatch, getState) => {
    try {
      const transfers = await transfersById(id, pageId, perPage);
      dispatch({ type: 'SHOW' });
      if (Object.keys(transfers).length > 0) {
        await dispatch({
          type: 'INIT_TRANSFER_QOUTA_SALE',
          payload: transfers,
        });
        await dispatch({ type: 'HIDE' });
      } else {
        await dispatch({ type: 'INIT_TRANSFER_QOUTA_SALE', payload: {} });
        await dispatch({ type: 'HIDE' });
      }
    } catch (error) {
      await dispatch({ type: 'HIDE' });
    }
  };
};

export const addTransferQoutaSale = (info, id) => {
  return async (dispatch, getState) => {
    try {
      const { status } = await newTransferQoutaSale(info, id);
      await dispatch({ type: 'SHOW' });
      if (status === 201) {
        await dispatch({ type: 'HIDE' });
        await dispatch({ type: 'UPDATE_TRANSFER_QOUTA_SALE', payload: {} });
        await dispatch({ type: 'UPDATE_QOUTA_SALES', payload: [] });
        message('محموله با موفقیت اضافه گردید', 'success');
      }
    } catch (error) {
      if (error.response.status === 403) {
        await dispatch({ type: 'HIDE' });
        return message('وزن مبدا یا مقصد بیشتر از وزن مجوز است', 'error');
      }
      message('خطا در اضافه کردن محموله', 'error');
    }
  };
};

export const changeSingleStatusRent = (rentId, qoutaSaleId) => {
  return async (dispatch, getState) => {
    try {
      const { status } = await changeStatusRent(rentId);
      await dispatch({ type: 'SHOW' });
      if (status === 200) {
        const transfers = await transfersById(qoutaSaleId);
        await dispatch({
          type: 'UPDATE_TRANSFER_QOUTA_SALE',
          payload: transfers,
        });
        await dispatch({ type: 'HIDE' });
        message('با موفقیت انتقال یافت', 'success');
      }
    } catch (error) {
      await dispatch({ type: 'HIDE' });
    }
  };
};

export const searchTransferQoutaSale = (
  search,
  qoutaSaleId,
  pageId = 1,
  perPage = 10
) => {
  return async (dispatch, getState) => {
    try {
      const { data, status } = await searchTransfers(
        search,
        qoutaSaleId,
        pageId,
        perPage
      );
      await dispatch({ type: 'SHOW' });
      if (status === 200) {
        await dispatch({ type: 'UPDATE_TRANSFER_QOUTA_SALE', payload: data });
        await dispatch({ type: 'HIDE' });
      }
    } catch (error) {
      await dispatch({ type: 'HIDE' });
    }
  };
};

export const deleteSingleTransferQoutaSale = (id, qoutaSaleId) => {
  return async (dispatch, getState) => {
    try {
      const { status } = await deleteTransferQoutaSale(id);
      await dispatch({type: 'SHOW'});
      if (status === 201) {
        const { transfers, numbers } = { ...getState().transferQoutaSale };
        const filteredTransfers = transfers.filter(t=> t._id !== id);
        console.log(getState());
        await dispatch({ type: 'HIDE'});
        await dispatch({
          type: 'UPDATE_TRANSFER_QOUTA_SALE',
          payload: { transfers: filteredTransfers, numbers: numbers-1 },
        });
        message('با موفقیت حذف شد', 'success');
      }
    } catch (error) {
        await dispatch({type: 'HIDE'});
    }
  };
};

export const updateSingleTransferQoutaSale = (transferInfo, qoutaSaleId) => {
  return async (dispatch, getState) => {
    try {
      const { status, data } = await updateTransferQoutaSale(
        transferInfo,
        qoutaSaleId
      );
      await dispatch({ type: 'SHOW' });
      if (status === 201) {
        const { transfers, numbers } = { ...getState().transferQoutaSale };
        const trasnferIndex = transfers.findIndex(
          (t) => t._id === transferInfo.id
        );
        transfers[trasnferIndex] = { ...data };
        await dispatch({
          type: 'UPDATE_TRANSFER_QOUTA_SALE',
          payload: { transfers, numbers },
        });
        //await dispatch({ type: 'UPDATE_QOUTA_SALES', payload: []});
        await dispatch({ type: 'HIDE' });
        message('با موفقیت ویرایش شد', 'success');
      }
    } catch (error) {
      if (error.response.status === 403) {
        dispatch({ type: 'HIDE' });
        return message('ورن مبدا یا مقصد بیشتر از وزن مجوز است', 'error');
      }
      message('خطا در ویرایش', 'error');
    }
  };
};

export const transfersById = async (id, pageId = 1, perPage = 10) => {
  const { data, status } = await getTransferQoutaSale(id, pageId, perPage);
  if (status === 200) {
    return data;
  }
  return [];
};
