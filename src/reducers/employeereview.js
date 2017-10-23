import { EMPLOYEE_REVIEW_ADD} from "../types";

export default function employeereview(state = {}, action = {}) {
	switch (action.type) {
		case EMPLOYEE_REVIEW_ADD:
			return action.employeereview;
		default:
			return state;
	}
}
