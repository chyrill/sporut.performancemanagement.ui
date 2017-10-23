import { createSelector } from "reselect";
import {REVIEW_TEMPLATE_FETCH,REVIEW_TEMPLATE_ADD} from "../types";

export default function reviewTemplate(state = {}, action = {}) {
	switch (action.type) {
		case REVIEW_TEMPLATE_ADD:
			return action.reviewTemplate
		case REVIEW_TEMPLATE_FETCH:
			{
				return action.data
			}
		default:
			return state;
	}
}

// SELECTORS

export const reviewTemplateSelector = state => state.reviewTemplate;

export const allReviewTemplateSelector = createSelector(
	reviewTemplateSelector,
	reviewTemplateHash => Object.values(reviewTemplateHash)
);
