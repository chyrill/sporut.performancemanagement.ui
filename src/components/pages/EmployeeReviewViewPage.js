import React from "react";
import { Segment, Divider, Icon, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

class EmployeeReviewViewPage extends React.Component {
	state = {
		data: {}
	};

	componentDidMount() {
		fetch(
			"http://localhost/al.performancemanagement.app/api/employeereview/" +
				this.props.match.params.id
		)
			.then(response => response.json())
			.then(findres => {
				this.setState({ data: findres.Model });
			});
	}

	render() {
		const { data } = this.state;
		return (
			<div className="ui container">
				<Segment>
					<h1>{data.Name}</h1>
					<Divider section />
					<table className="ui celled padded table">
						<tr>
							<td colspan="3">
								<strong>Employee:</strong> {data.EmployeeName}{" "}
							</td>
							<td colspan="2">
								<strong>Review Date:</strong> {data.ReviewDate}
							</td>
						</tr>
						<tr>
							<td colspan="5">
								<strong>Reviewer:</strong> {data.SupervisorName}
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
								<strong>Outstanding</strong>
							</td>
						</tr>
						<tr>
							{!!data.RatingArray &&
								data.RatingArray.map((itemdata, key) => (
									<td className="center aligned">
										{itemdata.RangeFrom} -{" "}
										{itemdata.RangeTo}
									</td>
								))}
						</tr>
						<tr>
							<td className="center aligned">
								<strong>Criteria</strong>
							</td>
							<td className="center aligned">
								<strong>Employee Score</strong>
							</td>
							<td className="center aligned">
								<strong>Employee Remark</strong>
							</td>
							<td className="center aligned">
								<strong>Supervisor Score</strong>
							</td>
							<td className="center aligned">
								Supervisor Remark
							</td>
						</tr>
						{!!data.AnswerScore &&
							data.AnswerScore.map((item, key) => (
								<tr>
									<td>{item.Question}</td>
									<td>{item.EmployeeScore}</td>
									<td>{item.EmployeeRemark}</td>
									<td>{item.SupervisorScore}</td>
									<td>{item.SupervisorRemark}</td>
								</tr>
							))}
						<tr>
							<td className="center aligned" colspan="2">
								<strong>Supervisor Average Score</strong>
							</td>
							<td className="align center">
								{data.SupervisorAverageScore}
							</td>
							<td className="center aligned">
								<strong>Rating</strong>
							</td>
							<td className="center aligned">{data.Rating}</td>
						</tr>
					</table>
					<div align="right">
						<Button
							as={Link}
							to="/employeereview"
							className="icon red"
							position="right"
						>
							<Icon name="arrow left right floated" />Back
						</Button>
					</div>
				</Segment>
			</div>
		);
	}
}

export default EmployeeReviewViewPage;
