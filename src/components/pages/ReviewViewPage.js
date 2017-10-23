import React from "react";
import ReviewAnswer from "../forms/ReviewAnswer";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { answer } from "../../actions/crud";

class ReviewViewPage extends React.Component {
	submit = data => {
		this.props.answer(data).then(() => this.props.history.push("/reviews"));
	};
	render() {
		return (
			<div className="ui container">
				<ReviewAnswer
					id={this.props.match.params.id}
					submit={this.submit}
				/>
			</div>
		);
	}
}

ReviewViewPage.propTypes = {
	history: PropTypes.shape({
		push: PropTypes.func.isRequired
	}).isRequired,
	anwer: PropTypes.func.isRequired
};

export default connect(null, { answer })(ReviewViewPage);
