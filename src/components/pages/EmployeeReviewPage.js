import React from "react";
import { Segment, Button, Icon, Divider } from "semantic-ui-react";
import { Link } from "react-router-dom";

class EmployeeReviewPage extends React.Component {
	constructor() {
		super();
		this.state = {
			data: []
		};
	}
	componentDidMount() {
		fetch(
			"http://localhost/al.performancemanagement.app/api/employeereview"
		)
			.then(response => response.json())
			.then(findres => {
				console.log(findres.Items);
				this.setState({
					data: findres.Items
				});
			});
	}

	render() {
		return (
			<div>
				<div className="ui container" />
				<Segment>
					<div className="ui grid">
						<div className="four column row">
							<div className="left floated column">
								<h3>Employee Review Management</h3>
							</div>
							<div className="right floated column">
								<Button
									as={Link}
									to="/employeereview/add"
									primary
								>
									<Icon name="write" /> Add Item
								</Button>
							</div>
						</div>
					</div>
					<Divider section />
					<table class="ui celled table">
						<thead>
							<tr>
								<th className="center aligned">Name</th>
								<th className="center aligned">Description</th>
								<th className="center aligned">Status</th>
								<th className="center aligned">Reviewee</th>
								<th className="center aligned">Reviewer</th>
								<th className="center aligned">Rating</th>
								<th className="center aligned">Review Date</th>
								<th />
							</tr>
						</thead>
						{!!this.state.data &&
							this.state.data.map((value, key) => (
								<tr>
									<td>{value.Name}</td>
									<td>{value.Description}</td>
									<td>{value.Status}</td>
									<td>{value.EmployeeName}</td>
									<td>{value.SupervisorName}</td>
									<td>{value.Rating}</td>
									<td>{value.ReviewDate}</td>
									<td>
										<Button
											as={Link}
											to={
												"/employeereviewView/" +
												value.Id
											}
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

export default EmployeeReviewPage;
