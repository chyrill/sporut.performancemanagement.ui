import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Segment, Divider, Button, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

class ReviewPage extends React.Component {
	state = { data: [] };

	componentDidMount() {
		fetch(
			"http://localhost/al.performancemanagement.app/api/employeereview/getall/" +
				this.props.UserId
		)
			.then(res => res.json())
			.then(findres => {
				this.setState({ data: findres.Items });
			});

		console.log(this.state.data);
	}

	render() {
		const { data } = this.state;
		return (
			<div className="ui container">
				<Segment>
					<h3>Reviews</h3>
					<Divider section />
					<table className="ui celled padded table">
						<thead>
							<tr>
								<th className="center aligned">Name</th>
								<th className="center aligned">Reviewee</th>
								<th className="center aligned">
									Reviewee Score
								</th>
								<th className="center aligned">Reviewer</th>
								<th className="center aligned">
									Reviewer Score
								</th>
								<th className="center aligned">Rating</th>
								<th className="center aligned">Status</th>
								<th />
							</tr>
						</thead>
						{!!this.state.data &&
							this.state.data.map((value, keys) => (
								<tr>
									<td>{value.Name}</td>
									<td>{value.EmployeeName}</td>
									<td>{value.EmployeeAverageScore}</td>
									<td>{value.SupervisorName}</td>
									<td>{value.SupervisorAverageScore}</td>
									<td>{value.Rating}</td>
									<td>{value.Status}</td>
									<td>
										<Button
											as={Link}
											to={"/reviewsView/" + value.Id}
											className="icon basic"
										>
											<Icon name="unhide" />
										</Button>
									</td>
								</tr>
							))}
					</table>
				</Segment>
			</div>
		);
	}
}

function mapToStateProps(state) {
	return {
		UserId: state.user.UserId
	};
}

ReviewPage.propTypes = {
	UserId: PropTypes.number.isRequired
};

export default connect(mapToStateProps)(ReviewPage);
