import React from "react";
import { Form, Button, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

class ReviewAnswer extends React.Component {
	state = {
		data: {},
		loading: false,
		errors: {}
	};

	componentDidMount() {
		fetch(
			"http://localhost/al.performancemanagement.app/api/employeereview/" +
				this.props.id
		)
			.then(response => response.json())
			.then(findres => {
				this.setState({ data: findres.Model });
			});
	}

	onSubmit = () => {
		const errors = this.validate(this.state.data);
		this.setState({ errors });
		if (Object.keys(errors).length === 0) {
			this.setState({ loading: true });
			this.props.submit(this.state.data);
		}
	};

	validate = data => {
		const errors = {};

		return errors;
	};

	ifEmployeeReview(data) {
		if (data.Status === "Employee Review") return true;
		else return false;
	}

	ifSupervisorReview(data) {
		if (data.Status === "Supervisor Review") return true;
		else return false;
	}

	ifReviewed(data) {
		if (data.Status === "Reviewed") return true;
		else return false;
	}
	onHandleChange(i, event) {
		let AnswerScore = this.state.data.AnswerScore.slice();
		AnswerScore[i][event.target.name] = event.target.value;
		this.setState({
			data: { ...this.state.data, AnswerScore: AnswerScore }
		});
	}

	onChange = e =>
		this.setState({
			data: { ...this.state.data, [e.target.name]: e.target.value }
		});

	render() {
		const { data } = this.state;
		const isEmployeeReview = this.ifEmployeeReview(data);
		const isSupervisorReview = this.ifSupervisorReview(data);
		const isReviewed = this.ifReviewed(data);

		return (
			<div>
				<Form onSubmit={this.onSubmit}>
					<table className="ui celled padded table">
						<tr>
							<td colspan="3">
								<strong>Employee Name:</strong>{" "}
								{data.EmployeeName}
							</td>
							<td colspan="2">
								<strong>Review Date:</strong> {data.ReviewDate}
							</td>
						</tr>
						<tr>
							<td colspan="5">
								<strong>Reviewer: </strong>
								{data.SupervisorName}
							</td>
						</tr>
						<tr>
							<td className="center aligned" colspan="5">
								<strong>Rating</strong>
							</td>
						</tr>

						<tr>
							<td className="center aligned">
								<strong>Very Poor</strong>
							</td>
							<td className="center aligned">
								<strong>Poor</strong>
							</td>
							<td className="center aligned">
								<strong>Average</strong>
							</td>
							<td className="center aligned">
								<strong>Above Average</strong>
							</td>
							<td className="center aligned">
								<strong>OutStanding</strong>
							</td>
						</tr>
						<tr>
							{!!data.RatingArray &&
								data.RatingArray.map((ratingitem, key) => (
									<td className="center aligned">
										{ratingitem.RangeFrom} -{" "}
										{ratingitem.RangeTo}
									</td>
								))}
						</tr>
						<tr>
							<td className="center aligned">
								<strong>Criteria</strong>
							</td>
							<td className="center aligned">
								<strong>Reviewee Score</strong>
							</td>
							<td className="center aligned">
								<strong>Reviewee Remark</strong>
							</td>
							<td className="center aligned">
								<strong>Reviewer Score</strong>
							</td>
							<td className="center aligned">
								<strong>Reviewer Remark</strong>
							</td>
						</tr>

						{!!data.AnswerScore &&
							data.AnswerScore.map((value, key) => (
								<tr>
									<td>{value.Question}</td>
									<td>
										<input
											type="number"
											name="EmployeeScore"
											value={value.EmployeeScore}
											onChange={this.onHandleChange.bind(
												this,
												key
											)}
											disabled={
												isEmployeeReview
													? ""
													: "disabled"
											}
										/>
									</td>
									<td>
										<input
											type="text"
											name="EmployeeRemark"
											value={value.EmployeeRemark}
											onChange={this.onHandleChange.bind(
												this,
												key
											)}
											disabled={
												isEmployeeReview
													? ""
													: "disabled"
											}
										/>
									</td>
									<td>
										<input
											type="number"
											name="SupervisorScore"
											value={value.SupervisorScore}
											onChange={this.onHandleChange.bind(
												this,
												key
											)}
											disabled={
												isSupervisorReview
													? ""
													: "disabled"
											}
										/>
									</td>
									<td>
										<input
											type="text"
											name="SupervisorRemark"
											value={value.SupervisorRemark}
											onChange={this.onHandleChange.bind(
												this,
												key
											)}
											disabled={
												isSupervisorReview
													? ""
													: "disabled"
											}
										/>
									</td>
								</tr>
							))}
						<tr>
							<td colspan="2" className="center aligned">
								<strong>Average Score:</strong>
							</td>
							<td className="center aligned">
								{data.SupervisorAverageScore}
							</td>
							<td className="center aligned">
								<strong>Rating</strong>
							</td>
							<td className="center aligned">
								<strong>{data.Rating}</strong>
							</td>
						</tr>
					</table>
					<div align="center">
						{isReviewed ? (
							""
						) : (
							<Button primary>
								<Icon name="send" />Submit
							</Button>
						)}

						<Button as={Link} to="/reviews" className="red">
							<Icon name="arrow left" />Back
						</Button>
					</div>
				</Form>
			</div>
		);
	}
}

ReviewAnswer.propTypes = {
	submit: PropTypes.func.isRequired
};

export default ReviewAnswer;
