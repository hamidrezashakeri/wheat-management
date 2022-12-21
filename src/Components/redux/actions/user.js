import { updateUser } from "../../../services/userService";
import { message } from "../../../utils/message";

export const addUser = user => {
    return async dispatch => {
        await dispatch({ type: "SET_USER", payload: user });
    };
};

export const clearUser = () => {
    return async dispatch => {
        await dispatch({ type: "CLEAR_USER", payload: {} });
    };
};

export const updatePassword = (info, userId) => {
    return async dispatch => {
        try {
            const { status } = await updateUser(info, userId);
            if (status === 201) {
                await dispatch({ type: 'SET_USER', payload: {} });
                localStorage.removeItem("token");
                message("با موفقیت انجام شد", "success");
            }
        } catch (error) {
            message("خطا در تغییر کلمه عبور", "error");
        }
    }
}