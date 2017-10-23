import React from "react";
import { Segment, Divider, Button, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

class ReviewTemplatePageView extends React.Component {
	state = {
		data: {},
		rating: []
	};

	componentDidMount() {
		fetch(
			"http://localhost/al.performancemanagement.app/api/reviewtemplate/" +
				this.props.match.params.id
		)
			.then(res => res.json())
			.then(findres => {
				this.setState({ data: findres.Model });
			});
		fetch(
			"http://localhost/al.performancemanagement.app/api/rating/" +
				this.props.match.params.id
		)
			.then(res => res.json())
			.then(findres => {
				this.setState({ rating: findres.Items });
			});
		console.log(this.props.match.params.id);
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
								<strong>Employee:</strong>{" "}
							</td>
							<td colspan="2">
								<strong>Review Date:</strong>
							</td>
						</tr>
						<tr>
							<td colspan="5">
								<strong>Reviewer:</strong>
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
							{!!this.state.rating &&
								this.state.rating.map((value, key) => (
									<td className="center aligned">
										{value.RangeFrom} - {value.RangeTo}
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
						{!!data.QuestionsArray &&
							data.QuestionsArray.map((item, key) => (
								<tr>
									<td>{item}</td>
									<td />
									<td />
									<td />
									<td />
								</tr>
							))}
						<tr>
							<td className="center aligned" colspan="2">
								<strong>Supervisor Average Score</strong>
							</td>
							<td />
							<td className="center aligned">
								<strong>Rating</strong>
							</td>
							<td />
						</tr>
					</table>
					<div align="right">
						<Button
							as={Link}
							to="/dashboard"
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

export default ReviewTemplatePageView;
