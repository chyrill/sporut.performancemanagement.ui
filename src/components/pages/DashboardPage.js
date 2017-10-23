import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as actions from "../../actions/auth";
import TopNavigation from "./TopNavigation";
import allReviewTemplateSelector from "../../reducers/reviewTemplate";
import AddReviewTemplateCtA from "../ctas/AddReviewTemplateCtA";
import { Divider, Segment, Icon, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { fetchReviewTemplate } from "../../actions/crud";

class DashboardPage extends React.Component {
	constructor() {
		super();
		this.state = {
			data: []
		};
	}
	componentDidMount() {
		fetch(
			"http://localhost/al.performancemanagement.app/api/reviewtemplate"
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
		const { reviewTemplate } = this.props;
		return (
			<div>
				<div className="ui container" />

				<Segment>
					<div className="ui grid">
						<div className="four column row">
							<div className="left floated column">
								<h3>Review Template</h3>
							</div>
							<div className="right floated column">
								<Button
									as={Link}
									to="/reviewtemplate/add"
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
								<th>Name</th>
								<th>Description</th>
								<th>Date Created</th>
								<th />
							</tr>
						</thead>
						{!!this.state.data &&
							this.state.data.map((value, key) => (
								<tr>
									<td>{value.Name}</td>
									<td>{value.Description}</td>
									<td>{value.DateCreated}</td>
									<td>
										<Button
											as={Link}
											to={
												"/reviewtemplateView/" +
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

function mapStateToProps(state) {
	return {
		reviewTemplate: allReviewTemplateSelector(state)
	};
}

DashboardPage.propTypes = {
	reviewTemplate: PropTypes.arrayOf(
		PropTypes.shape({
			Name: PropTypes.string.isRequired,
			Description: PropTypes.string.isRequired,
			CreatedBy: PropTypes.string.isRequired
		})
	).isRequired,
	fetchReviewTemplate: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { fetchReviewTemplate })(DashboardPage);
