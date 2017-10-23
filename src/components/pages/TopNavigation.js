import React from "react";
import { Menu, Dropdown, Image } from "semantic-ui-react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import gravatarUrl from "gravatar-url";
import { Link } from "react-router-dom";
import { logout } from "../../actions/auth";

class TopNavigation extends React.Component {
	state = {
		data: {}
	};

	componentDidMount() {
		fetch(
			"http://localhost/al.performancemanagement.app/api/employeereview/answer/" +
				this.props.UserId
		)
			.then(res => res.json())
			.then(findres => {
				this.setState({ data: findres });
			});
	}

	render() {
		return (
			<Menu secondary pointing>
				<Menu.Item as={Link} to="/dashboard">
					Dashboard
				</Menu.Item>
				<Menu.Menu position="left">
					{this.props.IsAdmin ? (
						<Menu.Item as={Link} to="/dashboard">
							Review Management
						</Menu.Item>
					) : (
						<p />
					)}
					{this.props.IsAdmin ? (
						<Menu.Item as={Link} to="/employeereview">
							Employee Review Management
						</Menu.Item>
					) : (
						<p />
					)}
					<Menu.Item as={Link} to="/reviews">
						Reviews{" "}
						{!!this.state.data.SearchTotal && (
							<span>({this.state.data.SearchTotal})</span>
						)}
					</Menu.Item>
				</Menu.Menu>
				<Menu.Menu position="right">
					<Dropdown trigger={<b>{this.props.Email}</b>}>
						<Dropdown.Menu>
							<Dropdown.Item onClick={() => this.props.logout()}>
								Logout
							</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
				</Menu.Menu>
			</Menu>
		);
	}
}

function mapStateToProps(state) {
	return {
		IsAdmin: !!state.user.IsAdmin,
		Email: state.user.Username,
		UserId: state.user.UserId
	};
}

TopNavigation.propTypes = {
	IsAdmin: PropTypes.bool.isRequired,
	Email: PropTypes.string.isRequired,
	logout: PropTypes.func.isRequired,
	UserId: PropTypes.number.isRequired
};

export default connect(mapStateToProps, { logout })(TopNavigation);
