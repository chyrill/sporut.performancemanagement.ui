import React from "react";
import EmployeeReviewForm from "../forms/EmployeeReviewForm";
import PropTypes from "prop-types";
import { addemp } from "../../actions/crud";
import { connect } from "react-redux";
import {Divider, Segment} from 'semantic-ui-react';

class EmployeeReviewPageAdd extends React.Component {
	submit = data =>
		this.props.addemp(data).then(() => this.props.history.push("/employeereview"));

	render() {
		return (
			<div>
			<Segment>
			<div className="ui container">
				<h3> Add Employee Review</h3>
				</div>
				<Divider section/>
				<EmployeeReviewForm submit={this.submit} />
			
			</Segment>
			</div>
		);
	}
}

EmployeeReviewPageAdd.propTypes = {
	history: PropTypes.shape({
		push: PropTypes.func.isRequired
	}).isRequired,
	addemp: PropTypes.func.isRequired
};

export default connect(null, { addemp })(EmployeeReviewPageAdd);
