import firebase from 'firebase';
import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER
} from './types';

export const emailChanged = (text) => {
    return {
        type: EMAIL_CHANGED,
        payload: text
    };
};

export const passwordChanged = (text) => {
    return {
        type: PASSWORD_CHANGED,
        payload: text
    };
};

// action creator returns a function for redux thunk to use. middleware.
export const loginUser = ({ email, password }) => {
    return (dispatch) => {
        dispatch({ type: LOGIN_USER });

        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
            .then(() => {
                firebase.auth().signInWithEmailAndPassword(email, password)
                    .then(user => loginUserSuccess(dispatch, user))
                    .catch((error) => {
                        console.log(error);

                        firebase.auth().createUserWithEmailAndPassword(email, password)
                            .then(user => loginUserSuccess(dispatch, user))
                            .catch(() => loginUserFail(dispatch));
                    });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode + errorMessage);
            });
    };
};

    const loginUserFail = (dispatch) => {
        dispatch({ type: LOGIN_USER_FAIL });
    };

    const loginUserSuccess = (dispatch, user) => {
        dispatch({
            type: LOGIN_USER_SUCCESS,
            payload: user
        });
    };
