import React from "react";
import { Route } from "react-router-dom";
import LoginPage from "./components/pages/LoginPage";
import DashboardPage from "./components/pages/DashboardPage";
import UserRoute from "./components/routes/UserRoute";
import GuestRoute from "./components/routes/GuestRoute";
import PropTypes from "prop-types";
import AddReviewTemplatePage from "./components/pages/AddReviewTemplatePage";
import { connect } from "react-redux";
import TopNavigation from "./components/pages/TopNavigation";
import EmployeeReviewPage from "./components/pages/EmployeeReviewPage";
import EmployeeReviewPageAdd from "./components/pages/EmployeeReviewPageAdd";
import ReviewTemplateViewPage from "./components/pages/ReviewTemplateViewPage";
import EmployeeReviewViewPage from "./components/pages/EmployeeReviewViewPage";
import ReviewPage from "./components/pages/ReviewPage";
import ReviewViewPage from "./components/pages/ReviewViewPage";
import HomePage from "./components/pages/HomePage";

const App = ({ location, isAuthenticated }) => (
	<div>
		{isAuthenticated && <TopNavigation />}
		<GuestRoute location={location} path="/" exact component={LoginPage} />
		<UserRoute
			location={location}
			path="/dashboard"
			exact
			component={DashboardPage}
		/>
		<UserRoute
			location={location}
			path="/reviewtemplate/add"
			exact
			component={AddReviewTemplatePage}
		/>
		<UserRoute
			location={location}
			path="/employeereview"
			exact
			component={EmployeeReviewPage}
		/>
		<UserRoute
			location={location}
			path="/employeereview/add"
			exact
			component={EmployeeReviewPageAdd}
		/>
		<UserRoute
			location={location}
			path="/reviewtemplateView/:id"
			exact
			component={ReviewTemplateViewPage}
		/>
		<UserRoute
			location={location}
			path="/employeereviewView/:id"
			exact
			component={EmployeeReviewViewPage}
		/>
		<UserRoute
			location={location}
			path="/reviews"
			exact
			component={ReviewPage}
		/>
		<UserRoute
			location={location}
			path="/reviewsView/:id"
			exact
			component={ReviewViewPage}
		/>
		<UserRoute
			location={location}
			path="/homepage"
			exact
			component={HomePage}
		/>
	</div>
);

App.propTypes = {
	location: PropTypes.shape({
		pathname: PropTypes.string.isRequired
	}).isRequired,
	isAuthenticated: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
	return {
		isAuthenticated: !!state.user.AuthCode
	};
}

export default connect(mapStateToProps)(App);
