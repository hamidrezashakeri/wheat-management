import { getMaterialBalnce } from "../../../services/reportsService"

export const initMaterialBalnce = (info)=>{
    return async(dispatch, getState)=>{
       try{
        const { data, status} = await getMaterialBalnce(info);
        await dispatch({type: 'SHOW'})
        if(status === 200){
            await dispatch({type: 'HIDE'});
            await dispatch({type: 'INIT_MATERIAL_BALANCE', payload: data});
        }
       }catch(error){
            await dispatch({type: 'HIDE'});
       }
        
    }
}