import {
	REVIEW_TEMPLATE_ADD,
	REVIEW_TEMPLATE_FETCH,
	EMPLOYEE_REVIEW_ADD,
	REVIEW_ANSWER_SUBMIT
} from "../types";
import api from "../api";
import { normalize } from "normalizer";
import { reviewtemplateSchema } from "../schemas";

export const reviewTemplateAdd = reviewtemplate => ({
	type: REVIEW_TEMPLATE_ADD,
	reviewtemplate
});

export const employeereviewAdd = employeereview => ({
	type: EMPLOYEE_REVIEW_ADD,
	employeereview
});

export const reviewtemplateFetched = data => ({
	type: REVIEW_TEMPLATE_FETCH,
	data
});

export const reviewAnswerSubmit = reviewanswer => ({
	type: REVIEW_ANSWER_SUBMIT,
	reviewanswer
});

export const add = ReviewTemplate => dispatch =>
	api.reviewtemplate.add(ReviewTemplate).then(reviewtemplate => {
		dispatch(reviewTemplateAdd(reviewtemplate));
	});

export const addemp = EmployeeReview => dispatch =>
	api.employeereview.add(EmployeeReview).then(employeereview => {
		dispatch(employeereviewAdd(employeereview));
	});

export const fetchReviewTemplate = () => dispatch =>
	api.reviewtemplate
		.fetchAll()
		.then(reviewtemplate =>
			dispatch(
				reviewtemplateFetched(
					normalize(reviewtemplate, [reviewtemplateSchema])
				)
			)
		);

export const answer = ReviewAnswer => dispatch =>
	api.reviewanswer.answer(ReviewAnswer).then(reviewanswer => {
		dispatch(reviewAnswerSubmit(reviewanswer));
	});
