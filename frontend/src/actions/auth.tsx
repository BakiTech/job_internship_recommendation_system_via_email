import axios from 'axios';
import { ThunkAction } from 'redux-thunk';

import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    PASSWORD_RESET_SUCCESS,
    PASSWORD_RESET_FAIL,
    PASSWORD_RESET_CONFIRM_SUCCESS,
    PASSWORD_RESET_CONFIRM_FAIL,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    ACTIVATION_SUCCESS,
    ACTIVATION_FAIL,
    LOGOUT
} from './types';

// Define types for actions
interface LoadUserSuccessAction {
    type: typeof USER_LOADED_SUCCESS;
    payload: UserData;
}

interface LoadUserFailAction {
    type: typeof USER_LOADED_FAIL;
}

interface AuthenticatedSuccessAction {
    type: typeof AUTHENTICATED_SUCCESS;
}

interface AuthenticatedFailAction {
    type: typeof AUTHENTICATED_FAIL;
}

interface LoginSuccessAction {
    type: typeof LOGIN_SUCCESS;
    payload: TokenData;
}

interface LoginFailAction {
    type: typeof LOGIN_FAIL;
}

interface SignupSuccessAction {
    type: typeof SIGNUP_SUCCESS;
    payload: TokenData;
}

interface SignupFailAction {
    type: typeof SIGNUP_FAIL;
}

interface ActivationSuccessAction {
    type: typeof ACTIVATION_SUCCESS;
}

interface ActivationFailAction {
    type: typeof ACTIVATION_FAIL;
}

interface PasswordResetSuccessAction {
    type: typeof PASSWORD_RESET_SUCCESS;
}

interface PasswordResetFailAction {
    type: typeof PASSWORD_RESET_FAIL;
}

interface PasswordResetConfirmSuccessAction {
    type: typeof PASSWORD_RESET_CONFIRM_SUCCESS;
}

interface PasswordResetConfirmFailAction {
    type: typeof PASSWORD_RESET_CONFIRM_FAIL;
}

interface LogoutAction {
    type: typeof LOGOUT;
}

// Union type for all possible actions
type AuthActionTypes =
    | LoadUserSuccessAction
    | LoadUserFailAction
    | AuthenticatedSuccessAction
    | AuthenticatedFailAction
    | LoginSuccessAction
    | LoginFailAction
    | SignupSuccessAction
    | SignupFailAction
    | ActivationSuccessAction
    | ActivationFailAction
    | PasswordResetSuccessAction
    | PasswordResetFailAction
    | PasswordResetConfirmSuccessAction
    | PasswordResetConfirmFailAction
    | LogoutAction;

// Define user data type
interface UserData {
    id: number;
    name: string;
    email: string;
    password: string;
}

// Define token data type
interface TokenData {
    
}

// Thunk type for async actions
type ThunkResult<T> = ThunkAction<T, undefined, undefined, AuthActionTypes>;

// Load user action
export const load_user = (): ThunkResult<void> => async (dispatch:any) => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        }; 

        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/users/me/`, config);
    
            dispatch({
                type: USER_LOADED_SUCCESS,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: USER_LOADED_FAIL
            });
        }
    } else {
        dispatch({
            type: USER_LOADED_FAIL
        });
    }
};

// Check authenticated action
export const checkAuthenticated = (): ThunkResult<void> => async (dispatch:any) => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }; 

        const body = JSON.stringify({ token: localStorage.getItem('access') });

        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/verify/`, body, config)

            if (res.data.code !== 'token_not_valid') {
                dispatch({
                    type: AUTHENTICATED_SUCCESS
                });
            } else {
                dispatch({
                    type: AUTHENTICATED_FAIL
                });
            }
        } catch (err) {
            dispatch({
                type: AUTHENTICATED_FAIL
            });
        }

    } else {
        dispatch({
            type: AUTHENTICATED_FAIL
        });
    }
};

// Login action
export const login = (email: string, password: string): ThunkResult<void> => async (dispatch:any) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ email, password });

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/create/`, body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });

        dispatch(load_user());
    } catch (err) {
        dispatch({
            type: LOGIN_FAIL
        })
    }
};

// Signup action
export const signup = (
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    re_password: string
): ThunkResult<void> => async (dispatch:any) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ first_name, last_name, email, password, re_password });

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/`, body, config);

        dispatch({
            type: SIGNUP_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: SIGNUP_FAIL
        })
    }
};

// Verify action
export const verify = (uid: string, token: string): ThunkResult<void> => async (dispatch:any) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ uid, token });

    try {
        await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/activation/`, body, config);

        dispatch({
            type: ACTIVATION_SUCCESS,
        });
    } catch (err) {
        dispatch({
            type: ACTIVATION_FAIL
        })
    }
};

// Reset password action
export const resetPassword = (email: string): ThunkResult<void> => async (dispatch:any) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ email });

    try {
        await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password/`, body, config);

        dispatch({
            type: PASSWORD_RESET_SUCCESS
        });
    } catch (err) {
        dispatch({
            type: PASSWORD_RESET_FAIL
        });
    }
};

// Reset password confirm action
export const resetPasswordConfirm = (
    uid: string,
    token: string,
    new_password: string,
    re_new_password: string
): ThunkResult<void> => async (dispatch:any) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ uid, token, new_password, re_new_password });

    try {
        await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password_confirm/`, body, config);

        dispatch({
            type: PASSWORD_RESET_CONFIRM_SUCCESS
        });
    } catch (err) {
        dispatch({
            type: PASSWORD_RESET_CONFIRM_FAIL
        });
    }
};

// Logout action
export const logout = (): ThunkResult<void> => (dispatch:any) => {
    dispatch({
        type: LOGOUT
    });
};
