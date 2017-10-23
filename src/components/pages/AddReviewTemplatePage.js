import React from "react";
import ReviewTemplateForm from "../forms/ReviewTemplateForm";
import PropTypes from "prop-types";
import { add } from "../../actions/crud";
import { connect } from "react-redux";
import { Divider, Segment } from "semantic-ui-react";

class AddReviewTemplatePage extends React.Component {
	submit = data =>
		this.props
			.add(data)
			.then(() => this.props.history.push("/dashboard"))
			.catch(() => this.props.history.push("/dashboard"));

	render() {
		return (
			<div>
				<Segment>
					<div className="ui container">
						<h3> Add Review Template </h3>
					</div>
					<Divider section />
					<ReviewTemplateForm submit={this.submit} />
				</Segment>
			</div>
		);
	}
}

AddReviewTemplatePage.propTypes = {
	history: PropTypes.shape({
		push: PropTypes.func.isRequired
	}).isRequired,
	add: PropTypes.func.isRequired
};

export default connect(null, { add })(AddReviewTemplatePage);
