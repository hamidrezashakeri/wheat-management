import { getPaymentsReport } from '../../../services/reportsService';

export const initPaymentsReport = (info) => {
  return async (dispatch, getState) => {
    try {
      const { data, status } = await getPaymentsReport(info);
      await dispatch({ type: 'SHOW' });
      if (status === 200) {
        await dispatch({ type: 'HIDE' });
        await dispatch({ type: 'INIT_PAYMENTS_REPORT', payload: data });
      } else {
        await dispatch({ type: 'HIDE' });
      }
    } catch (error) {
        await dispatch({type: 'HIDE'});
    }
  };
};
