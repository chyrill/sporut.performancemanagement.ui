import React from "react";
import { Form, Button, Message } from "semantic-ui-react";
import InlineError from "../messages/InlineError";
import PropTypes from "prop-types";

class LoginForm extends React.Component {
	state = {
		data: {
			Username: "",
			Password: ""
		},
		loading: false,
		errors: {}
	};

	onSubmit = () => {
		const errors = this.validate(this.state.data);
		this.setState({ errors });
		if (Object.keys(errors).length === 0) {
			this.setState({ loading: true });
			this.props.submit(this.state.data).catch(err => {
				this.setState({ errors: err.response.data });
				this.setState({ loading: false });
			});
		}
	};

	validate = data => {
		const errors = {};
		if (!data.Password) errors.Password = "can't be empty";
		if (!data.Username) errors.Username = "User name can not be null";
		return errors;
	};

	onChange = e =>
		this.setState({
			data: { ...this.state.data, [e.target.name]: e.target.value }
		});

	render() {
		const { data, errors, loading } = this.state;

		return (
			<Form onSubmit={this.onSubmit} loading={loading}>
				{errors.Message && (
					<Message negative>
						<Message.Header>Something went wrong</Message.Header>
						<p>{errors.Message}</p>
					</Message>
				)}
				<Form.Field error={!!errors.Username}>
					<label htmlFor="Username">Username</label>
					<input
						type="text"
						id="Username"
						name="Username"
						placeholder="User Name"
						value={data.Username}
						onChange={this.onChange}
					/>
					{errors.Username && <InlineError text={errors.Username} />}
				</Form.Field>
				<Form.Field error={!!errors.Password}>
					<label htmlFor="Password">Password</label>
					<input
						type="password"
						id="Password"
						name="Password"
						placeholder="Password"
						value={data.Password}
						onChange={this.onChange}
					/>
					{errors.Password && <InlineError text={errors.Password} />}
				</Form.Field>
				<Button primary>Login</Button>
			</Form>
		);
	}
}

LoginForm.propTypes = {
	submit: PropTypes.func.isRequired
};

export default LoginForm;
