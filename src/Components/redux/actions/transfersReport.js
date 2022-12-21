import { getTransfersReport } from "../../../services/reportsService"

export const initTransferReport = (info, page=1, perPage = 10) => {
    return async (dispatch, getState) => {
        try {
            const { data, status } = await getTransfersReport(info, page, perPage);
            await dispatch({ type: 'SHOW' });
            if (status === 200) {
                await dispatch({ type: 'INIT_TRANSFERS_REPORT', payload: data });
                await dispatch({ type: 'HIDE' });
            } else {
                await dispatch({ type: 'HIDE' });
            }
        } catch (error) {
            await dispatch({ type: 'HIDE' });
        }
    }
}