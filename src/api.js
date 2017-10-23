import axios from "axios";

export default {
	user: {
		login: User =>
			axios
				.post(
					"http://localhost/al.performancemanagement.app/api/user/login",
					{
						Username: User.Username,
						Password: User.Password
					}
				)
				.then(res => {
					localStorage.AuthCode = res.data.Model.AuthCode;
					localStorage.IsAdmin = res.data.Model.IsAdmin;
					localStorage.email = res.data.Model.Username;
					localStorage.UserId = res.data.Model.UserInfo.Id;
					return res.data.Model;
				})
	},
	reviewtemplate: {
		add: ReviewTemplate =>
			axios
				.post(
					"http://localhost/al.performancemanagement.app/api/reviewtemplate",
					{
						Name: ReviewTemplate.Name,
						Description: ReviewTemplate.Description,
						PointsPerItem: ReviewTemplate.PointsPerItem,
						QuestionsArray: ReviewTemplate.QuestionsArray
					}
				)
				.then(res => res.data.Model),
		fetchAll: () =>
			axios
				.get(
					"http://localhost/al.performancemanagement.app/api/reviewtemplate"
				)
				.then(res => res.data.Items)
	},
	employeereview: {
		add: EmployeeReview =>
			axios
				.post(
					"http://localhost/al.performancemanagement.app/api/employeereview",
					{
						Name: EmployeeReview.Name,
						Description: EmployeeReview.Description,
						EmployeeId: EmployeeReview.EmployeeId,
						SupervisorId: EmployeeReview.SupervisorId,
						ReviewTemplateId: EmployeeReview.ReviewTemplateId,
						ReviewDate: EmployeeReview.ReviewDate
					}
				)
				.then(res => res.data.Model)
	},
	reviewanswer: {
		answer: ReviewAnswer =>
			axios
				.post(
					"http://localhost/al.performancemanagement.app/api/answer/employeereview",
					{
						Id: ReviewAnswer.Id,
						ReviewTemplateId: ReviewAnswer.ReviewTemplateId,
						Name: ReviewAnswer.Name,
						Description: ReviewAnswer.Description,
						EmployeeId: ReviewAnswer.EmployeeId,

						SupervisorId: ReviewAnswer.SupervisorId,
						EmployeeAverageScore: ReviewAnswer.EmployeeAverageScore,
						SupervisorAverageScore:
							ReviewAnswer.SupervisorAverageScore,
						Rating: ReviewAnswer.Rating,
						ReviewDate: ReviewAnswer.ReviewDate,
						Status: ReviewAnswer.Status,
						DateCreated: ReviewAnswer.DateCreated,
						CreatedBy: ReviewAnswer.CreatedBy,
						AnswerScore: ReviewAnswer.AnswerScore
					}
				)
				.then(res => res.data.Model)
	}
};
