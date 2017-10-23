import { combineReducers } from "redux";

import user from "./reducers/user";
import reviewTemplate from "./reducers/reviewTemplate";

export default combineReducers({
	user,
	reviewTemplate
});
