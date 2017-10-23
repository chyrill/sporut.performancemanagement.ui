import { USER_LOGGED_IN, USER_LOGGED_OUT } from "../types";
import api from "../api";

export const userLoggedIn = user => ({
	type: USER_LOGGED_IN,
	user
});

export const userLoggedOut = () => ({
	type: USER_LOGGED_OUT
});

export const login = User => dispatch =>
	api.user.login(User).then(user => {
		dispatch(userLoggedIn(user));
	});

export const logout = () => dispatch => {
	localStorage.removeItem("AuthCode");
	dispatch(userLoggedOut());
};
