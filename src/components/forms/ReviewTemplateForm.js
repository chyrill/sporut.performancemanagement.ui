import React from "react";
import {
	Form,
	Button,
	Label,
	Input,
	Grid,
	Icon,
	Message
} from "semantic-ui-react";
import InlineError from "../messages/InlineError";
import PropTypes from "prop-types";

class ReviewTemplateForm extends React.Component {
	state = {
		data: {
			Name: "",
			Description: "",
			PointsPerItem: 0,
			QuestionsArray: []
		},
		loading: false,
		errors: {},
		count: 0,
		Questions: []
	};

	onSubmit = () => {
		const errors = this.validate(this.state.data);
		this.setState({ errors });
		if (Object.keys(errors).length === 0) {
			this.setState({ loading: true });
			this.props.submit(this.state.data);
		}
	};

	validate = data => {
		const errors = {};
		if (!data.Name) errors.Name = "Name is required";
		if (data.PointsPerItem < 5)
			errors.PointsPerItem = "Points must be higher than 5";
		if (data.QuestionsArray.length === 0)
			errors.QuestionsArray = "atleast one question is added";
		return errors;
	};

	addClick() {
		this.setState({ count: this.state.count + 1 });
		console.log(this.state.count);
	}

	handleChange(i, event) {
		let QuestionsArray = this.state.data.QuestionsArray.slice();
		QuestionsArray[i] = event.target.value;
		this.setState({
			data: { ...this.state.data, QuestionsArray: QuestionsArray }
		});
	}

	removeClick(i) {
		let value = this.state.Questions.slice();
		value.splice(i, 1);
		this.setState({
			count: this.state.count - 1,
			value
		});
		console.log(value);
	}

	addQuestion() {
		let uiItems = [];
		for (let i = 0; i < this.state.count; i++) {
			uiItems.push(
				<div key={i}>
					<input
						type="text"
						value={this.state.data.QuestionsArray[i] || ""}
						onChange={this.handleChange.bind(this, i)}
					/>

					<Button
						color="red"
						onClick={this.removeClick.bind(this, i)}
					>
						Remove
					</Button>
				</div>
			);
		}
		return uiItems || null;
	}

	onChange = e =>
		this.setState({
			data: { ...this.state.data, [e.target.name]: e.target.value }
		});

	render() {
		const { data, errors, loading } = this.state;

		return (
			<div className="ui container">
				<Form onSubmit={this.onSubmit} loading={loading}>
					<Form.Field>
						<label htmlFor="Name"> Name </label>
						<input
							type="text"
							id="Name"
							name="Name"
							placeholder="Name"
							value={data.Name}
							onChange={this.onChange}
						/>
						{!!errors.Name && <InlineError text={errors.Name} />}
					</Form.Field>
					<Form.Field>
						<label htmlFor="Description"> Description </label>
						<input
							type="text"
							name="Description"
							id="Description"
							Description="Description"
							placeholder="Description"
							value={data.Description}
							onChange={this.onChange}
						/>
					</Form.Field>
					<Form.Field>
						<label htmlFor="PointsPerItem"> PointsPerItem </label>
						<Grid columns={12}>
							<Grid.Row>
								<Grid.Column>
									<Input
										type="number"
										id="PointsPerItem"
										name="PointsPerItem"
										placeholder="Points"
										value={data.PointsPerItem}
										onChange={this.onChange}
									/>
								</Grid.Column>
							</Grid.Row>
						</Grid>
						{!!errors.PointsPerItem && (
							<InlineError text={errors.PointsPerItem} />
						)}
					</Form.Field>
					<Form.Field>
						<label htmlFor="QuestionsArray"> Questions </label>
						{this.addQuestion()}
						{!!errors.QuestionsArray && (
							<InlineError text={errors.QuestionsArray} />
						)}
						<input
							type="button"
							color="green"
							onClick={this.addClick.bind(this)}
							value="Add Question"
						/>
					</Form.Field>

					<Button primary>Submit</Button>
				</Form>
			</div>
		);
	}
}

ReviewTemplateForm.propTypes = {
	submit: PropTypes.func.isRequired
};

export default ReviewTemplateForm;
