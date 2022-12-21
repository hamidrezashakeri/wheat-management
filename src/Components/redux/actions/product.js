import { addSingleProduct, deleteSingleProduct, getAllProducts, searchProducts, updateSingleProduct } from "../../../services/ProductServise";
import { message } from "../../../utils/message";

export const initProduct = (pageId = 1, perPage = 10) => {
    return async (dispatch, getState) => {
        try {
            const products = await allProducts(pageId, perPage);
            await dispatch({ type: 'SHOW' });
            if (Object.keys(products).length > 0) {
                await dispatch({ type: 'HIDE' });
                await dispatch({ type: 'INIT_PRODUCT', payload: products });
            } else {
                await dispatch({ type: 'HIDE' });
                await dispatch({ type: 'INIT_PRODUCT', payload: {} });
            }
        } catch (error) {
            //message("خطا در برقراری ارتباط", "error");
        }
    }
}

export const addProduct = product => {
    return async (dispatch, getState) => {
        try {
            const { status } = await addSingleProduct(product);
            await dispatch({ type: 'SHOW' });
            if (status === 201) {
                const products = await allProducts();
                if (Object.keys(products).length > 0) {
                    await dispatch({ type: 'HIDE' });
                    await dispatch({ type: 'ADD_PRODUCT', payload: products });
                    message("محصول با موفقیت اضافه گردید", "success");
                } else {
                    await dispatch({ type: 'HIDE' });
                    await dispatch({ type: 'ADD_PRODUCT', payload: {} });
                }
            }
        } catch (error) {
            message("خطا در اضافه کردن محصول", "error");
        }
    }
}

export const deleteProduct = id => {
    return async (dispatch, getState) => {
        try {
            const { status } = await deleteSingleProduct(id);
            await dispatch({ type: 'SHOW' });
            if (status === 201) {
                const products = await allProducts();
                if (Object.keys(products).length > 0) {
                    await dispatch({ type: 'HIDE' });
                    await dispatch({ type: 'DELETE_PRODUCT', payload: products });
                    message("محصول با موفقیت حذف گردید", "success");
                } else {
                    await dispatch({ type: 'HIDE' });
                    await dispatch({ type: 'DELETE_PRODUCT', payload: {} });
                }
            }
        } catch (error) {
            if (error.response.status === 401) {
                return message("برای این محصول تراکنش ثبت شده است.", "error");
            }
            message("خطا در حذف", "error");
        }
    }
}

export const updateProduct = (id, data) => {
    return async (dispatch, getState) => {
        try {
            const { status } = await updateSingleProduct(id, data);
            await dispatch({ type: 'SHOW' })
            if (status === 201) {
                const products = await allProducts();
                if (Object.keys(products).length > 0) {
                    await dispatch({ type: 'HIDE' });
                    await dispatch({ type: 'UPDATE_PRODUCT', payload: products });
                    message("محصول با موفقیت ویرایش گردید", "success");
                } else {
                    await dispatch({ type: 'HIDE' });
                    await dispatch({ type: 'UPDATE_PRODUCT', payload: {} });
                }
            }
        } catch (error) {
            message("خطادر ویرایش محصول", "error");
        }
    }
}

export const filteredProducts = (pageId = 1, perPage = 10, search) => {
    return async (dispatch, getState) => {
        try {
            const { data, status } = await searchProducts(pageId, perPage, search);
            await dispatch({ type: 'SHOW' })
            if (status === 200) {
                await dispatch({ type: 'HIDE' });
                await dispatch({ type: 'INIT_PRODUCT', payload: data });
            }
            else {
                await dispatch({ type: 'HIDE' });
                await dispatch({ type: 'INIT_PRODUCT', payload: data });
            }
        } catch (error) {
            message("خطا در برقراری ارتباط", "error");
        }
    }
}

export const allProducts = async (pageId, perPage) => {
    const { data, status } = await getAllProducts(pageId, perPage);

    if (status === 200) {
        return data;
    } else {
        return [];
    }
}